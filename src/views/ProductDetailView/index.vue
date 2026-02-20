<template>
  <section class="space-y-6">
    <header>
      <h2 class="text-2xl font-semibold tracking-tight">Product detail</h2>
    </header>

    <div v-if="errorMessage" class="rounded-md border border-red-500/40 bg-red-950/40 px-4 py-3 text-sm">
      {{ errorMessage }}
    </div>

    <div v-if="isLoading" class="grid place-items-center py-16 text-slate-400">
      <span>Loading product...</span>
    </div>

    <div v-else-if="product" class="grid gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
      <div class="overflow-hidden rounded-lg border border-slate-800 bg-slate-900/60">
        <div class="aspect-[4/3] bg-slate-900">
          <img :src="product.image" :alt="product.title" class="h-full w-full object-cover" />
        </div>
      </div>

      <div class="space-y-4">
        <div>
          <p class="text-sm uppercase tracking-wide text-slate-400">{{ product.category }}</p>
          <h3 class="mt-1 text-2xl font-semibold leading-tight">{{ product.title }}</h3>
        </div>

        <p class="text-sm text-slate-300">{{ product.description }}</p>

        <p class="text-2xl font-semibold text-sky-400">
          {{ product.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }}
        </p>
      </div>
    </div>

    <div v-else
      class="rounded-md border border-slate-800 bg-slate-900/60 px-4 py-10 text-center text-sm text-slate-400">
      Product not found.
    </div>
  </section>
</template>

<script setup lang="ts">
import { useProductDetail } from './script'

defineOptions({
  name: 'ProductDetailView',
})

const {
  product,
  isLoading,
  errorMessage,
} = useProductDetail()
</script>
