import { ref, computed } from 'vue'
import type { Product } from '@/domain/product'
import { DEFAULT_PAGE_SIZE } from '@/config/constants'
import { AxiosProductsRepository } from '@/infrastructure/http/AxiosProductsRepository'
import { GetProductsUseCase } from '@/application/use-cases/GetProductsUseCase'

const productsListRepository = new AxiosProductsRepository()
const getProductsUseCase = new GetProductsUseCase(productsListRepository)

function getProductsErrorMessage(status?: number): string {
  if (status && status >= 500) {
    return 'There was a server error while loading products. Please try again.'
  }

  return 'Failed to load products. Please check your connection and try again.'
}

export function useProductsList() {

  const products = ref<Product[]>([])
  const total = ref(0)
  const categories = ref<string[]>([])
  const isLoading = ref(false)
  const errorMessage = ref<string | null>(null)
  const usedFuzzySearch = ref(false)

  const page = ref(1)
  const pageSize = ref(DEFAULT_PAGE_SIZE)

  const searchTerm = ref('')
  const selectedCategory = ref<string | null>(null)

  const totalPages = computed(() => {
    if (total.value === 0) return 1
    return Math.ceil(total.value / pageSize.value)
  })

  async function loadProducts() {
    try {
      isLoading.value = true
      errorMessage.value = null

      const result = await getProductsUseCase.execute({
        page: page.value,
        pageSize: pageSize.value,
        searchTerm: searchTerm.value.trim() || undefined,
        category: selectedCategory.value || undefined,
      })

      products.value = result.items
      total.value = result.total
      categories.value = result.categories
      usedFuzzySearch.value = result.usedFuzzySearch
    } catch (error: unknown) {
      console.error('Failed to load products', error as Error)

      const maybeWithStatus = error as { response?: { status?: number } }
      const status = maybeWithStatus.response?.status

      errorMessage.value = getProductsErrorMessage(status)
    } finally {
      isLoading.value = false
    }
  }

  function goToPreviousPage() {
    if (page.value <= 1) return
    page.value -= 1
    void loadProducts()
  }

  function goToNextPage() {
    if (page.value >= totalPages.value) return
    page.value += 1
    void loadProducts()
  }

  return {
    products,
    total,
    categories,
    isLoading,
    errorMessage,
    usedFuzzySearch,
    page,
    pageSize,
    searchTerm,
    selectedCategory,
    totalPages,
    goToPreviousPage,
    goToNextPage,
    loadProducts,
  }
}
