<template>
  <button v-if="isVisible" type="button"
    class="fixed bottom-6 right-6 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full bg-sky-600 text-slate-50 shadow-lg shadow-sky-500/40 transition hover:bg-sky-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 cursor-pointer"
    @click="scrollToTop" aria-label="Scroll to top">
    <span class="sr-only">Scroll to top</span>
    <svg class="h-5 w-5" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M10 4L4 10H8V16H12V10H16L10 4Z" fill="currentColor" />
    </svg>
  </button>
</template>

<script setup lang="ts">
import { useScrollToTopButtonScript } from './script'

const { isVisible, scrollToTop } = useScrollToTopButtonScript()

defineOptions({
  name: 'ScrollToTopButton',
})
</script>
