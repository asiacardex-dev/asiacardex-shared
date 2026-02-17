import { z } from 'zod'
import { BUSINESS_RULES } from '../constants'

// Enums as Zod schemas
export const GameCodeSchema = z.enum(['pokemon', 'yugioh', 'mtg', 'onepiece'])
export const ProductCategorySchema = z.enum(['SINGLE', 'SEALED', 'GRADED'])
export const ConditionCodeSchema = z.enum(['M', 'NM', 'EX', 'GD', 'LP', 'PL', 'PO'])
export const CardLanguageSchema = z.enum([
  'en',
  'vi',
  'ja',
  'ko',
  'zh',
  'fr',
  'de',
  'es',
  'it',
  'pt',
])
export const ListingStatusSchema = z.enum(['DRAFT', 'ACTIVE', 'SOLD', 'DISABLED', 'DELETED'])
export const OrderStatusSchema = z.enum([
  'PENDING_PAYMENT',
  'PAID',
  'PROCESSING',
  'SHIPPED',
  'DELIVERED',
  'COMPLETED',
  'CANCELLED',
  'DISPUTED',
  'REFUNDED',
])
export const PaymentMethodSchema = z.enum(['COD', 'BANK_TRANSFER', 'MOMO', 'ZALOPAY', 'PAYPAL'])

// Pagination
export const PaginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce
    .number()
    .int()
    .positive()
    .max(BUSINESS_RULES.MAX_PAGE_SIZE)
    .default(BUSINESS_RULES.DEFAULT_PAGE_SIZE),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
})

// Search
export const SearchQuerySchema = z.object({
  q: z.string().min(1).max(100).optional(),
  gameId: z.string().uuid().optional(),
  setId: z.string().uuid().optional(),
  language: CardLanguageSchema.optional(),
  condition: ConditionCodeSchema.optional(),
  minPrice: z.coerce.number().positive().optional(),
  maxPrice: z.coerce.number().positive().optional(),
  isFoil: z.coerce.boolean().optional(),
  isGraded: z.coerce.boolean().optional(),
  isSealed: z.coerce.boolean().optional(),
  sellerId: z.string().uuid().optional(),
  ...PaginationSchema.shape,
})

// Listing
export const CreateListingSchema = z.object({
  productId: z.string().uuid(),
  price: z.number().int().min(BUSINESS_RULES.MIN_PRICE).max(BUSINESS_RULES.MAX_PRICE),
  quantity: z.number().int().positive().max(999),
  conditionCode: ConditionCodeSchema,
  languageCode: CardLanguageSchema,
  isFoil: z.boolean().default(false),
  isGraded: z.boolean().default(false),
  isSealed: z.boolean().default(false),
  gradingCompany: z.string().max(50).optional(),
  gradingScore: z.string().max(20).optional(),
  comments: z.string().max(500).optional(),
})

export const UpdateListingSchema = CreateListingSchema.partial().extend({
  status: ListingStatusSchema.optional(),
})

// Cart
export const AddToCartSchema = z.object({
  listingId: z.string().uuid(),
  quantity: z.number().int().positive().max(99),
})

export const UpdateCartItemSchema = z.object({
  quantity: z.number().int().positive().max(99),
})

// Checkout
export const CheckoutSchema = z.object({
  paymentMethod: PaymentMethodSchema,
  shippingAddressId: z.string().uuid(),
  notes: z.string().max(500).optional(),
})

// Review
export const CreateReviewSchema = z.object({
  orderId: z.string().uuid(),
  rating: z.number().int().min(1).max(5),
  comment: z.string().max(1000).optional(),
})

// User profile
export const UpdateProfileSchema = z.object({
  username: z.string().min(3).max(30).optional(),
  phone: z.string().max(20).optional(),
  country: z.string().length(2).optional(),
})

// Address
export const AddressSchema = z.object({
  fullName: z.string().min(2).max(100),
  phone: z.string().min(8).max(20),
  addressLine1: z.string().min(5).max(200),
  addressLine2: z.string().max(200).optional(),
  city: z.string().min(2).max(100),
  province: z.string().min(2).max(100),
  postalCode: z.string().max(20).optional(),
  country: z.string().length(2).default('VN'),
  isDefault: z.boolean().default(false),
})

// Type exports
export type SearchQuery = z.infer<typeof SearchQuerySchema>
export type CreateListing = z.infer<typeof CreateListingSchema>
export type UpdateListing = z.infer<typeof UpdateListingSchema>
export type AddToCart = z.infer<typeof AddToCartSchema>
export type Checkout = z.infer<typeof CheckoutSchema>
export type CreateReview = z.infer<typeof CreateReviewSchema>
export type Address = z.infer<typeof AddressSchema>
