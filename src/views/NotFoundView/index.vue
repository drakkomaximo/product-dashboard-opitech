<template>
  <section class="space-y-6 py-16">
    <header class="flex items-center justify-between gap-4">
      <h2 class="text-2xl font-semibold tracking-tight">Page not found</h2>
      <RouterLink :to="{ name: routeNames.productsList }"
        class="inline-flex items-center gap-2 rounded-md border border-slate-700 bg-slate-900 px-4 py-2 text-xs font-medium text-slate-100 hover:border-sky-500 hover:text-sky-300 hover:bg-slate-900/80 transition-colors min-w-36 justify-center">
        <span class="text-slate-400">←</span>
        <span>Back to products</span>
      </RouterLink>
    </header>

    <div class="rounded-md border border-slate-800 bg-slate-900/60 px-4 py-10 text-center text-sm text-slate-400">
      The page you are looking for does not exist or the link is invalid.
    </div>
  </section>
</template>

<script setup lang="ts">
import { ROUTE_NAMES } from '@/config/constants'

const routeNames = ROUTE_NAMES

defineOptions({
  name: 'NotFoundView',
})
</script>
