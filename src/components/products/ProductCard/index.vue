<template>
  <RouterLink :to="{ name: ROUTE_NAMES.productDetail, params: { id: product.id } }"
    class="group flex flex-col overflow-hidden rounded-lg border border-slate-800 bg-slate-900/60 cursor-pointer no-underline transition-shadow duration-200 ease-out hover:shadow-lg hover:shadow-sky-500/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
    :aria-labelledby="'product-title-' + product.id">
    <article class="flex h-full flex-col">
      <div class="relative aspect-4/3 bg-slate-900 overflow-hidden flex items-center justify-center">
        <img :src="product.image" :alt="product.title"
          class="h-full w-full max-h-[85%] max-w-[85%] object-contain transition-transform duration-300 ease-out group-hover:scale-110"
          loading="lazy" />

        <div class="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between px-3 pt-3 text-xs">
          <span
            class="pointer-events-auto inline-flex items-center rounded-full border border-slate-700 bg-slate-900/90 px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide text-slate-300">
            {{ product.category }}
          </span>

          <span class="pointer-events-auto rounded-full bg-slate-900/90 px-2 py-0.5 text-sm font-semibold text-sky-400">
            {{ formatCurrency(product.price) }}
          </span>
        </div>
      </div>
      <div class="flex flex-1 flex-col px-4 py-3">
        <div class="flex items-start justify-center min-h-11">
          <h3 :id="'product-title-' + product.id" class="line-clamp-2 text-sm font-medium leading-none text-center">
            {{ product.title }}
          </h3>
        </div>
      </div>
    </article>
  </RouterLink>
</template>

<script setup lang="ts">
import type { Product } from '@/domain/product'
import { ROUTE_NAMES } from '@/config/constants'
import { formatCurrency } from '@/config/formatters'
import { RouterLink } from 'vue-router'

defineProps<{
  product: Product
}>()

defineOptions({
  name: 'ProductCard',
})
</script>
