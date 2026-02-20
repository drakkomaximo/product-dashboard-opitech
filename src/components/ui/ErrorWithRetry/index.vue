<template>
  <AlertMessage :variant="variant">
    <div class="flex flex-wrap items-center justify-between gap-3">
      <span>{{ message }}</span>
      <button
        type="button"
        class="inline-flex items-center gap-1 rounded-md border border-slate-700 bg-slate-900 px-3 py-1 text-xs font-medium text-slate-100 hover:border-sky-500 hover:text-sky-300 hover:bg-slate-900/80 transition-colors"
        @click="$emit('retry')"
      >
        <span>Retry</span>
      </button>
    </div>
  </AlertMessage>
</template>

<script setup lang="ts">
import AlertMessage from '@/components/ui/AlertMessage/index.vue'

const props = defineProps<{
  message: string
  variant?: 'default' | 'error'
}>()

withDefaults(props, {
  variant: 'error',
})

defineEmits<{
  (e: 'retry'): void
}>()

defineOptions({
  name: 'ErrorWithRetry',
})
</script>
