<template>
  <nav class="flex items-center justify-between border-t border-slate-800 pt-4 text-sm text-slate-300"
    aria-label="Products pagination">
    <div aria-live="polite">
      Page {{ page }} of {{ totalPages }}
    </div>
    <div class="flex gap-2">
      <button type="button"
        class="rounded-md border border-slate-700 px-3 py-1 disabled:cursor-not-allowed disabled:opacity-50"
        :disabled="page <= 1 || disabled" :aria-disabled="page <= 1 || disabled" @click="$emit('previous')"
        aria-label="Go to previous page">
        Previous
      </button>
      <button type="button"
        class="rounded-md border border-slate-700 px-3 py-1 disabled:cursor-not-allowed disabled:opacity-50"
        :disabled="page >= totalPages || disabled" :aria-disabled="page >= totalPages || disabled"
        @click="$emit('next')" aria-label="Go to next page">
        Next
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
const props = defineProps<{
  page: number
  totalPages: number
  disabled?: boolean
}>()

const page = props.page
const totalPages = props.totalPages
const disabled = props.disabled ?? false
</script>
