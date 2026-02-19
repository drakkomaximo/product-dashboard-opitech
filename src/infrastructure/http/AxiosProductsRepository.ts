import type { ProductsRepository } from '@/application/ports/ProductsRepository'
import type { Product, ProductId, ProductsQuery } from '@/domain/product'
import { API_PATHS } from '@/config/constants'
import axiosClient from '@/infrastructure/http/axiosClient'

export class AxiosProductsRepository implements ProductsRepository {
  async getProducts(query: ProductsQuery): Promise<{
    items: Product[]
    total: number
    categories: string[]
  }> {
    const response = await axiosClient.get<Product[]>(API_PATHS.products)

    const { searchTerm, category, page, pageSize } = query

    const filtered = response.data.filter((product) => {
      const matchesSearch = searchTerm
        ? product.title.toLowerCase().includes(searchTerm.toLowerCase())
        : true
      const matchesCategory = category ? product.category === category : true
      return matchesSearch && matchesCategory
    })

    const total = filtered.length
    const start = (page - 1) * pageSize
    const end = start + pageSize

    const paginated = filtered.slice(start, end)
    const categories = Array.from(new Set(response.data.map((p) => p.category))).sort()

    return { items: paginated, total, categories }
  }

  async getProductById(id: ProductId): Promise<Product> {
    const response = await axiosClient.get<Product>(API_PATHS.productById(id))
    return response.data
  }
}
