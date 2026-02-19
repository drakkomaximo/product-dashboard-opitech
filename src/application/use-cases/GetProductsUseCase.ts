import type { ProductsRepository } from '@/application/ports/ProductsRepository'
import type { ProductsQuery } from '@/domain/product'

export class GetProductsUseCase {
  constructor(private readonly repository: ProductsRepository) {}

  execute(query: ProductsQuery) {
    return this.repository.getProducts(query)
  }
}
