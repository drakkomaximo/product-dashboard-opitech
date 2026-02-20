<template>
  <section v-if="products.length === 0"
    class="rounded-md border border-slate-800 bg-slate-900/60 px-4 py-10 text-center text-sm text-slate-400"
    aria-live="polite" role="status">
    No products found.
  </section>
  <section v-else aria-label="Products list">
    <ul class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" role="list">
      <li v-for="product in products" :key="product.id" class="list-none">
        <ProductCard :product="product" />
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import type { Product } from '@/domain/product'
import ProductCard from '@/components/products/ProductCard.vue'

defineProps<{
  products: Product[]
}>()
</script>
