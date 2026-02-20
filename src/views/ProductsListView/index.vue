<template>
  <section class="space-y-6">
    <header class="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h2 class="text-2xl font-semibold tracking-tight">Products</h2>
        <p class="text-sm text-slate-400">Browse the product catalog from the e-commerce API.</p>
      </div>

      <div class="text-sm text-slate-400">
        <span v-if="!isLoading && total > 0">{{ total }} products</span>
      </div>
    </header>

    <div v-if="errorMessage" class="rounded-md border border-red-500/40 bg-red-950/40 px-4 py-3 text-sm">
      {{ errorMessage }}
    </div>

    <div v-if="isLoading" class="grid place-items-center py-16 text-slate-400">
      <span>Loading products...</span>
    </div>

    <div v-else class="space-y-6">
      <div v-if="products.length === 0"
        class="rounded-md border border-slate-800 bg-slate-900/60 px-4 py-10 text-center text-sm text-slate-400">
        No products found.
      </div>

      <div v-else class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <article v-for="product in products" :key="product.id"
          class="flex flex-col overflow-hidden rounded-lg border border-slate-800 bg-slate-900/60">
          <div class="aspect-[4/3] bg-slate-900">
            <img :src="product.image" :alt="product.title" class="h-full w-full object-cover" loading="lazy" />
          </div>
          <div class="flex flex-1 flex-col gap-2 px-4 py-3">
            <h3 class="line-clamp-2 text-sm font-medium leading-snug">{{ product.title }}</h3>
            <p class="text-xs text-slate-400">{{ product.category }}</p>
            <p class="mt-auto text-base font-semibold text-sky-400">
              {{ product.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }}
            </p>
          </div>
        </article>
      </div>

      <footer class="flex items-center justify-between border-t border-slate-800 pt-4 text-sm text-slate-300">
        <div>
          Page {{ page }} of {{ totalPages }}
        </div>
        <div class="flex gap-2">
          <button type="button"
            class="rounded-md border border-slate-700 px-3 py-1 disabled:cursor-not-allowed disabled:opacity-50"
            :disabled="page <= 1 || isLoading" @click="goToPreviousPage">
            Previous
          </button>
          <button type="button"
            class="rounded-md border border-slate-700 px-3 py-1 disabled:cursor-not-allowed disabled:opacity-50"
            :disabled="page >= totalPages || isLoading" @click="goToNextPage">
            Next
          </button>
        </div>
      </footer>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useProductsList } from './script'

defineOptions({
  name: 'ProductsListView',
})

const {
  products,
  total,
  isLoading,
  errorMessage,
  page,
  totalPages,
  goToPreviousPage,
  goToNextPage,
} = useProductsList()
</script>
