<template>
  <section aria-hidden="true">
    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div v-for="index in 6" :key="index"
        class="flex flex-col overflow-hidden rounded-lg border border-slate-800 bg-slate-900/60 animate-pulse">
        <div class="aspect-4/3 bg-slate-900" />
        <div class="flex flex-1 flex-col gap-3 px-4 py-3">
          <div class="h-3 w-3/4 rounded bg-slate-800" />
          <div class="h-3 w-1/2 rounded bg-slate-800" />
          <div class="mt-auto h-4 w-1/3 rounded bg-slate-800" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">

defineOptions({
  name: 'ProductsGridSkeleton',
})
</script>
