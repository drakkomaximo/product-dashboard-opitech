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
      :suggestions="suggestions" :show-suggestions="areSuggestionsVisible" @update:search-term="onSearchTermChange"
      @update:selected-category="onCategoryChange" @suggest:change="onSuggestionChange"
      @suggest:select="onSuggestionSelect" />

    <p v-if="usedFuzzySearch && searchTerm" class="text-xs text-slate-400">
      Showing results similar to "{{ searchTerm }}".
    </p>

    <Transition name="fade" mode="out-in">
      <template v-if="isLoading">
        <ProductsGridSkeleton />
      </template>

      <ErrorWithRetry v-else-if="errorMessage" :message="errorMessage" @retry="onRetryLoadProducts" />

      <div v-else class="space-y-6">
        <ProductsGrid :products="products" />

        <PaginationControls v-if="total > 0 && totalPages > 1" :page="page" :total-pages="totalPages"
          :disabled="isLoading" @previous="onPreviousPage" @next="onNextPage" />
      </div>
    </Transition>

    <ScrollToTopButton />
  </section>
</template>

<script setup lang="ts">
import ErrorWithRetry from '@/components/ui/ErrorWithRetry/index.vue'
import ProductsGrid from '@/components/products/ProductsGrid/index.vue'
import PaginationControls from '@/components/ui/PaginationControls/index.vue'
import ProductsFilters from '@/components/products/ProductsFilters/index.vue'
import ProductsGridSkeleton from '@/components/products/ProductsGridSkeleton/index.vue'
import ScrollToTopButton from '@/components/ui/ScrollToTopButton/index.vue'
import { useProductsList } from './script'
import { useProductsListQuery } from './useProductsListQuery'

defineOptions({
  name: 'ProductsListView',
})

const {
  products,
  total,
  categories,
  isLoading,
  errorMessage,
  usedFuzzySearch,
  page,
  searchTerm,
  selectedCategory,
  totalPages,
  suggestions,
  areSuggestionsVisible,
  goToPreviousPage,
  goToNextPage,
  loadProducts,
  loadSuggestions,
  clearSuggestions,
} = useProductsList()

const {
  handleSearchChange,
  handleCategoryChange,
  handlePreviousPage,
  handleNextPage,
} = useProductsListQuery(
  page,
  searchTerm,
  selectedCategory,
  loadProducts,
  goToPreviousPage,
  goToNextPage,
)

function onSearchTermChange(value: string) {
  handleSearchChange(value)
}

function onCategoryChange(value: string | null) {
  handleCategoryChange(value)
}

function onSuggestionChange(value: string) {
  loadSuggestions(value)
}

function onSuggestionSelect(value: string) {
  handleSearchChange(value)
  clearSuggestions()
}

function onRetryLoadProducts() {
  void loadProducts()
}

function onPreviousPage() {
  handlePreviousPage()
}

function onNextPage() {
  handleNextPage()
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
