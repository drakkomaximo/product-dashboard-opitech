<template>
  <article
    class="grid gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]"
    :aria-labelledby="'product-detail-title-' + product.id"
  >
    <div class="group overflow-hidden rounded-lg border border-slate-800 bg-slate-900/60">
      <div class="aspect-4/3 bg-slate-900 overflow-hidden flex items-center justify-center">
        <img
          :src="product.image"
          :alt="product.title"
          class="h-full w-full max-h-[85%] max-w-[85%] object-contain transition-transform duration-300 ease-out group-hover:scale-110"
        />
      </div>
    </div>

    <div class="space-y-4">
      <div>
        <p class="text-sm uppercase tracking-wide text-slate-400">
          {{ product.category }}
        </p>
        <h2
          :id="'product-detail-title-' + product.id"
          class="mt-1 text-2xl font-semibold leading-tight"
        >
          {{ product.title }}
        </h2>
      </div>

      <p class="text-sm text-slate-300">
        {{ product.description }}
      </p>

      <p class="text-2xl font-semibold text-sky-400">
        {{ formattedPrice }}
      </p>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { Product } from '@/domain/product'
import { useProductDetailLayout } from './script'

const props = defineProps<{
  product: Product
}>()

const { formattedPrice } = useProductDetailLayout(props.product)

defineOptions({
  name: 'ProductDetailLayout',
})
</script>
