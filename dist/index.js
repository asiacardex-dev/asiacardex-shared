"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  API_RATE_LIMITS: () => API_RATE_LIMITS,
  BUSINESS_RULES: () => BUSINESS_RULES,
  CONDITION_COLORS: () => CONDITION_COLORS,
  CONDITION_LABELS: () => CONDITION_LABELS,
  GAME_LABELS: () => GAME_LABELS,
  LANGUAGE_LABELS: () => LANGUAGE_LABELS,
  MEILISEARCH_CONFIG: () => MEILISEARCH_CONFIG,
  chunk: () => chunk,
  delay: () => delay,
  formatPrice: () => formatPrice,
  generateOrderNumber: () => generateOrderNumber,
  paginationMeta: () => paginationMeta,
  parsePagination: () => parsePagination,
  retry: () => retry,
  slugify: () => slugify
});
module.exports = __toCommonJS(index_exports);

// src/constants/index.ts
var CONDITION_LABELS = {
  M: { en: "Mint", vi: "Mint", short: "M" },
  NM: { en: "Near Mint", vi: "Near Mint", short: "NM" },
  EX: { en: "Excellent", vi: "Xu\u1EA5t s\u1EAFc", short: "EX" },
  GD: { en: "Good", vi: "T\u1ED1t", short: "GD" },
  LP: { en: "Light Played", vi: "\u0110\xE3 ch\u01A1i nh\u1EB9", short: "LP" },
  PL: { en: "Played", vi: "\u0110\xE3 ch\u01A1i", short: "PL" },
  PO: { en: "Poor", vi: "K\xE9m", short: "PO" }
};
var CONDITION_COLORS = {
  M: "#16A34A",
  // green
  NM: "#22C55E",
  // light green
  EX: "#84CC16",
  // lime
  GD: "#EAB308",
  // yellow
  LP: "#F97316",
  // orange
  PL: "#EF4444",
  // red
  PO: "#991B1B"
  // dark red
};
var LANGUAGE_LABELS = {
  en: { en: "English", native: "English", flag: "\u{1F1EC}\u{1F1E7}" },
  vi: { en: "Vietnamese", native: "Ti\u1EBFng Vi\u1EC7t", flag: "\u{1F1FB}\u{1F1F3}" },
  ja: { en: "Japanese", native: "\u65E5\u672C\u8A9E", flag: "\u{1F1EF}\u{1F1F5}" },
  ko: { en: "Korean", native: "\uD55C\uAD6D\uC5B4", flag: "\u{1F1F0}\u{1F1F7}" },
  zh: { en: "Chinese", native: "\u4E2D\u6587", flag: "\u{1F1E8}\u{1F1F3}" },
  fr: { en: "French", native: "Fran\xE7ais", flag: "\u{1F1EB}\u{1F1F7}" },
  de: { en: "German", native: "Deutsch", flag: "\u{1F1E9}\u{1F1EA}" },
  es: { en: "Spanish", native: "Espa\xF1ol", flag: "\u{1F1EA}\u{1F1F8}" },
  it: { en: "Italian", native: "Italiano", flag: "\u{1F1EE}\u{1F1F9}" },
  pt: { en: "Portuguese", native: "Portugu\xEAs", flag: "\u{1F1F5}\u{1F1F9}" }
};
var GAME_LABELS = {
  pokemon: { en: "Pokemon", vi: "Pokemon" },
  yugioh: { en: "Yu-Gi-Oh!", vi: "Yu-Gi-Oh!" },
  mtg: { en: "Magic: The Gathering", vi: "Magic: The Gathering" },
  onepiece: { en: "One Piece", vi: "One Piece" }
};
var BUSINESS_RULES = {
  // High value threshold (VND)
  HIGH_VALUE_THRESHOLD: 5e6,
  // No COD threshold (VND)
  NO_COD_THRESHOLD: 2e7,
  // Commission rate (%)
  COMMISSION_RATE: 0.08,
  // Max photos per listing
  MAX_LISTING_PHOTOS: 10,
  // Min price (VND)
  MIN_PRICE: 1e3,
  // Max price (VND)
  MAX_PRICE: 1e9,
  // Default page size
  DEFAULT_PAGE_SIZE: 20,
  // Max page size
  MAX_PAGE_SIZE: 100,
  // Sync refresh interval (hours)
  CARD_SYNC_INTERVAL_HOURS: 24
};
var API_RATE_LIMITS = {
  tcgdex: { requestsPerSecond: 10 },
  ygoprodeck: { requestsPerSecond: 20 },
  pokemontcg: { requestsPerDay: 2e4 },
  scryfall: { requestsPerSecond: 10, minDelayMs: 100 }
};
var MEILISEARCH_CONFIG = {
  INDEX_NAME: "products",
  SEARCHABLE_ATTRIBUTES: [
    "name",
    "nameEn",
    "setName",
    "rarity",
    "illustrator",
    "evolvesFrom"
  ],
  FILTERABLE_ATTRIBUTES: [
    "gameCode",
    "setCode",
    "rarity",
    "category",
    "isActive",
    // Pokemon-specific filters
    "cardType",
    "types",
    "stage",
    "suffix",
    "regulationMark",
    "hp",
    "legalStandard",
    "legalExpanded",
    "hasHolo",
    "hasReverse"
  ],
  SORTABLE_ATTRIBUTES: ["marketPrice", "listingsCount", "minPrice", "name", "hp"],
  RANKING_RULES: [
    "words",
    "typo",
    "proximity",
    "attribute",
    "sort",
    "exactness",
    "listingsCount:desc"
  ]
};

// src/utils/index.ts
function slugify(text) {
  return text.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
}
function formatPrice(price, currency = "VND") {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
}
function generateOrderNumber() {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `AC-${timestamp}-${random}`;
}
function parsePagination(page, pageSize, defaults = { page: 1, pageSize: 20 }) {
  const parsedPage = Math.max(1, Number(page) || defaults.page);
  const parsedPageSize = Math.min(100, Math.max(1, Number(pageSize) || defaults.pageSize));
  return {
    page: parsedPage,
    pageSize: parsedPageSize,
    skip: (parsedPage - 1) * parsedPageSize,
    take: parsedPageSize
  };
}
function paginationMeta(total, page, pageSize) {
  return {
    page,
    pageSize,
    total,
    totalPages: Math.ceil(total / pageSize)
  };
}
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
async function retry(fn, options = {}) {
  const { maxRetries = 3, baseDelayMs = 1e3 } = options;
  let lastError;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (attempt < maxRetries) {
        await delay(baseDelayMs * Math.pow(2, attempt));
      }
    }
  }
  throw lastError;
}
function chunk(array, size) {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  API_RATE_LIMITS,
  BUSINESS_RULES,
  CONDITION_COLORS,
  CONDITION_LABELS,
  GAME_LABELS,
  LANGUAGE_LABELS,
  MEILISEARCH_CONFIG,
  chunk,
  delay,
  formatPrice,
  generateOrderNumber,
  paginationMeta,
  parsePagination,
  retry,
  slugify
});
