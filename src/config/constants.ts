export const DEFAULT_PAGE_SIZE = 12
export const PRODUCTS_CACHE_TTL_MS = 5 * 60 * 1000

export const ROUTE_NAMES = {
  productsList: 'products-list',
  productDetail: 'product-detail',
} as const

export const API_PATHS = {
  products: '/products',
  productById: (id: number | string) => `/products/${id}`,
  categories: '/products/categories',
} as const
