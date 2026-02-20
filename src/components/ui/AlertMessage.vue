<template>
  <div
    :class="[
      'rounded-md border px-4 py-3 text-sm',
      variant === 'error'
        ? 'border-red-500/40 bg-red-950/40 text-red-100'
        : 'border-slate-700 bg-slate-900/80 text-slate-100',
    ]"
    role="alert"
    aria-live="assertive"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  variant?: 'default' | 'error'
}>()

const variant = computed(() => props.variant ?? 'default')
</script>
