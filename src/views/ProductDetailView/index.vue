<template>
  <section class="space-y-6 pb-10">
    <header class="flex items-center justify-between gap-4">

      <RouterLink :to="{ name: ROUTE_NAMES.productsList }"
        class="inline-flex items-center gap-2 rounded-md border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-100 hover:border-sky-500 hover:text-sky-300 hover:bg-slate-900/80 transition-colors">
        <span class="text-slate-400">←</span>
        <span>Back to products</span>
      </RouterLink>
    </header>

    <Transition name="fade" mode="out-in">
      <ProductDetailSkeleton v-if="isLoading" :key="'loading'" />

      <ErrorWithRetry v-else-if="errorMessage" :key="'error'" :message="errorMessage" @retry="onRetry" />

      <ProductDetailLayout v-else-if="product" :key="'content'" :product="product" />

      <div v-else :key="'not-found'"
        class="rounded-md border border-slate-800 bg-slate-900/60 px-4 py-10 text-center text-sm text-slate-400"
        role="status" aria-live="polite">
        Product not found.
      </div>
    </Transition>
  </section>
</template>

<script setup lang="ts">
import ErrorWithRetry from '@/components/ui/ErrorWithRetry/index.vue'
import ProductDetailLayout from '@/components/layouts/ProductDetailLayout/index.vue'
import ProductDetailSkeleton from '@/components/layouts/ProductDetailSkeleton/index.vue'
import { ROUTE_NAMES } from '@/config/constants'
import { useProductDetail } from './script'

defineOptions({
  name: 'ProductDetailView',
})

const {
  product,
  isLoading,
  errorMessage,
  loadProduct,
} = useProductDetail()

function onRetry() {
  void loadProduct()
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
