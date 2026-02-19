import { PrismaClient } from '../generated/client'

// Connect to preprod database
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: 'postgresql://postgres:YUaD9spSYo07qlpRst3IEMkYqLnua9YS@172.21.0.6:5432/asiacardex'
    }
  }
})

const TCGDEX_BASE_URL = 'https://api.tcgdex.net/v2'
const YGOPRODECK_BASE_URL = 'https://db.ygoprodeck.com/api/v7'
const SCRYFALL_BASE_URL = 'https://api.scryfall.com'
const OPTCG_BASE_URL = 'https://optcg-api.ryanmichaelhirst.us/api/v1'

const delay = (ms: number) => new Promise(r => setTimeout(r, ms))

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 100)
}

// ============================================
// POKEMON
// ============================================
async function syncPokemon() {
  console.log('\n🔴 POKEMON - Syncing from TCGdex...')

  const game = await prisma.game.findUnique({ where: { code: 'pokemon' } })
  if (!game) throw new Error('Pokemon game not found')

  const enSetsRes = await fetch(`${TCGDEX_BASE_URL}/en/sets`)
  const enSets = await enSetsRes.json() as Array<{ id: string; name: string }>

  console.log(`   Found ${enSets.length} sets`)

  let totalCreated = 0
  let totalUpdated = 0

  for (let i = 0; i < enSets.length; i++) {
    const set = enSets[i]
    process.stdout.write(`\r   Set ${i + 1}/${enSets.length}: ${set.id} (${totalCreated + totalUpdated} cards)          `)

    try {
      const setRes = await fetch(`${TCGDEX_BASE_URL}/en/sets/${set.id}`)
      const setData = await setRes.json() as {
        cards?: Array<{ id: string; localId: string; name: string; image?: string; rarity?: string }>
      }

      for (const card of (setData.cards || [])) {
        const existing = await prisma.product.findUnique({
          where: { externalSource_externalId: { externalSource: 'tcgdex', externalId: card.id } }
        })

        const data: any = {
          gameId: game.id,
          externalSource: 'tcgdex',
          externalId: card.id,
          name: card.name,
          nameEn: card.name,
          slug: slugify(`${card.name}-${card.id}`),
          rarity: card.rarity || null,
          imageUrl: card.image ? `${card.image}/high.png` : null,
          category: 'SINGLE',
          syncStatus: 'SYNCED',
        }

        if (existing) {
          await prisma.product.update({ where: { id: existing.id }, data })
          totalUpdated++
        } else {
          await prisma.product.create({ data })
          totalCreated++
        }
      }
      await delay(100)
    } catch (error) {
      // Skip errors
    }
  }

  console.log(`\n   ✅ Pokemon: ${totalCreated} created, ${totalUpdated} updated`)
  return { created: totalCreated, updated: totalUpdated }
}

// ============================================
// YU-GI-OH!
// ============================================
async function syncYugioh() {
  console.log('\n🟡 YU-GI-OH! - Syncing from YGOProDeck...')

  const game = await prisma.game.findUnique({ where: { code: 'yugioh' } })
  if (!game) throw new Error('Yu-Gi-Oh game not found')

  let totalCreated = 0
  let totalUpdated = 0
  let offset = 0
  const batchSize = 500

  while (true) {
    process.stdout.write(`\r   Fetching ${offset} to ${offset + batchSize}... (${totalCreated + totalUpdated} cards)          `)

    const res = await fetch(`${YGOPRODECK_BASE_URL}/cardinfo.php?num=${batchSize}&offset=${offset}`)
    if (!res.ok) {
      if (res.status === 400) break
      throw new Error(`API error: ${res.status}`)
    }

    const data = await res.json() as {
      data: Array<{
        id: number
        name: string
        type?: string
        card_images?: Array<{ image_url_small?: string }>
      }>
    }

    if (!data.data || data.data.length === 0) break

    for (const card of data.data) {
      const existing = await prisma.product.findUnique({
        where: { externalSource_externalId: { externalSource: 'ygoprodeck', externalId: card.id.toString() } }
      })

      const imageUrl = card.card_images?.[0]?.image_url_small || null

      const productData: any = {
        gameId: game.id,
        externalSource: 'ygoprodeck',
        externalId: card.id.toString(),
        name: card.name,
        nameEn: card.name,
        slug: slugify(`${card.name}-${card.id}`),
        imageUrl,
        category: 'SINGLE',
        syncStatus: 'SYNCED',
      }

      if (existing) {
        await prisma.product.update({ where: { id: existing.id }, data: productData })
        totalUpdated++
      } else {
        await prisma.product.create({ data: productData })
        totalCreated++
      }
    }

    offset += batchSize
    await delay(200)
  }

  console.log(`\n   ✅ Yu-Gi-Oh!: ${totalCreated} created, ${totalUpdated} updated`)
  return { created: totalCreated, updated: totalUpdated }
}

