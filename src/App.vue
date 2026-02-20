<script setup lang="ts">
import AppFooter from '@/components/layouts/AppFooter/index.vue'
import AppHeader from '@/components/layouts/AppHeader/index.vue'
</script>

<template>
  <div class="min-h-screen bg-slate-950 text-slate-50 flex flex-col">
    <AppHeader />

    <main class="mx-auto max-w-6xl px-4 py-8 pb-16 flex-1 w-full">
      <router-view />
    </main>

    <AppFooter />
  </div>
</template>

<style scoped></style>
