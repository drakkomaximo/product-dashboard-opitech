<template>
  <div :class="[
    'rounded-md border px-4 py-3 text-sm',
    isError
      ? 'border-red-500/40 bg-red-950/40 text-red-100'
      : 'border-slate-700 bg-slate-900/80 text-slate-100',
  ]" :role="isError ? 'alert' : 'status'" :aria-live="isError ? 'assertive' : 'polite'">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  variant?: 'default' | 'error'
}>()

const variant = computed(() => props.variant ?? 'default')
const isError = computed(() => variant.value === 'error')
</script>
