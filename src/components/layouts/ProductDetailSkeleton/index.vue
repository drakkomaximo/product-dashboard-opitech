<template>
  <div class="grid gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
    <div class="overflow-hidden rounded-lg border border-slate-800 bg-slate-900/60">
      <div class="aspect-4/3 bg-slate-900 flex items-center justify-center">
        <div class="h-3/4 w-3/4 rounded bg-slate-800 animate-pulse" />
      </div>
    </div>

    <div class="space-y-4">
      <div class="space-y-2">
        <div class="h-4 w-24 rounded bg-slate-800 animate-pulse" />
        <div class="h-6 w-64 rounded bg-slate-800 animate-pulse" />
      </div>

      <div class="space-y-2">
        <div class="h-3 w-full rounded bg-slate-800 animate-pulse" />
        <div class="h-3 w-5/6 rounded bg-slate-800 animate-pulse" />
        <div class="h-3 w-4/6 rounded bg-slate-800 animate-pulse" />
      </div>

      <div class="h-7 w-24 rounded bg-slate-800 animate-pulse" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'ProductDetailSkeleton',
})
</script>
