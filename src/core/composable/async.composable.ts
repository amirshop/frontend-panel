import type { Ref, WatchSource } from 'vue'
import { ref, onMounted } from 'vue'

// انواع مختلف برای AsyncData
type AsyncDataOptions<DataT> = {
  server?: boolean
  lazy?: boolean
  immediate?: boolean
  deep?: boolean
  dedupe?: 'cancel' | 'defer'
  default?: () => DataT | Ref<DataT> | null
  transform?: (input: DataT) => DataT | Promise<DataT>
  pick?: string[]
  watch?: WatchSource[]
  getCachedData?: (key: string) => DataT
}

type AsyncData<DataT, ErrorT> = {
  data: Ref<DataT | null>
  refresh: (opts?: AsyncDataExecuteOptions) => Promise<void>
  execute: (opts?: AsyncDataExecuteOptions) => Promise<void>
  clear: () => void
  error: Ref<ErrorT | null>
  status: Ref<AsyncDataRequestStatus>
}

interface AsyncDataExecuteOptions {
  dedupe?: 'cancel' | 'defer'
}

type AsyncDataRequestStatus = 'idle' | 'pending' | 'success' | 'error'

export function useAsyncData<DataT, DataE>(
  handler: () => Promise<DataT>,
  options?: AsyncDataOptions<DataT>,
): AsyncData<DataT, DataE>

export function useAsyncData<DataT, DataE>(
  key: string,
  handler: () => Promise<DataT>,
  options?: AsyncDataOptions<DataT>,
): Promise<AsyncData<DataT, DataE>>

export function useAsyncData<DataT, DataE>(
  keyOrHandler: string | (() => Promise<DataT>),
  handlerOrOptions?: (() => Promise<DataT>) | AsyncDataOptions<DataT>,
  options?: AsyncDataOptions<DataT>,
): AsyncData<DataT, DataE> | Promise<AsyncData<DataT, DataE>> {
  const data = ref<DataT | null>(null)
  const error = ref<DataE | null>(null)
  const status = ref<AsyncDataRequestStatus>('idle')

  const execute = async (opts?: AsyncDataExecuteOptions) => {
    status.value = 'pending'
    try {
      const response = await (
        typeof keyOrHandler === 'string' ? (handlerOrOptions as () => Promise<DataT>) : keyOrHandler
      )()
      if (options?.transform) {
        data.value = await options.transform(response)
      } else {
        data.value = response
      }
      status.value = 'success'
    } catch (err) {
      error.value = err as DataE
      status.value = 'error'
    }
  }

  const refresh = async (opts?: AsyncDataExecuteOptions) => {
    if (options?.dedupe === 'cancel' || options?.dedupe === 'defer') {
      // Handle dedupe logic if needed
    }
    await execute(opts)
  }

  const clear = () => {
    data.value = null
    error.value = null
    status.value = 'idle'
  }

  if (options?.immediate !== false) {
    onMounted(() => {
      execute()
    })
  }

  return {
    data,
    error,
    status,
    execute,
    refresh,
    clear,
  }
}
