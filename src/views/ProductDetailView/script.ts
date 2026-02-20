import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import type { Product } from '@/domain/product'
import { AxiosProductsRepository } from '@/infrastructure/http/AxiosProductsRepository'
import { GetProductDetailUseCase } from '@/application/use-cases/GetProductDetailUseCase'

export function useProductDetail() {
  const route = useRoute()

  const repository = new AxiosProductsRepository()
  const getProductDetailUseCase = new GetProductDetailUseCase(repository)

  const product = ref<Product | null>(null)
  const isLoading = ref(false)
  const errorMessage = ref<string | null>(null)

  async function loadProduct() {
    product.value = null
    const idParam = route.params.id
    const id = Number(idParam)

    if (!Number.isFinite(id)) {
      errorMessage.value = 'Invalid product id.'
      return
    }

    try {
      isLoading.value = true
      errorMessage.value = null

      product.value = await getProductDetailUseCase.execute(id)
    } catch (error: unknown) {
      console.error('Failed to load product details', error as Error)

      const maybeWithStatus = error as { response?: { status?: number } }
      const status = maybeWithStatus.response?.status

      if (status && status >= 500) {
        errorMessage.value = 'There was a server error while loading this product. Please try again.'
      } else {
        errorMessage.value = 'Failed to load product details. Please check your connection and try again.'
      }
      product.value = null
    } finally {
      isLoading.value = false
    }
  }

  watch(
    () => route.params.id,
    () => {
      void loadProduct()
    },
    { immediate: true },
  )

  return {
    product,
    isLoading,
    errorMessage,
  }
}
