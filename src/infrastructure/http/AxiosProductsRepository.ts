import type { ProductsRepository } from '@/application/ports/ProductsRepository'
import type { Product, ProductId, ProductsQuery } from '@/domain/product'
import { API_PATHS, PRODUCTS_SIMULATED_ERROR_RATE, SEARCH_FUZZY_MIN_SIMILARITY } from '@/config/constants'
import axiosClient from '@/infrastructure/http/axiosClient'

function normalizeText(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
}

function similarityScore(source: string, target: string): number {
  const a = normalizeText(source)
  const b = normalizeText(target)

  if (!a.length || !b.length) return 0

  const aSet = new Set(a)
  const bSet = new Set(b)
  let common = 0

  for (const ch of aSet) {
    if (bSet.has(ch)) common += 1
  }

  const maxLen = Math.max(aSet.size, bSet.size)
  if (maxLen === 0) return 0

  return common / maxLen
}

export class AxiosProductsRepository implements ProductsRepository {
  async getProducts(query: ProductsQuery): Promise<{
    items: Product[]
    total: number
    categories: string[]
    usedFuzzySearch: boolean
  }> {
    if (import.meta.env.MODE !== 'production' && Math.random() < PRODUCTS_SIMULATED_ERROR_RATE) {
      const error = new Error('Simulated server error') as Error & { response?: { status: number } }
      error.response = { status: 500 }
      throw error
    }

    const response = await axiosClient.get<Product[]>(API_PATHS.products)

    const { searchTerm, category, page, pageSize } = query

    const allProducts = response.data

    const normalizedSearch = searchTerm ? normalizeText(searchTerm) : ''

    const exactFiltered = allProducts.filter((product) => {
      const matchesCategory = category ? product.category === category : true

      if (!normalizedSearch) {
        return matchesCategory
      }

      const normalizedTitle = normalizeText(product.title)
      const matchesSearch = normalizedTitle.includes(normalizedSearch)

      return matchesCategory && matchesSearch
    })

    let filtered: Product[] = exactFiltered
    let usedFuzzySearch = false

    if (filtered.length === 0 && normalizedSearch) {
      const scoredCandidates = allProducts
        .map((product) => {
          const matchesCategory = category ? product.category === category : true
          if (!matchesCategory) {
            return { product, score: 0 }
          }

          const titleScore = similarityScore(product.title, normalizedSearch)
          const categoryScore = similarityScore(product.category, normalizedSearch)
          const score = Math.max(titleScore, categoryScore)

          return { product, score }
        })
        .filter(({ score }) => score >= SEARCH_FUZZY_MIN_SIMILARITY)
        .sort((a, b) => b.score - a.score)

      filtered = scoredCandidates.map(({ product }) => product)
      usedFuzzySearch = filtered.length > 0
    }

    const total = filtered.length
    const start = (page - 1) * pageSize
    const end = start + pageSize

    const paginated = filtered.slice(start, end)
    const categories = Array.from(new Set(response.data.map((p) => p.category))).sort()

    return { items: paginated, total, categories, usedFuzzySearch }
  }

  async getProductById(id: ProductId): Promise<Product> {
    if (import.meta.env.MODE !== 'production' && Math.random() < PRODUCTS_SIMULATED_ERROR_RATE) {
      const error = new Error('Simulated server error') as Error & { response?: { status: number } }
      error.response = { status: 500 }
      throw error
    }

    const response = await axiosClient.get<Product>(API_PATHS.productById(id))
    return response.data
  }
}
