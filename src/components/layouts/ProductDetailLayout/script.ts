import { computed, toValue, type MaybeRefOrGetter } from 'vue'
import type { Product } from '@/domain/product'
import { formatCurrency } from '@/config/formatters'

export function useProductDetailLayout(product: MaybeRefOrGetter<Product>) {
  const formattedPrice = computed(() => formatCurrency(toValue(product).price))

  return {
    formattedPrice,
  }
}
