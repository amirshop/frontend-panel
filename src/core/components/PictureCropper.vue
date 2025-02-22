<script setup lang="ts">
import { Modal, Image, Form, FormItem, Input } from 'ant-design-vue/es'
import { ref, watch, type Ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css'
import AzButton from './AzButton.vue'

const isShowModal = ref<boolean>(false)
const pic = ref<string>('')
const cropperRef = ref()
const { t } = useI18n()

const width = ref<number>(300)
const height = ref<number>(300)
const aspectX = ref<number>(1)
const aspectY = ref<number>(1)

const handleFileChange = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      pic.value = e.target?.result as string
      isShowModal.value = true
    }
    reader.readAsDataURL(file)
  }
}

const cropImage = () => {
  if (cropperRef.value) {
    const { canvas } = cropperRef.value?.getResult()
    if (canvas) {
      pic.value = canvas.toDataURL('image/png')
      isShowModal.value = false
    }
  }
}

watch([width, height, aspectX, aspectY], () => {
  if (cropperRef.value) {
    cropperRef.value?.refresh()
  }
})
const remove = () => {
  cropperRef.value = null
  pic.value = ''
}
</script>

<template>
  <div class="relative w-40 h-40 image-input-container border-2 border-dashed border-primary">
    <div class="" @click="$refs.fileInput.click()">
      <input type="file" accept="image/*" ref="fileInput" @change="handleFileChange" hidden />
      <Image v-if="pic" :src="pic" class="image-preview" />
      <div v-else class="image-placeholder">{{ t('selectImage') }}</div>
    </div>
    <AzButton
      type="primary"
      danger
      shape="circle"
      size="small"
      icon="tabler:x"
      class="absolute top-2 end-2"
      @click="remove"
    />
  </div>
  <Modal
    v-model:visible="isShowModal"
    :title="t('imageCropper')"
    :ok-text="t('crop')"
    :ok-button-props="{
      onClick: cropImage,
    }"
    :cancel-button-props="{
      onClick: () => (isShowModal = false),
    }"
  >
    <div class="cropper-container">
      <Cropper ref="cropperRef" :src="pic" :stencil-props="{ aspectRatio: aspectX / aspectY }" />
    </div>

    <Form layout="vertical" class="grid grid-cols-2 gap-x-4">
      <FormItem label="Width">
        <Input v-model:value="width" type="number" />
      </FormItem>
      <FormItem label="Height">
        <Input v-model:value="height" type="number" />
      </FormItem>
      <FormItem label="Aspect X">
        <Input v-model:value="aspectX" type="number" />
      </FormItem>
      <FormItem label="Aspect Y">
        <Input v-model:value="aspectY" type="number" />
      </FormItem>
    </Form>

    <!-- <template #footer>
      <AzButton @click="cropImage">{{ t('crop') }}</AzButton>
      <AzButton @click="isShowModal = false">{{ t('cancel') }}</AzButton>
    </template> -->
  </Modal>
</template>

<style scoped>
.image-input-container {
  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
  text-align: center;
}
.image-preview {
  max-width: 100%;
  height: auto;
}
.image-placeholder {
  color: #aaa;
}
.cropper-container {
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
