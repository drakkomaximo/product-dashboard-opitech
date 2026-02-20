<template>
  <div :class="[
    'rounded-md border px-4 py-3 text-sm',
    isError
      ? 'border-red-500/40 bg-red-950/40 text-red-100'
      : 'border-slate-700 bg-slate-900/80 text-slate-100',
  ]" :role="role" :aria-live="ariaLive">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { useAlertMessageScript } from './script'

const props = defineProps<{
  variant?: 'default' | 'error'
}>()

const { isError, role, ariaLive } = useAlertMessageScript(() => props.variant)

defineOptions({
  name: 'AlertMessage',
})
</script>
