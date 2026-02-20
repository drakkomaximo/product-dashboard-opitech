import { computed } from 'vue'

export function useAlertMessageScript(variant?: 'default' | 'error') {
  const variantComputed = computed(() => variant ?? 'default')
  const isError = computed(() => variantComputed.value === 'error')

  const role = computed(() => (isError.value ? 'alert' : 'status'))
  const ariaLive = computed(() => (isError.value ? 'assertive' : 'polite'))

  return {
    isError,
    role,
    ariaLive,
  }
}
