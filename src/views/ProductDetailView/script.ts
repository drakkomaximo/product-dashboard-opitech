import { onMounted, ref } from 'vue'
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
      errorMessage.value = 'Failed to load product details. Please try again.'
    } finally {
      isLoading.value = false
    }
  }

  onMounted(() => {
    void loadProduct()
  })

  return {
    product,
    isLoading,
    errorMessage,
  }
}
