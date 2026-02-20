<template>
  <form class="flex flex-col gap-4 rounded-lg border border-slate-800 bg-slate-900/60 p-4 sm:flex-row sm:items-end"
    role="search" aria-label="Filter products by name and category" @submit.prevent>
    <div class="flex-1 flex flex-col gap-2 relative">
      <label for="products-search" class="text-xs font-medium capitalize tracking-wide text-slate-400">
        Search by name
      </label>
      <input id="products-search" type="search"
        class="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
        :value="searchTermLocal" @input="onSearchInput(($event.target as HTMLInputElement).value)"
        placeholder="Type a product name..." />

      <ul v-if="showSuggestions && suggestions.length > 0"
        class="absolute z-20 top-full left-0 w-full max-h-64 overflow-y-auto rounded-md border border-slate-700 bg-slate-900/95 text-sm shadow-lg">
        <li v-for="product in suggestions" :key="product.id">
          <button type="button"
            class="flex w-full items-start gap-2 px-3 py-2 text-left text-slate-100 hover:bg-slate-800 cursor-pointer"
            @click="onSuggestionClick(product.title)">
            <span class="flex-1 truncate">{{ product.title }}</span>
            <span class="text-xs text-slate-400 whitespace-nowrap">{{ product.category }}</span>
          </button>
        </li>
      </ul>
    </div>

    <div class="w-full sm:w-64 flex flex-col gap-2">
      <div class="flex items-center justify-between gap-2">
        <label for="products-category" class="text-xs font-medium capitalize tracking-wide text-slate-400">
          Category
        </label>

        <button v-if="hasActiveFilters" type="button"
          class="text-[11px] font-medium text-slate-300 hover:text-sky-300 underline-offset-2 hover:underline whitespace-nowrap cursor-pointer transition-colors"
          @click="resetFilters">
          Reset filters
        </button>
      </div>
      <select id="products-category"
        class="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
        :value="selectedCategoryLocal ?? ''" @change="onCategoryChange(($event.target as HTMLSelectElement).value)">
        <option value="">All categories</option>
        <option v-for="category in categories" :key="category" :value="category">
          {{ category }}
        </option>
      </select>
    </div>
  </form>
</template>

<script setup lang="ts">
import { toRef } from 'vue'
import type { Product } from '@/domain/product'
import { useProductsFiltersScript } from './script'

const props = defineProps<{
  searchTerm: string
  selectedCategory: string | null
  categories: string[]
  suggestions: Product[]
  showSuggestions: boolean
}>()

const emit = defineEmits<{
  (e: 'update:searchTerm', value: string): void
  (e: 'update:selectedCategory', value: string | null): void
  (e: 'suggest:change', value: string): void
  (e: 'suggest:select', value: string): void
}>()

const {
  searchTermLocal,
  selectedCategoryLocal,
  onSearchChange,
  onCategoryChange,
  resetFilters,
  hasActiveFilters,
} = useProductsFiltersScript({
  searchTerm: toRef(props, 'searchTerm'),
  selectedCategory: toRef(props, 'selectedCategory'),
  emitUpdateSearchTerm: (value) => emit('update:searchTerm', value),
  emitUpdateSelectedCategory: (value) => emit('update:selectedCategory', value),
})

const suggestions = toRef(props, 'suggestions')
const showSuggestions = toRef(props, 'showSuggestions')

function onSearchInput(value: string) {
  onSearchChange(value)
  emit('suggest:change', value)
}

function onSuggestionClick(title: string) {
  emit('suggest:select', title)
}

defineOptions({
  name: 'ProductsFilters',
})
</script>
