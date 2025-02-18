import { ref } from 'vue'

export const useForm = <I>() => {
  const loading = ref<boolean>(false)
  const formRef = ref()
  const formState = ref<I>({} as I)
  const onSubmit = async (): Promise<void> => {
    if (!formRef.value) return
    loading.value = true
    try {
      await formRef.value.validate()
    } catch (error) {
      console.log('error', error)
      throw error
    } finally {
      loading.value = false
    }
  }
  const resetForm = (): void => {
    formState.value = {} as I
    formRef.value.resetFields()
  }

  return { formRef, loading, formState, onSubmit, resetForm }
}
