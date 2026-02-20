import { computed, toRefs } from 'vue'

export interface PaginationControlsProps {
  page: number
  totalPages: number
  disabled?: boolean
}

export function usePaginationControlsScript(props: PaginationControlsProps) {
  const { page, totalPages, disabled: disabledProp } = toRefs(props)
  const isDisabled = computed(() => disabledProp?.value ?? false)

  return {
    page,
    totalPages,
    isDisabled,
  }
}
