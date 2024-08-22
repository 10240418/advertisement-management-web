import { ref } from 'vue'
// eslint-disable-next-line @typescript-eslint/ban-types
export const useThrottle = (fn: Function, delay: number) => {
  const canRun = ref(true)
  return (...args: any[]) => {
    if (!canRun.value) return
    canRun.value = false
    setTimeout(() => {
      fn(...args)
      canRun.value = true
    }, delay)
  }
}

// eslint-disable-next-line @typescript-eslint/ban-types
export const useDebounce = (fn: Function, delay: number) => {
  let timer: ReturnType<typeof setTimeout> | null = null
  return (...args: any[]) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}
