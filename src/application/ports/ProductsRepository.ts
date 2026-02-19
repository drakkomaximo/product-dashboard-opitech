import type { Product, ProductId, ProductsQuery } from '@/domain/product'

export interface ProductsRepository {
  getProducts(query: ProductsQuery): Promise<{
    items: Product[]
    total: number
    categories: string[]
  }>
  getProductById(id: ProductId): Promise<Product>
}
