<script setup lang="ts">
import { Modal } from 'ant-design-vue'
import { reactive, ref } from 'vue'
import { Input } from 'ant-design-vue/es'
import VuePictureCropper, { cropper } from 'vue-picture-cropper'

const visible = ref(false)
const isShowModal = ref<boolean>(false)
const uploadInput = ref<HTMLInputElement | null>(null)
const pic = ref<string>('')
const result = reactive({
  dataURL: '',
  blobURL: '',
})

const handleFileChange = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      pic.value = e.target?.result as string
      isShowModal.value = true // Show the modal
    }
    reader.readAsDataURL(file)
  }
}

const ready = (e: any) => {
  console.log('🚀 ~ ready ~ e:', e)
}

async function getResult() {
  if (!cropper) return
  const base64 = cropper.getDataURL()
  const blob: Blob | null = await cropper.getBlob()
  if (!blob) return

  const file = await cropper.getFile({
    fileName: pic.value,
  })

  console.log({ base64, blob, file })
  result.dataURL = base64
  result.blobURL = URL.createObjectURL(blob)
  isShowModal.value = false
}
</script>

<template>
  <Input type="file" accept="image/*" @change="handleFileChange" />
  <Modal
    v-model:visible="isShowModal"
    title="Crop Image"
    :ok-button-props="{
      onClick: getResult,
    }"
  >
    <VuePictureCropper
      :boxStyle="{
        width: '100%',
        height: '100%',
        backgroundColor: '#f8f8f8',
        margin: 'auto',
      }"
      :img="pic"
      :options="{
        viewMode: 1,
        dragMode: 'crop',
        aspectRatio: 16 / 9,
      }"
      @ready="ready"
    />
  </Modal>
</template>
