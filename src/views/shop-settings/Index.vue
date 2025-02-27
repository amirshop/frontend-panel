<template>
  <Card>
    <Form layout="vertical" class="flex flex-col h-full">
      <FormItem :label="t('title')" name="name">
        <Input v-model:value="shopSettingsStore.settingList.name" />
      </FormItem>
      <FormItem :label="t('tagline')" name="description">
        <Input v-model:value="shopSettingsStore.settingList.description" />
      </FormItem>

      <FormItem :label="t('logo')" name="logo">
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

      <FormItem :label="t('favicon')" name="favicon">
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
import { useI18n } from 'vue-i18n'
import { useShopSettingsStore } from '@/stores/shopSettings.store'
import PictureCropper from '@/core/components/PictureCropper.vue'
const shopSettingsStore = useShopSettingsStore()
const { t } = useI18n()

const handleCrop = (result: string) => {
  console.log('Cropped result:', result)
  // آپلود blob به سرور یا ذخیره محلی
}

const saveSettings = () => {
  console.log('Image removed')
}

const handleRemove = () => {
  console.log('Image removed')
}

const handleError = (error: string) => {
  console.error('Error occurred:', error)
}
</script>
