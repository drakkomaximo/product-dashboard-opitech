import type { Product } from '@/domain/product'
import { formatCurrency } from '@/config/formatters'

export function useProductDetailLayout(product: Product) {
  const formattedPrice = formatCurrency(product.price)

  return {
    formattedPrice,
  }
}
