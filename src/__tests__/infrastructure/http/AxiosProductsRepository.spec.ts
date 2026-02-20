import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import type { Product } from '../../../domain/product'
import { API_PATHS, PRODUCTS_SIMULATED_ERROR_RATE } from '../../../config/constants'

const getMock = vi.fn()

vi.mock('../../../infrastructure/http/axiosClient', () => ({
  default: {
    get: (...args: unknown[]) => getMock(...args),
  },
}))

// Import after mocking axiosClient
import { AxiosProductsRepository } from '../../../infrastructure/http/AxiosProductsRepository'

const EXAMPLE_PRODUCTS: Product[] = [
  {
    id: 1,
    title: 'Red Phone',
    description: 'A red phone',
    price: 100,
    category: 'electronics',
    image: 'image-1',
  },
  {
    id: 2,
    title: 'Blue Laptop',
    description: 'A blue laptop',
    price: 200,
    category: 'electronics',
    image: 'image-2',
  },
  {
    id: 3,
    title: 'Green Shirt',
    description: 'A green shirt',
    price: 30,
    category: 'clothing',
    image: 'image-3',
  },
]

describe('AxiosProductsRepository', () => {
  const repository = new AxiosProductsRepository()
  let randomSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    randomSpy = vi.spyOn(Math, 'random').mockReturnValue(1)
    getMock.mockReset()
  })

  afterEach(() => {
    randomSpy.mockRestore()
  })

  it('returns paginated products, total and sorted categories without search term', async () => {
    getMock.mockResolvedValueOnce({ data: EXAMPLE_PRODUCTS })

    const result = await repository.getProducts({
      page: 1,
      pageSize: 2,
      searchTerm: undefined,
      category: undefined,
    })

    expect(getMock).toHaveBeenCalledWith(API_PATHS.products)
    expect(result.total).toBe(EXAMPLE_PRODUCTS.length)
    expect(result.items).toHaveLength(2)
    expect(result.categories).toEqual(['clothing', 'electronics'])
    expect(result.usedFuzzySearch).toBe(false)
  })

  it('filters by exact search term and category', async () => {
    getMock.mockResolvedValueOnce({ data: EXAMPLE_PRODUCTS })

    const result = await repository.getProducts({
      page: 1,
      pageSize: 10,
      searchTerm: 'red phone',
      category: 'electronics',
    })

    expect(result.items).toHaveLength(1)
    expect(result.items[0].title).toBe('Red Phone')
    expect(result.usedFuzzySearch).toBe(false)
  })

  it('uses fuzzy search when no exact matches and marks usedFuzzySearch true', async () => {
    getMock.mockResolvedValueOnce({ data: EXAMPLE_PRODUCTS })

    const result = await repository.getProducts({
      page: 1,
      pageSize: 10,
      searchTerm: 'rde pnoh',
      category: undefined,
    })

    expect(result.usedFuzzySearch).toBe(true)
    expect(result.items.length).toBeGreaterThan(0)
  })

  it('simulates error in getProductById based on PRODUCTS_SIMULATED_ERROR_RATE', async () => {
    const threshold = PRODUCTS_SIMULATED_ERROR_RATE

      ; (Math.random as unknown as ReturnType<typeof vi.fn>).mockReturnValueOnce(threshold - 0.001)

    await expect(repository.getProductById(1)).rejects.toThrow()
  })
})
