import { onMounted, onUnmounted, ref } from 'vue'

export function useScrollToTopButtonScript() {
  const isVisible = ref(false)

  function handleScroll() {
    if (typeof window === 'undefined') return
    isVisible.value = window.scrollY > 200
  }

  function scrollToTop() {
    if (typeof window === 'undefined') return
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  onMounted(() => {
    if (typeof window === 'undefined') return
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
  })

  onUnmounted(() => {
    if (typeof window === 'undefined') return
    window.removeEventListener('scroll', handleScroll)
  })

  return {
    isVisible,
    scrollToTop,
  }
}
