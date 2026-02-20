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

  // Simple overlap-based similarity: caracteres en común sobre longitud máxima
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
    if (Math.random() < PRODUCTS_SIMULATED_ERROR_RATE) {
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

    // Si no hay resultados exactos pero hay término de búsqueda, intentar coincidencias difusas
    if (filtered.length === 0 && normalizedSearch) {
      filtered = allProducts
        .filter((product) => {
          const matchesCategory = category ? product.category === category : true
          if (!matchesCategory) return false

          // Considerar tanto el título como la categoría para la similitud global
          const titleScore = similarityScore(product.title, normalizedSearch)
          const categoryScore = similarityScore(product.category, normalizedSearch)
          const score = Math.max(titleScore, categoryScore)
          return score >= SEARCH_FUZZY_MIN_SIMILARITY
        })
        .sort((a, b) => {
          const scoreATitle = similarityScore(a.title, normalizedSearch)
          const scoreACategory = similarityScore(a.category, normalizedSearch)
          const scoreA = Math.max(scoreATitle, scoreACategory)

          const scoreBTitle = similarityScore(b.title, normalizedSearch)
          const scoreBCategory = similarityScore(b.category, normalizedSearch)
          const scoreB = Math.max(scoreBTitle, scoreBCategory)
          return scoreB - scoreA
        })
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
    if (Math.random() < PRODUCTS_SIMULATED_ERROR_RATE) {
      const error = new Error('Simulated server error') as Error & { response?: { status: number } }
      error.response = { status: 500 }
      throw error
    }

    const response = await axiosClient.get<Product>(API_PATHS.productById(id))
    return response.data
  }
}
