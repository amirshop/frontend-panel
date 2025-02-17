import { ref } from 'vue'
import { isFunction } from 'lodash'

type Callback = () => void

export const useModal = () => {
  const isOpen = ref<boolean>(false)

  const invokeCallbacks = async (...callbacks: (Callback | Promise<void>)[]) => {
    for (const callback of callbacks) {
      if (isFunction(callback)) {
        callback()
      } else if (callback instanceof Promise) {
        await callback
      }
    }
  }

  const open = (...callbacks: Callback[]) => {
    invokeCallbacks(...callbacks)
    isOpen.value = true
  }

  const close = () => {
    isOpen.value = false
  }

  const toggle = () => {
    isOpen.value = !isOpen.value
  }

  const invokeToggle = async (...callbacks: (Callback | Promise<void>)[]) => {
    await invokeCallbacks(...callbacks)
    isOpen.value = !isOpen.value
  }

  const toggleInvoke = async (...callbacks: (Callback | Promise<void>)[]) => {
    isOpen.value = !isOpen.value
    await invokeCallbacks(...callbacks)
  }

  return {
    isOpen,
    open,
    close,
    toggle,
    invokeToggle,
    toggleInvoke,
  }
}
