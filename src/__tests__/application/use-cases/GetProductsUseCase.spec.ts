import { describe, it, expect, vi } from 'vitest'
import type { ProductsRepository } from '../../../application/ports/ProductsRepository'
import type { ProductsQuery } from '../../../domain/product'
import { GetProductsUseCase } from '../../../application/use-cases/GetProductsUseCase'

function createRepositoryMock() {
  return {
    getProducts: vi.fn(),
    getProductById: vi.fn(),
  } as unknown as ProductsRepository
}

describe('GetProductsUseCase', () => {
  it('delegates to repository.getProducts with the provided query', async () => {
    const repository = createRepositoryMock()
    const useCase = new GetProductsUseCase(repository)

    const query: ProductsQuery = {
      page: 2,
      pageSize: 10,
      searchTerm: 'phone',
      category: 'electronics',
    }

    const expectedResult = {
      items: [],
      total: 0,
      categories: [],
      usedFuzzySearch: false,
    }

      ; (repository.getProducts as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce(
        expectedResult,
      )

    const result = await useCase.execute(query)

    expect(repository.getProducts).toHaveBeenCalledWith(query)
    expect(result).toBe(expectedResult)
  })
})
