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

    <ProductsFilters :search-term="searchTerm" :selected-category="selectedCategory" :categories="categories"
      @update:search-term="onSearchTermChange" @update:selected-category="onCategoryChange" />

    <LoadingState v-if="isLoading" label="Loading products..." />

    <AlertMessage v-else-if="errorMessage" variant="error">
      {{ errorMessage }}
    </AlertMessage>

    <div v-else class="space-y-6">
      <ProductsGrid :products="products" />

      <PaginationControls :page="page" :total-pages="totalPages" :disabled="isLoading" @previous="goToPreviousPage"
        @next="goToNextPage" />
    </div>
  </section>
</template>

<script setup lang="ts">
import AlertMessage from '@/components/ui/AlertMessage.vue'
import LoadingState from '@/components/ui/LoadingState.vue'
import ProductsGrid from '@/components/products/ProductsGrid.vue'
import PaginationControls from '@/components/ui/PaginationControls.vue'
import ProductsFilters from '@/components/products/ProductsFilters.vue'
import { useProductsList } from './script'

defineOptions({
  name: 'ProductsListView',
})

const {
  products,
  total,
  categories,
  isLoading,
  errorMessage,
  page,
  searchTerm,
  selectedCategory,
  totalPages,
  goToPreviousPage,
  goToNextPage,
  loadProducts,
} = useProductsList()

function onSearchTermChange(value: string) {
  searchTerm.value = value
  page.value = 1
  void loadProducts()
}

function onCategoryChange(value: string | null) {
  selectedCategory.value = value
  page.value = 1
  void loadProducts()
}
</script>
