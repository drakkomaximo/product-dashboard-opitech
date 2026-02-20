<template>
  <form class="flex flex-col gap-4 rounded-lg border border-slate-800 bg-slate-900/60 p-4 sm:flex-row sm:items-end"
    role="search" aria-label="Filter products by name and category" @submit.prevent>
    <div class="flex-1">
      <label for="products-search" class="block text-xs font-medium uppercase tracking-wide text-slate-400">
        Search by name
      </label>
      <input id="products-search" type="search"
        class="mt-1 w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
        :value="searchTermLocal" @input="onSearchChange(($event.target as HTMLInputElement).value)"
        placeholder="Type a product name..." />
    </div>

    <div class="w-full sm:w-64">
      <label for="products-category" class="block text-xs font-medium uppercase tracking-wide text-slate-400">
        Category
      </label>
      <select id="products-category"
        class="mt-1 w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
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
import { ref, watch } from 'vue'
import { SEARCH_DEBOUNCE_MS } from '@/config/constants'

const props = defineProps<{
  searchTerm: string
  selectedCategory: string | null
  categories: string[]
}>()

const emit = defineEmits<{
  (e: 'update:searchTerm', value: string): void
  (e: 'update:selectedCategory', value: string | null): void
}>()

const searchTermLocal = ref(props.searchTerm)
const selectedCategoryLocal = ref<string | null>(props.selectedCategory)

let searchDebounceTimeout: number | undefined

watch(
  () => props.searchTerm,
  (value) => {
    searchTermLocal.value = value
  },
)

watch(
  () => props.selectedCategory,
  (value) => {
    selectedCategoryLocal.value = value
  },
)

function onSearchChange(value: string) {
  searchTermLocal.value = value
  if (searchDebounceTimeout !== undefined) {
    window.clearTimeout(searchDebounceTimeout)
  }

  searchDebounceTimeout = window.setTimeout(() => {
    emit('update:searchTerm', value)
  }, SEARCH_DEBOUNCE_MS)
}

function onCategoryChange(value: string) {
  const normalized = value === '' ? null : value
  selectedCategoryLocal.value = normalized
  emit('update:selectedCategory', normalized)
}
</script>
