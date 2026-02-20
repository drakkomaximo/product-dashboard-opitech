import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import type { Product } from '@/domain/product'
import { AxiosProductsRepository } from '@/infrastructure/http/AxiosProductsRepository'
import { GetProductDetailUseCase } from '@/application/use-cases/GetProductDetailUseCase'

const productDetailRepository = new AxiosProductsRepository()
const getProductDetailUseCase = new GetProductDetailUseCase(productDetailRepository)

function getProductDetailErrorMessage(status?: number): string {
  if (status && status >= 500) {
    return 'There was a server error while loading this product. Please try again.'
  }

  return 'Failed to load product details. Please check your connection and try again.'
}

export function useProductDetail() {
  const route = useRoute()

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

      errorMessage.value = getProductDetailErrorMessage(status)
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
