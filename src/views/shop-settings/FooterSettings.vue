<template>
  <Card>
    <Form layout="vertical" class="flex flex-col h-full">
      <FormItem :label="t('shopName')" name="shopName">
        <Input v-model:value="shopSettingsStore.settingList.name" />
      </FormItem>
      <FormItem :label="t('shopDescription')" name="shopDescription">
        <Input v-model:value="shopSettingsStore.settingList.description" />
      </FormItem>
      <FormItem :label="t('shopSlug')" name="shopSlug">
        <Input v-model:value="shopSettingsStore.settingList.slug" />
      </FormItem>

      <FormItem :label="t('shopLogo')" name="shopLogo">
        <PictureCropper
        v-model="shopSettingsStore.settingList.logo"
          :aspect-ratio="1 / 1"
          :image-preview-width="300"
          modal-title="Custom Crop Title"
          @crop="handleCrop"
          @remove="handleRemove"
          @error="handleError"
          :crop-options="{
            viewMode: 2,
            dragMode: 'move',
          }"
        />
      </FormItem>

      <FormItem :label="t('shopFavicon')" name="shopFavicon">
        <PictureCropper
        v-model="shopSettingsStore.settingList.favicon"
          :aspect-ratio="1 / 1"
          :image-preview-width="300"
          modal-title="Custom Crop Title"
          @crop="handleCrop"
          @remove="handleRemove"
          @error="handleError"
          :crop-options="{
            viewMode: 2,
            dragMode: 'move',
          }"
        />
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

const handleCrop = (result: any) => {
  console.log('Cropped result:', result)
  // آپلود blob به سرور یا ذخیره محلی
}

const handleRemove = () => {
  console.log('Image removed')
}

const handleError = (error) => {
  console.error('Error occurred:', error)
}
</script>
