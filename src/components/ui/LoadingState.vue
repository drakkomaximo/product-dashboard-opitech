<template>
  <div class="grid place-items-center py-16 text-slate-400" role="status" aria-live="polite">
    <span>{{ label }}</span>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from 'vue'

const props = defineProps<{
  label: string
}>()

const { label } = toRefs(props)
</script>
