<template>
  <Card>
    <Form layout="vertical" class="flex flex-col h-full">
      <FormItem :label="t('shopName')" name="shopName">
        <Input v-model:value="shopSettingsStore.settingList.shopName" />
      </FormItem>

      <FormItem :label="t('shopLogo')" name="shopLogo">
        <Input v-model:value="shopSettingsStore.settingList.shopLogo" />
      </FormItem>

      <FormItem :label="t('shopFavicon')" name="shopFavicon">
        <PictureCropper />
      </FormItem>

      <Divider />
      <div class="flex gap-x-4">
        <Button type="primary" @click="saveSettings"> {{ t('save') }} </Button>
        <Button type="ghost"> {{ t('cancel') }} </Button>
      </div>
    </Form>
  </Card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Button, Card, Form, FormItem, Divider, Input } from 'ant-design-vue/es'
import VuePictureCropper, { cropper } from 'vue-picture-cropper'
import { useI18n } from 'vue-i18n'
import { useShopSettingsStore } from '@/stores/shopSettings.store'
import PictureCropper from '@/core/components/PictureCropper.vue'
const shopSettingsStore = useShopSettingsStore()
const { t } = useI18n()

const handleFileChange = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      if (e.target?.result) {
        shopSettingsStore.settingList.shopFavicon = e.target.result as string
      }
    }
    reader.readAsDataURL(file)
  }
}

const handleCropperReady = () => {
  console.log('Cropper is ready')
}
const localFavicon = ref<string | null>(null)

const handleCroppedImage = async () => {
  const croppedBlob = await cropper?.getBlob()
  if (croppedBlob) {
    const reader = new FileReader()
    reader.onload = (e) => {
      if (e.target?.result) {
        localFavicon.value = e.target.result as string
      }
    }
    reader.readAsDataURL(croppedBlob)
  }
}

const saveSettings = () => {
  if (localFavicon.value) {
    shopSettingsStore.settingList.shopFavicon = localFavicon.value
  }
  console.log('Saving settings:', shopSettingsStore.settingList)
  // Call an API to save the settings
}
</script>
