<template>
  <NewTable @addRecord="formModel.toggle">
    {{ formRef }}
    <template #addForm>
      <Modal
        title="asd"
        v-model:open="formModel.isOpen.value"
        @cancel="resetForm"
        @ok="formModel.invokeToggle(onSubmit)"
        :ok-button-props="{
          loading,
        }"
      >
        <Form
          ref="formRef"
          layout="vertical"
          :model="formState"
          :state="formState"
          name="basic"
          autocomplete="off"
        >
          <FormItem
            label="username"
            name="username"
            :rules="[
              { required: true, message: 'Please input Activity name', trigger: 'change' },
              { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
            ]"
          >
            <Input v-model:value="formState.username" />
          </FormItem>
          <FormItem label="password" name="password">
            <Input v-model:value="formState.password" />
          </FormItem>
        </Form>
      </Modal>
    </template>
  </NewTable>
</template>
<script setup lang="ts">
import { Modal, Form, FormItem, Input } from 'ant-design-vue/es'
import { NewTable } from '@/core/components'
import { useModal } from '@/core/composable'
import { useForm } from '@/core/composable/form.composable'

const formModel = useModal()

interface FormState {
  username: string
  password: string
  remember: boolean
}
const { formRef, formState, loading, onSubmit, resetForm } = useForm<FormState>()

const onOk = async () => {
  try {
    await onSubmit()
    formModel.close()
  } catch (error) {
    console.log('🚀 ~ onOk ~ error:', error)
  }
}
</script>
