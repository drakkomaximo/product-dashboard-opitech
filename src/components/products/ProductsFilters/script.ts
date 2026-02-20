import type { Ref } from 'vue'
import { computed, ref, watch } from 'vue'
import { SEARCH_DEBOUNCE_MS } from '@/config/constants'

export interface ProductsFiltersOptions {
  searchTerm: Ref<string>
  selectedCategory: Ref<string | null>
  emitUpdateSearchTerm: (value: string) => void
  emitUpdateSelectedCategory: (value: string | null) => void
}

export function useProductsFiltersScript(options: ProductsFiltersOptions) {
  const searchTermLocal = ref(options.searchTerm.value)
  const selectedCategoryLocal = ref<string | null>(options.selectedCategory.value)

  let searchDebounceTimeout: number | undefined

  watch(
    () => options.searchTerm.value,
    (value) => {
      searchTermLocal.value = value
    },
  )

  watch(
    () => options.selectedCategory.value,
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
      options.emitUpdateSearchTerm(value)
    }, SEARCH_DEBOUNCE_MS)
  }

  function onCategoryChange(value: string) {
    const normalized = value === '' ? null : value
    selectedCategoryLocal.value = normalized
    options.emitUpdateSelectedCategory(normalized)
  }

  function resetFilters() {
    if (searchDebounceTimeout !== undefined) {
      window.clearTimeout(searchDebounceTimeout)
      searchDebounceTimeout = undefined
    }
    searchTermLocal.value = ''
    selectedCategoryLocal.value = null
    options.emitUpdateSearchTerm('')
    options.emitUpdateSelectedCategory(null)
  }

  const hasActiveFilters = computed(
    () => searchTermLocal.value.trim() !== '' || selectedCategoryLocal.value !== null,
  )

  return {
    searchTermLocal,
    selectedCategoryLocal,
    onSearchChange,
    onCategoryChange,
    resetFilters,
    hasActiveFilters,
  }
}
