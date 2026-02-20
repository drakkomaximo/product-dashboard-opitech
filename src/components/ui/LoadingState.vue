<template>
  <div class="grid place-items-center py-16 text-slate-400" role="status" aria-live="polite">
    <span>{{ label }}</span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  label: string
}>()

const label = props.label
</script>
