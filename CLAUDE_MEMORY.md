# asiacardex-shared

Package partagé contenant le schema Prisma, les types TypeScript et les utilitaires communs.

## Structure

```
asiacardex-shared/
├── prisma/
│   └── schema.prisma     ← Schema complet de la base de données
├── src/
│   ├── types/            ← Types TypeScript partagés
│   ├── constants/        ← Constantes (conditions, langues, business rules)
│   └── utils/            ← Fonctions utilitaires
├── generated/
│   └── client/           ← Prisma Client généré
└── dist/                 ← Build TypeScript
```

## Utilisation

### Installation dans un autre repo

```bash
pnpm add @asiacardex/shared@workspace:*
```

### Import des types

```typescript
import {
  GameCode,
  ConditionCode,
  OrderStatus,
  ApiResponse
} from '@asiacardex/shared'
```

### Import du Prisma Client

```typescript
import { PrismaClient } from '@asiacardex/shared/prisma'

const prisma = new PrismaClient()
```

### Import des constantes

```typescript
import {
  CONDITION_LABELS,
  BUSINESS_RULES,
  MEILISEARCH_CONFIG
} from '@asiacardex/shared'
```

## Commandes

```bash
# Générer le Prisma Client
pnpm db:generate

# Push le schema vers la DB (dev)
pnpm db:push

# Créer une migration
pnpm db:migrate

# Déployer les migrations (prod)
pnpm db:migrate:deploy

# Build le package
pnpm build

# Type check
pnpm typecheck
```

## Règles

1. **NE PAS** ajouter de dépendances runtime lourdes
2. **TOUJOURS** mettre à jour les exports dans `src/index.ts`
3. **TOUJOURS** regénérer le client Prisma après modification du schema
4. **TOUJOURS** créer une migration pour les changements de schema

## Meilisearch

Configuration de l'index de recherche dans `constants/index.ts`:

- Index: `products`
- Champs searchable: `name`, `nameEn`, `setName`, `rarity`
- Champs filterable: `gameCode`, `setCode`, `rarity`, `category`, `isActive`
- Champs sortable: `marketPrice`, `listingsCount`, `minPrice`, `name`
