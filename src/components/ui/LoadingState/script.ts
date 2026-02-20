import { toRefs } from 'vue'

export interface LoadingStateProps {
  label: string
}

export function useLoadingStateScript(props: LoadingStateProps) {
  const { label } = toRefs(props)
  return { label }
}
