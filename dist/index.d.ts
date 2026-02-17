type GameCode = 'pokemon' | 'yugioh' | 'mtg' | 'onepiece';
type ProductCategory = 'SINGLE' | 'SEALED' | 'GRADED';
type ConditionCode = 'M' | 'NM' | 'EX' | 'GD' | 'LP' | 'PL' | 'PO';
type CardLanguage = 'en' | 'vi' | 'ja' | 'ko' | 'zh' | 'fr' | 'de' | 'es' | 'it' | 'pt';
type SyncStatus = 'PENDING' | 'SYNCED' | 'FAILED' | 'NOT_FOUND';
type UserRole = 'buyer' | 'seller' | 'support' | 'moderator' | 'admin' | 'finance';
type SellerStatus = 'PENDING' | 'ACTIVE' | 'SUSPENDED' | 'BANNED';
type SellerTier = 'BASIC' | 'VERIFIED' | 'PRO_SHOP';
type ListingStatus = 'DRAFT' | 'ACTIVE' | 'SOLD' | 'DISABLED' | 'DELETED';
type OrderStatus = 'PENDING_PAYMENT' | 'PAID' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'COMPLETED' | 'CANCELLED' | 'DISPUTED' | 'REFUNDED';
type PaymentMethod = 'COD' | 'BANK_TRANSFER' | 'MOMO' | 'ZALOPAY' | 'PAYPAL';
type PaymentStatus = 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'REFUNDED';
type DisputeStatus = 'OPEN' | 'UNDER_REVIEW' | 'RESOLVED' | 'CLOSED';
type DisputeReason = 'ITEM_NOT_RECEIVED' | 'ITEM_NOT_AS_DESCRIBED' | 'WRONG_ITEM' | 'DAMAGED' | 'FAKE_ITEM' | 'OTHER';
type MarketCode = 'VN' | 'TH' | 'PH' | 'MY' | 'ID' | 'SG';
type Currency = 'VND' | 'THB' | 'PHP' | 'MYR' | 'IDR' | 'SGD' | 'USD';
interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: {
        code: string;
        message: string;
        details?: unknown;
    };
    meta?: {
        page?: number;
        pageSize?: number;
        total?: number;
        totalPages?: number;
    };
}
interface PaginationParams {
    page?: number;
    pageSize?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}
interface MeilisearchProduct {
    id: string;
    name: string;
    nameEn: string | null;
    gameCode: string;
    setCode: string | null;
    setName: string | null;
    rarity: string | null;
    category: ProductCategory;
    imageUrl: string | null;
    marketPrice: number | null;
    listingsCount: number;
    minPrice: number | null;
    isActive: boolean;
}

declare const CONDITION_LABELS: Record<ConditionCode, {
    en: string;
    vi: string;
    short: string;
}>;
declare const CONDITION_COLORS: Record<ConditionCode, string>;
declare const LANGUAGE_LABELS: Record<CardLanguage, {
    en: string;
    native: string;
    flag: string;
}>;
declare const GAME_LABELS: Record<GameCode, {
    en: string;
    vi: string;
}>;
declare const BUSINESS_RULES: {
    HIGH_VALUE_THRESHOLD: number;
    NO_COD_THRESHOLD: number;
    COMMISSION_RATE: number;
    MAX_LISTING_PHOTOS: number;
    MIN_PRICE: number;
    MAX_PRICE: number;
    DEFAULT_PAGE_SIZE: number;
    MAX_PAGE_SIZE: number;
    CARD_SYNC_INTERVAL_HOURS: number;
};
declare const API_RATE_LIMITS: {
    tcgdex: {
        requestsPerSecond: number;
    };
    ygoprodeck: {
        requestsPerSecond: number;
    };
    pokemontcg: {
        requestsPerDay: number;
    };
    scryfall: {
        requestsPerSecond: number;
        minDelayMs: number;
    };
};
declare const MEILISEARCH_CONFIG: {
    INDEX_NAME: string;
    SEARCHABLE_ATTRIBUTES: string[];
    FILTERABLE_ATTRIBUTES: string[];
    SORTABLE_ATTRIBUTES: string[];
    RANKING_RULES: string[];
};

/**
 * Generate a URL-friendly slug from a string
 */
declare function slugify(text: string): string;
/**
 * Format price in VND
 */
declare function formatPrice(price: number, currency?: string): string;
/**
 * Generate a unique order number
 */
declare function generateOrderNumber(): string;
/**
 * Parse page and pageSize from query params with defaults
 */
declare function parsePagination(page?: string | number, pageSize?: string | number, defaults?: {
    page: number;
    pageSize: number;
}): {
    page: number;
    pageSize: number;
    skip: number;
    take: number;
};
/**
 * Calculate pagination metadata
 */
declare function paginationMeta(total: number, page: number, pageSize: number): {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
};
/**
 * Delay execution (for rate limiting)
 */
declare function delay(ms: number): Promise<void>;
/**
 * Retry a function with exponential backoff
 */
declare function retry<T>(fn: () => Promise<T>, options?: {
    maxRetries?: number;
    baseDelayMs?: number;
}): Promise<T>;
/**
 * Chunk an array into smaller arrays
 */
declare function chunk<T>(array: T[], size: number): T[][];

export { API_RATE_LIMITS, type ApiResponse, BUSINESS_RULES, CONDITION_COLORS, CONDITION_LABELS, type CardLanguage, type ConditionCode, type Currency, type DisputeReason, type DisputeStatus, GAME_LABELS, type GameCode, LANGUAGE_LABELS, type ListingStatus, MEILISEARCH_CONFIG, type MarketCode, type MeilisearchProduct, type OrderStatus, type PaginationParams, type PaymentMethod, type PaymentStatus, type ProductCategory, type SellerStatus, type SellerTier, type SyncStatus, type UserRole, chunk, delay, formatPrice, generateOrderNumber, paginationMeta, parsePagination, retry, slugify };
