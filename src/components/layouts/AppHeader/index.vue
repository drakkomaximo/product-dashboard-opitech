<template>
  <header class="border-b border-slate-800 bg-slate-900/80 backdrop-blur">
    <div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
      <h1 class="text-lg font-semibold tracking-tight">
        <RouterLink
          :to="{ name: routeNames.productsList }"
          class="hover:text-sky-300 transition-colors"
        >
          Products Dashboard
        </RouterLink>
      </h1>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useAppHeaderLayout } from './script'

const { routeNames } = useAppHeaderLayout()

defineOptions({
  name: 'AppHeader',
})
</script>
