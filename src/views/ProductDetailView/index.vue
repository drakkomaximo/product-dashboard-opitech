<template>
  <section class="space-y-6">
    <header>
      <h2 class="text-2xl font-semibold tracking-tight">Product detail</h2>
    </header>

    <LoadingState v-if="isLoading" label="Loading product..." />

    <AlertMessage v-else-if="errorMessage" variant="error">
      {{ errorMessage }}
    </AlertMessage>

    <ProductDetailLayout v-else-if="product" :product="product" />

    <div v-else class="rounded-md border border-slate-800 bg-slate-900/60 px-4 py-10 text-center text-sm text-slate-400"
      role="status" aria-live="polite">
      Product not found.
    </div>
  </section>
</template>

<script setup lang="ts">
import AlertMessage from '@/components/ui/AlertMessage.vue'
import LoadingState from '@/components/ui/LoadingState.vue'
import ProductDetailLayout from '@/components/layouts/ProductDetailLayout.vue'
import { useProductDetail } from './script'

defineOptions({
  name: 'ProductDetailView',
})

const {
  product,
  isLoading,
  errorMessage,
} = useProductDetail()
</script>
