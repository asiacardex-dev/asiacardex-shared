# @asiacardex/shared

Shared types, constants, Prisma schema and utilities for AsiaCardex platform.

## Installation

```bash
pnpm add @asiacardex/shared
```

## Usage

### Types

```typescript
import type {
  GameCode,
  ConditionCode,
  OrderStatus,
  ApiResponse,
  PaginationParams
} from '@asiacardex/shared'
```

### Constants

```typescript
import {
  CONDITION_LABELS,
  LANGUAGE_LABELS,
  GAME_LABELS,
  BUSINESS_RULES,
  MEILISEARCH_CONFIG
} from '@asiacardex/shared'
```

### Utilities

```typescript
import {
  slugify,
  formatPrice,
  generateOrderNumber,
  parsePagination,
  delay,
  retry,
  chunk
} from '@asiacardex/shared'
```

### Prisma Client

```typescript
import { PrismaClient } from '@asiacardex/shared/prisma'

const prisma = new PrismaClient()
```

## Development

```bash
# Install dependencies
pnpm install

# Generate Prisma Client
pnpm db:generate

# Build
pnpm build

# Type check
pnpm typecheck
```

## License

UNLICENSED - Private
