<template>
  <nav class="flex items-center justify-between border-t border-slate-800 pt-4 text-sm text-slate-300"
    aria-label="Products pagination">
    <div aria-live="polite">
      Page {{ page }} of {{ totalPages }}
    </div>
    <div class="flex gap-2">
      <button type="button"
        class="rounded-md border border-slate-700 px-3 py-1 disabled:cursor-not-allowed disabled:opacity-50"
        :disabled="page <= 1 || isDisabled" :aria-disabled="page <= 1 || isDisabled" @click="$emit('previous')"
        aria-label="Go to previous page">
        Previous
      </button>
      <button type="button"
        class="rounded-md border border-slate-700 px-3 py-1 disabled:cursor-not-allowed disabled:opacity-50"
        :disabled="page >= totalPages || isDisabled" :aria-disabled="page >= totalPages || isDisabled"
        @click="$emit('next')" aria-label="Go to next page">
        Next
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed, toRefs } from 'vue'

const props = defineProps<{
  page: number
  totalPages: number
  disabled?: boolean
}>()

const { page, totalPages, disabled: disabledProp } = toRefs(props)
const isDisabled = computed(() => disabledProp?.value ?? false)
</script>