// ============================================
// MTG
// ============================================
async function syncMtg() {
  console.log('\n🔵 MTG - Syncing from Scryfall...')

  const game = await prisma.game.findUnique({ where: { code: 'mtg' } })
  if (!game) throw new Error('MTG game not found')

  let totalCreated = 0
  let totalUpdated = 0
  let url: string | null = `${SCRYFALL_BASE_URL}/cards/search?q=lang:en&unique=cards`
  let pageCount = 0

  while (url) {
    pageCount++
    process.stdout.write(`\r   Page ${pageCount}... (${totalCreated + totalUpdated} cards)          `)

    const res = await fetch(url)
    if (!res.ok) break

    const data = await res.json() as {
      has_more: boolean
      next_page?: string
      data: Array<{
        id: string
        oracle_id: string
        name: string
        rarity?: string
        image_uris?: { small?: string }
        card_faces?: Array<{ image_uris?: { small?: string } }>
      }>
    }

    for (const card of data.data) {
      let imageUrl = card.image_uris?.small || null
      if (!imageUrl && card.card_faces?.[0]?.image_uris) {
        imageUrl = card.card_faces[0].image_uris.small || null
      }

      const existing = await prisma.product.findUnique({
        where: { externalSource_externalId: { externalSource: 'scryfall', externalId: card.oracle_id } }
      })

      const productData: any = {
        gameId: game.id,
        externalSource: 'scryfall',
        externalId: card.oracle_id,
        name: card.name,
        nameEn: card.name,
        slug: slugify(`${card.name}-${card.oracle_id.slice(0, 8)}`),
        rarity: card.rarity || null,
        imageUrl,
        category: 'SINGLE',
        syncStatus: 'SYNCED',
      }

      if (existing) {
        await prisma.product.update({ where: { id: existing.id }, data: productData })
        totalUpdated++
      } else {
        await prisma.product.create({ data: productData })
        totalCreated++
      }
    }

    url = data.has_more ? data.next_page || null : null
    await delay(100)
  }

  console.log(`\n   ✅ MTG: ${totalCreated} created, ${totalUpdated} updated`)
  return { created: totalCreated, updated: totalUpdated }
}

// ============================================
// ONE PIECE
// ============================================
async function syncOnePiece() {
  console.log('\n🏴‍☠️ ONE PIECE - Syncing from OPTCG API...')

  const game = await prisma.game.findUnique({ where: { code: 'onepiece' } })
  if (!game) throw new Error('One Piece game not found')

  let totalCreated = 0
  let totalUpdated = 0
  let page = 1
  const seenCodes = new Set<string>()

  while (true) {
    process.stdout.write(`\r   Page ${page}... (${totalCreated + totalUpdated} cards)          `)

    const res = await fetch(`${OPTCG_BASE_URL}/cards?page=${page}`)
    if (!res.ok) break

    const data = await res.json() as {
      data: Array<{ id: string; code: string; name: string; image: string }>
    }

    if (!data.data || data.data.length === 0) break

    for (const card of data.data) {
      if (seenCodes.has(card.code)) continue
      seenCodes.add(card.code)

      const existing = await prisma.product.findUnique({
        where: { externalSource_externalId: { externalSource: 'optcg', externalId: card.code } }
      })

      const productData: any = {
        gameId: game.id,
        externalSource: 'optcg',
        externalId: card.code,
        name: card.name,
        nameEn: card.name,
        slug: slugify(`${card.name}-${card.code}`),
        imageUrl: card.image,
        imageUrlJa: card.image,
        category: 'SINGLE',
        syncStatus: 'SYNCED',
      }

      if (existing) {
        await prisma.product.update({ where: { id: existing.id }, data: productData })
        totalUpdated++
      } else {
        await prisma.product.create({ data: productData })
        totalCreated++
      }
    }

    page++
    await delay(150)
  }

  console.log(`\n   ✅ One Piece: ${totalCreated} created, ${totalUpdated} updated`)
  return { created: totalCreated, updated: totalUpdated }
}

// ============================================
// MAIN
// ============================================
async function main() {
  console.log('🎴 ====================================')
  console.log('   PREPROD FULL CATALOG SYNC')
  console.log('   ====================================')

  const startTime = Date.now()

  try {
    await prisma.$connect()

    await syncPokemon()
    await syncYugioh()
    await syncMtg()
    await syncOnePiece()

    const elapsed = Math.round((Date.now() - startTime) / 1000)

    // Get final counts
    const counts = await prisma.product.groupBy({
      by: ['gameId'],
      _count: { id: true }
    })

    const games = await prisma.game.findMany()

    console.log('\n📊 ====================================')
    console.log('   FINAL CARD COUNTS')
    console.log('   ====================================')

    let total = 0
    for (const game of games) {
      const count = counts.find(c => c.gameId === game.id)?._count.id || 0
      total += count
      console.log(`   ${game.name}: ${count.toLocaleString()} cards`)
    }
    console.log(`   ────────────────────────────────────`)
    console.log(`   TOTAL: ${total.toLocaleString()} cards`)
    console.log(`   Time: ${elapsed} seconds`)
    console.log('\n✅ Sync complete!')

  } catch (error) {
    console.error('\n❌ Error:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()
