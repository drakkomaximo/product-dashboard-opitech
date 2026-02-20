export const DEFAULT_PAGE_SIZE = 12
export const PRODUCTS_CACHE_TTL_MS = 5 * 60 * 1000

export const SEARCH_DEBOUNCE_MS = 300

export const SEARCH_SUGGESTIONS_LIMIT = 5

export const PRODUCTS_SIMULATED_ERROR_RATE = 0.07

export const SEARCH_FUZZY_MIN_SIMILARITY = 0.35

export const ROUTE_NAMES = {
  productsList: 'products-list',
  productDetail: 'product-detail',
  notFound: 'not-found',
} as const

export const API_PATHS = {
  products: '/products',
  productById: (id: number | string) => `/products/${id}`,
  categories: '/products/categories',
} as const
