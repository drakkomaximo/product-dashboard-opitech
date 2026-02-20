import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { ref } from 'vue'
import { SEARCH_DEBOUNCE_MS } from '../../../../config/constants'
import { useProductsFiltersScript } from '../../../../components/products/ProductsFilters/script'

describe('useProductsFiltersScript', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('debounces search changes using SEARCH_DEBOUNCE_MS', () => {
    const searchTerm = ref('')
    const selectedCategory = ref<string | null>(null)
    const emitUpdateSearchTerm = vi.fn()
    const emitUpdateSelectedCategory = vi.fn()

    const { onSearchChange } = useProductsFiltersScript({
      searchTerm,
      selectedCategory,
      emitUpdateSearchTerm,
      emitUpdateSelectedCategory,
    })

    onSearchChange('p')
    onSearchChange('ph')
    onSearchChange('pho')

    expect(emitUpdateSearchTerm).not.toHaveBeenCalled()

    vi.advanceTimersByTime(SEARCH_DEBOUNCE_MS)

    expect(emitUpdateSearchTerm).toHaveBeenCalledTimes(1)
    expect(emitUpdateSearchTerm).toHaveBeenCalledWith('pho')
  })

  it('resetFilters clears search and category and emits updates', () => {
    const searchTerm = ref('initial')
    const selectedCategory = ref<string | null>('initial-category')
    const emitUpdateSearchTerm = vi.fn()
    const emitUpdateSelectedCategory = vi.fn()

    const { resetFilters, searchTermLocal, selectedCategoryLocal } = useProductsFiltersScript({
      searchTerm,
      selectedCategory,
      emitUpdateSearchTerm,
      emitUpdateSelectedCategory,
    })

    resetFilters()

    expect(searchTermLocal.value).toBe('')
    expect(selectedCategoryLocal.value).toBeNull()
    expect(emitUpdateSearchTerm).toHaveBeenCalledWith('')
    expect(emitUpdateSelectedCategory).toHaveBeenCalledWith(null)
  })

  it('hasActiveFilters reflects when there is search text or selected category', () => {
    const searchTerm = ref('')
    const selectedCategory = ref<string | null>(null)
    const emitUpdateSearchTerm = vi.fn()
    const emitUpdateSelectedCategory = vi.fn()

    const { hasActiveFilters, searchTermLocal, selectedCategoryLocal } = useProductsFiltersScript({
      searchTerm,
      selectedCategory,
      emitUpdateSearchTerm,
      emitUpdateSelectedCategory,
    })

    expect(hasActiveFilters.value).toBe(false)

    searchTermLocal.value = 'phone'
    expect(hasActiveFilters.value).toBe(true)

    searchTermLocal.value = ''
    selectedCategoryLocal.value = 'electronics'
    expect(hasActiveFilters.value).toBe(true)

    searchTermLocal.value = ''
    selectedCategoryLocal.value = null
    expect(hasActiveFilters.value).toBe(false)
  })
})
