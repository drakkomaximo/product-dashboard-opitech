import { onMounted, ref, computed } from 'vue'
import type { Product } from '@/domain/product'
import { DEFAULT_PAGE_SIZE } from '@/config/constants'
import { AxiosProductsRepository } from '@/infrastructure/http/AxiosProductsRepository'
import { GetProductsUseCase } from '@/application/use-cases/GetProductsUseCase'

export function useProductsList() {
  const repository = new AxiosProductsRepository()
  const getProductsUseCase = new GetProductsUseCase(repository)

  const products = ref<Product[]>([])
  const total = ref(0)
  const categories = ref<string[]>([])
  const isLoading = ref(false)
  const errorMessage = ref<string | null>(null)

  const page = ref(1)
  const pageSize = ref(DEFAULT_PAGE_SIZE)

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
        searchTerm: undefined,
        category: undefined,
      })

      products.value = result.items
      total.value = result.total
      categories.value = result.categories
    } catch (error: unknown) {
      console.error('Failed to load products', error as Error)
      errorMessage.value = 'Failed to load products. Please try again.'
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

  onMounted(() => {
    void loadProducts()
  })

  return {
    products,
    total,
    categories,
    isLoading,
    errorMessage,
    page,
    pageSize,
    totalPages,
    goToPreviousPage,
    goToNextPage,
  }
}
