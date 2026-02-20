import { describe, it, expect, vi, beforeEach } from 'vitest'
import type { Product } from '../../../domain/product'
import { DEFAULT_PAGE_SIZE } from '../../../config/constants'
import { useProductsList } from '../../../views/ProductsListView/script'

const executeMock = vi.fn()

vi.mock('../../../application/use-cases/GetProductsUseCase', () => {
  class MockGetProductsUseCase {
    execute(query: unknown) {
      return executeMock(query)
    }
  }

  return {
    GetProductsUseCase: MockGetProductsUseCase,
  }
})

vi.mock('../../../infrastructure/http/AxiosProductsRepository', () => ({
  AxiosProductsRepository: vi.fn(),
}))

describe('useProductsList', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    executeMock.mockReset()
  })

  it('loads products successfully and updates state', async () => {
    const exampleProducts: Product[] = [
      {
        id: 1,
        title: 'Product 1',
        description: 'Desc 1',
        price: 10,
        category: 'cat-1',
        image: 'image-1',
      },
      {
        id: 2,
        title: 'Product 2',
        description: 'Desc 2',
        price: 20,
        category: 'cat-2',
        image: 'image-2',
      },
    ]

    executeMock.mockResolvedValueOnce({
      items: exampleProducts,
      total: 24,
      categories: ['cat-1', 'cat-2'],
      usedFuzzySearch: false,
    })

    const {
      products,
      total,
      categories,
      usedFuzzySearch,
      totalPages,
      pageSize,
      loadProducts,
    } = useProductsList()

    await loadProducts()

    expect(products.value).toEqual(exampleProducts)
    expect(total.value).toBe(24)
    expect(categories.value).toEqual(['cat-1', 'cat-2'])
    expect(usedFuzzySearch.value).toBe(false)
    expect(pageSize.value).toBe(DEFAULT_PAGE_SIZE)
    expect(totalPages.value).toBe(24 / DEFAULT_PAGE_SIZE)
  })

  it('sets errorMessage when loadProducts fails with server error', async () => {
    const error = { response: { status: 500 } }

    executeMock.mockRejectedValueOnce(error as never)

    const { errorMessage, loadProducts } = useProductsList()

    await loadProducts()

    expect(errorMessage.value).toContain('server error')
  })

  it('computes totalPages as 1 when there are no products', async () => {
    executeMock.mockResolvedValueOnce({
      items: [],
      total: 0,
      categories: [],
      usedFuzzySearch: false,
    })

    const { totalPages, loadProducts } = useProductsList()

    await loadProducts()

    expect(totalPages.value).toBe(1)
  })

  it('goToPreviousPage does not go below 1 and goToNextPage respects totalPages', async () => {
    executeMock.mockImplementation(async () => ({
      items: [],
      total: DEFAULT_PAGE_SIZE * 2,
      categories: [],
      usedFuzzySearch: false,
    }))

    const { page, totalPages, loadProducts, goToPreviousPage, goToNextPage } = useProductsList()

    await loadProducts()

    expect(totalPages.value).toBe(2)
    expect(page.value).toBe(1)

    goToPreviousPage()
    expect(page.value).toBe(1)

    goToNextPage()
    expect(page.value).toBe(2)

    goToNextPage()
    expect(page.value).toBe(2)
  })
})
