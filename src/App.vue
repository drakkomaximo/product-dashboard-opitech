<script setup lang="ts"></script>

<template>
  <div class="min-h-screen bg-slate-950 text-slate-50">
    <header class="border-b border-slate-800 bg-slate-900/80 backdrop-blur">
      <div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <h1 class="text-lg font-semibold tracking-tight">Products Dashboard</h1>
      </div>
    </header>

    <main class="mx-auto max-w-6xl px-4 py-8">
      <router-view />
    </main>
  </div>
</template>

<style scoped></style>
