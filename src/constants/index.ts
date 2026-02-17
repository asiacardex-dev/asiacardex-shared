import type { ConditionCode, CardLanguage, GameCode } from '../types'

// Condition labels
export const CONDITION_LABELS: Record<ConditionCode, { en: string; vi: string; short: string }> = {
  M: { en: 'Mint', vi: 'Mint', short: 'M' },
  NM: { en: 'Near Mint', vi: 'Near Mint', short: 'NM' },
  EX: { en: 'Excellent', vi: 'Xuất sắc', short: 'EX' },
  GD: { en: 'Good', vi: 'Tốt', short: 'GD' },
  LP: { en: 'Light Played', vi: 'Đã chơi nhẹ', short: 'LP' },
  PL: { en: 'Played', vi: 'Đã chơi', short: 'PL' },
  PO: { en: 'Poor', vi: 'Kém', short: 'PO' },
}

// Condition colors (for UI)
export const CONDITION_COLORS: Record<ConditionCode, string> = {
  M: '#16A34A', // green
  NM: '#22C55E', // light green
  EX: '#84CC16', // lime
  GD: '#EAB308', // yellow
  LP: '#F97316', // orange
  PL: '#EF4444', // red
  PO: '#991B1B', // dark red
}

// Language labels with flags
export const LANGUAGE_LABELS: Record<CardLanguage, { en: string; native: string; flag: string }> = {
  en: { en: 'English', native: 'English', flag: '🇬🇧' },
  vi: { en: 'Vietnamese', native: 'Tiếng Việt', flag: '🇻🇳' },
  ja: { en: 'Japanese', native: '日本語', flag: '🇯🇵' },
  ko: { en: 'Korean', native: '한국어', flag: '🇰🇷' },
  zh: { en: 'Chinese', native: '中文', flag: '🇨🇳' },
  fr: { en: 'French', native: 'Français', flag: '🇫🇷' },
  de: { en: 'German', native: 'Deutsch', flag: '🇩🇪' },
  es: { en: 'Spanish', native: 'Español', flag: '🇪🇸' },
  it: { en: 'Italian', native: 'Italiano', flag: '🇮🇹' },
  pt: { en: 'Portuguese', native: 'Português', flag: '🇵🇹' },
}

// Game labels
export const GAME_LABELS: Record<GameCode, { en: string; vi: string }> = {
  pokemon: { en: 'Pokemon', vi: 'Pokemon' },
  yugioh: { en: 'Yu-Gi-Oh!', vi: 'Yu-Gi-Oh!' },
  mtg: { en: 'Magic: The Gathering', vi: 'Magic: The Gathering' },
  onepiece: { en: 'One Piece', vi: 'One Piece' },
}

// Business rules
export const BUSINESS_RULES = {
  // High value threshold (VND)
  HIGH_VALUE_THRESHOLD: 5_000_000,
  // No COD threshold (VND)
  NO_COD_THRESHOLD: 20_000_000,
  // Commission rate (%)
  COMMISSION_RATE: 0.08,
  // Max photos per listing
  MAX_LISTING_PHOTOS: 10,
  // Min price (VND)
  MIN_PRICE: 1_000,
  // Max price (VND)
  MAX_PRICE: 1_000_000_000,
  // Default page size
  DEFAULT_PAGE_SIZE: 20,
  // Max page size
  MAX_PAGE_SIZE: 100,
  // Sync refresh interval (hours)
  CARD_SYNC_INTERVAL_HOURS: 24,
}

// API rate limits (for external APIs)
export const API_RATE_LIMITS = {
  tcgdex: { requestsPerSecond: 10 },
  ygoprodeck: { requestsPerSecond: 20 },
  pokemontcg: { requestsPerDay: 20000 },
  scryfall: { requestsPerSecond: 10, minDelayMs: 100 },
}

// Meilisearch configuration
export const MEILISEARCH_CONFIG = {
  INDEX_NAME: 'products',
  SEARCHABLE_ATTRIBUTES: ['name', 'nameEn', 'setName', 'rarity'],
  FILTERABLE_ATTRIBUTES: ['gameCode', 'setCode', 'rarity', 'category', 'isActive'],
  SORTABLE_ATTRIBUTES: ['marketPrice', 'listingsCount', 'minPrice', 'name'],
  RANKING_RULES: [
    'words',
    'typo',
    'proximity',
    'attribute',
    'sort',
    'exactness',
    'listingsCount:desc',
  ],
}
