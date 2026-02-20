import type { MaybeRefOrGetter } from 'vue'
import { computed, toValue } from 'vue'

export function useAlertMessageScript(variant?: MaybeRefOrGetter<'default' | 'error' | undefined>) {
  const variantComputed = computed(() => toValue(variant) ?? 'default')
  const isError = computed(() => variantComputed.value === 'error')

  const role = computed(() => (isError.value ? 'alert' : 'status'))
  const ariaLive = computed(() => (isError.value ? 'assertive' : 'polite'))

  return {
    isError,
    role,
    ariaLive,
  }
}
