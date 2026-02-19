import type { ProductsRepository } from '@/application/ports/ProductsRepository'
import type { Product, ProductId } from '@/domain/product'

export class GetProductDetailUseCase {
  constructor(private readonly repository: ProductsRepository) {}

  execute(id: ProductId): Promise<Product> {
    return this.repository.getProductById(id)
  }
}
