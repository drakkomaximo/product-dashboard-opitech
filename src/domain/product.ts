export type ProductId = number

export interface Product {
  id: ProductId
  title: string
  description: string
  price: number
  category: string
  image: string
}

export interface ProductFilters {
  searchTerm?: string
  category?: string | null
}

export interface Pagination {
  page: number
  pageSize: number
}

export interface ProductsQuery extends ProductFilters, Pagination {}
