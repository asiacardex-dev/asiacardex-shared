// Game & Products
export type GameCode = 'pokemon' | 'yugioh' | 'mtg' | 'onepiece'

export type ProductCategory = 'SINGLE' | 'SEALED' | 'GRADED'

export type ConditionCode = 'M' | 'NM' | 'EX' | 'GD' | 'LP' | 'PL' | 'PO'

export type CardLanguage = 'en' | 'vi' | 'ja' | 'ko' | 'zh' | 'fr' | 'de' | 'es' | 'it' | 'pt'

export type SyncStatus = 'PENDING' | 'SYNCED' | 'FAILED' | 'NOT_FOUND'

// Users & Roles
export type UserRole = 'buyer' | 'seller' | 'support' | 'moderator' | 'admin' | 'finance'

export type SellerStatus = 'PENDING' | 'ACTIVE' | 'SUSPENDED' | 'BANNED'

export type SellerTier = 'BASIC' | 'VERIFIED' | 'PRO_SHOP'

// Listings
export type ListingStatus = 'DRAFT' | 'ACTIVE' | 'SOLD' | 'DISABLED' | 'DELETED'

// Orders
export type OrderStatus =
  | 'PENDING_PAYMENT'
  | 'PAID'
  | 'PROCESSING'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'DISPUTED'
  | 'REFUNDED'

export type PaymentMethod = 'COD' | 'BANK_TRANSFER' | 'MOMO' | 'ZALOPAY' | 'PAYPAL'

export type PaymentStatus = 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'REFUNDED'

// Disputes
export type DisputeStatus = 'OPEN' | 'UNDER_REVIEW' | 'RESOLVED' | 'CLOSED'

export type DisputeReason =
  | 'ITEM_NOT_RECEIVED'
  | 'ITEM_NOT_AS_DESCRIBED'
  | 'WRONG_ITEM'
  | 'DAMAGED'
  | 'FAKE_ITEM'
  | 'OTHER'

// Market
export type MarketCode = 'VN' | 'TH' | 'PH' | 'MY' | 'ID' | 'SG'

export type Currency = 'VND' | 'THB' | 'PHP' | 'MYR' | 'IDR' | 'SGD' | 'USD'

// API
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: {
    code: string
    message: string
    details?: unknown
  }
  meta?: {
    page?: number
    pageSize?: number
    total?: number
    totalPages?: number
  }
}

export interface PaginationParams {
  page?: number
  pageSize?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

// Meilisearch Product Index
export interface MeilisearchProduct {
  id: string
  name: string
  nameEn: string | null
  gameCode: string
  setCode: string | null
  setName: string | null
  rarity: string | null
  category: ProductCategory
  imageUrl: string | null
  marketPrice: number | null
  listingsCount: number
  minPrice: number | null
  isActive: boolean
}
