import { onMounted, type Ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export function useProductsListQuery(
  page: Ref<number>,
  searchTerm: Ref<string>,
  selectedCategory: Ref<string | null>,
  loadProducts: () => Promise<void> | void,
  goToPreviousPage: () => void,
  goToNextPage: () => void,
) {
  const route = useRoute()
  const router = useRouter()

  function syncStateFromRoute() {
    const query = route.query

    const q = typeof query.q === 'string' ? query.q : ''
    const category = typeof query.category === 'string' && query.category !== ''
      ? query.category
      : null
    const pageParam = Array.isArray(query.page) ? query.page[0] : query.page
    const parsedPage = Number(pageParam ?? '1')

    searchTerm.value = q
    selectedCategory.value = category
    page.value = Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1
  }

  function updateRouteQuery() {
    void router.replace({
      query: {
        ...route.query,
        q: searchTerm.value || undefined,
        category: selectedCategory.value || undefined,
        page: String(page.value),
      },
    })
  }

  function scrollToTop() {
    if (typeof window === 'undefined') return
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  onMounted(() => {
    syncStateFromRoute()
    void loadProducts()
  })

  function handleSearchChange(value: string) {
    searchTerm.value = value
    page.value = 1
    updateRouteQuery()
    scrollToTop()
    void loadProducts()
  }

  function handleCategoryChange(value: string | null) {
    selectedCategory.value = value
    page.value = 1
    updateRouteQuery()
    scrollToTop()
    void loadProducts()
  }

  function handlePreviousPage() {
    goToPreviousPage()
    updateRouteQuery()
    scrollToTop()
  }

  function handleNextPage() {
    goToNextPage()
    updateRouteQuery()
    scrollToTop()
  }

  return {
    handleSearchChange,
    handleCategoryChange,
    handlePreviousPage,
    handleNextPage,
  }
}
