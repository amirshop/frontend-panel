<template>
  <Card>
    <Form layout="vertical" class="flex flex-col h-full">
      <FormItem :label="t('colorMode')">
        <RadioGroupImage v-model:value="configProviderStore.colorMode" :items="items" />
      </FormItem>

      <FormItem :label="t('themeColor')">
        <RadioGroupColor
          v-model:value="configProviderStore.token.colorPrimary"
          :colorList="colorList"
        />
      </FormItem>

      <FormItem :label="t('language')">
        <RadioGroup v-model:value="configProviderStore.language">
          <RadioButton :value="LanguagesEnum.FARSI">
            <div class="flex items-center gap-4">
              <Icon icon="twemoji:flag-iran" :height="28" />
              <span>فارسی</span>
            </div>
          </RadioButton>
          <RadioButton :value="LanguagesEnum.ENGLISH">
            <div class="flex items-center gap-4">
              <Icon icon="twemoji:flag-united-kingdom" :height="28" />
              <span>English</span>
            </div>
          </RadioButton>
        </RadioGroup>
      </FormItem>

      <FormItem :label="t('direction')">
        <RadioGroup v-model:value="configProviderStore.direction">
          <RadioButton :value="DirectionsEnum.LTR">
            <div class="inline-flex items-center gap-2">
              <Icon icon="ooui:outdent-ltr" />
              <span>{{ t('left') }}</span>
            </div>
          </RadioButton>
          <RadioButton :value="DirectionsEnum.RTL">
            <div class="inline-flex items-center gap-2">
              <Icon icon="ooui:outdent-rtl" />
              <span>{{ t('right') }}</span>
            </div>
          </RadioButton>
        </RadioGroup>
      </FormItem>

      <FormItem :label="t('componentsSize')">
        <RadioGroup v-model:value="configProviderStore.size">
          <RadioButton :value="ComponentsSizesEnum.LARGE">{{ t('large') }}</RadioButton>
          <RadioButton :value="ComponentsSizesEnum.MIDDLE">{{ t('middle') }}</RadioButton>
          <RadioButton :value="ComponentsSizesEnum.SMALL">{{ t('small') }}</RadioButton>
        </RadioGroup>
      </FormItem>

      <Divider />
      <div class="flex gap-x-4">
        <Button type="primary" @click="emits('ok', false)"> {{ t('save') }} </Button>
        <Button type="ghost" @click="emits('close', false)"> {{ t('cancel') }} </Button>
      </div>
    </Form>
  </Card>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useConfigProviderStore } from '@/core/stores/configProvider.store'
import { Button, Card, Form, FormItem, RadioButton, RadioGroup, Divider } from 'ant-design-vue/es'

import { DirectionsEnum, ComponentsSizesEnum, LanguagesEnum } from '@/core/enums'
import RadioGroupColor from '@/core/components/RadioGroupColor.vue'
import RadioGroupImage from '@/core/components/RadioGroupImage.vue'
import { useI18n } from 'vue-i18n'
import { Icon } from '@iconify/vue/dist/iconify.js'
const configProviderStore = useConfigProviderStore()
const { t } = useI18n()
const emits = defineEmits(['close', 'ok'])
const colorList = reactive([
  {
    label: 'Blue',
    value: 'blue',
  },

  {
    label: 'Green',
    value: 'green',
  },

  {
    label: 'Purple',
    value: 'purple',
  },

  {
    label: 'sky',
    value: 'sky',
  },

  {
    label: 'slate',
    value: 'slate',
  },

  {
    label: 'primary',
    value: 'primary',
  },
])

const checkedRadio = ref()
const items = reactive([
  {
    label: 'auto',
    src: 'https://gw.alipayobjects.com/zos/rmsportal/LCkqqYNmvBEbokSDscrm.svg',
    value: 'auto',
  },
  {
    label:'light',
    src: 'https://gw.alipayobjects.com/zos/rmsportal/jpRkZQMyYRryryPNtyIC.svg',
    value: 'light',
  },
  {
    label: 'dark',
    src: 'https://gw.alipayobjects.com/zos/antfincdn/hmKaLQvmY2/LCkqqYNmvBEbokSDscrm.svg',
    value: 'dark',
  },
])
</script>
