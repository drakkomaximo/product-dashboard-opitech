import { describe, it, expect, vi } from 'vitest'
import type { ProductsRepository } from '../../../application/ports/ProductsRepository'
import type { Product, ProductId } from '../../../domain/product'
import { GetProductDetailUseCase } from '../../../application/use-cases/GetProductDetailUseCase'

function createRepositoryMock() {
  return {
    getProducts: vi.fn(),
    getProductById: vi.fn(),
  } as unknown as ProductsRepository
}

describe('GetProductDetailUseCase', () => {
  it('delegates to repository.getProductById with the provided id', async () => {
    const repository = createRepositoryMock()
    const useCase = new GetProductDetailUseCase(repository)

    const id: ProductId = 42

    const expectedProduct: Product = {
      id,
      title: 'Test product',
      description: 'Test description',
      price: 10,
      category: 'test-category',
      image: 'https://example.com/image.jpg',
    }

      ; (repository.getProductById as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce(
        expectedProduct,
      )

    const result = await useCase.execute(id)

    expect(repository.getProductById).toHaveBeenCalledWith(id)
    expect(result).toBe(expectedProduct)
  })
})
