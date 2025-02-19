<template>
  <Card>
    <Form layout="vertical" class="flex flex-col h-full">
      <FormItem :label="t('colorMode')">
        <RadioGroupImage v-model:value="configStore.colorMode" :items="items" />
      </FormItem>

      <FormItem :label="t('themeColor')">
        <RadioGroupColor v-model:value="configStore.settings.primaryColor" :colorList="colorList" />
      </FormItem>

      <FormItem :label="t('language')">
        <RadioGroup v-model:value="configStore.language">
          <RadioButton :value="LanguagesEnum.FARSI">
            <div class="flex items-center gap-4">
              <Icon icon="twemoji:flag-iran" class="text-2xl" />
              <span>فارسی</span>
            </div>
          </RadioButton>
          <RadioButton :value="LanguagesEnum.ENGLISH">
            <div class="flex items-center gap-4">
              <Icon icon="twemoji:flag-united-kingdom" />
              <span>English</span>
            </div>
          </RadioButton>
        </RadioGroup>
      </FormItem>

      <FormItem :label="t('direction')">
        <RadioGroup v-model:value="configStore.direction">
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
        <RadioGroup v-model:value="configStore.size">
          <RadioButton :value="ComponentsSizesEnum.LARGE">{{ t('large') }}</RadioButton>
          <RadioButton :value="ComponentsSizesEnum.MIDDLE">{{ t('middle') }}</RadioButton>
          <RadioButton :value="ComponentsSizesEnum.SMALL">{{ t('small') }}</RadioButton>
        </RadioGroup>
      </FormItem>

      <FormItem label="websiteName" name="websiteName">
        <Input v-model:value="configStore.settings.websiteName" />
      </FormItem>

      <FormItem label="primaryColor" name="primaryColor">
        <Input v-model:value="configStore.settings.primaryColor" type="color" />
      </FormItem>

      <FormItem label="fontFamily" name="fontFamily">
        <Select v-model:value="configStore.settings.fontFamily">
          <SelectOption value="'Poppins', 'Vazirmatn'">Poppins</SelectOption>
          <SelectOption value="'Vazirmatn', 'Poppins'">Vazirmatn</SelectOption>
        </Select>
      </FormItem>
    

      <FormItem label="isCompact" name="isCompact">
        <Switch v-model:checked="configStore.settings.isCompact" />
      </FormItem>

      

      <FormItem label="isDark" name="isDark">
        <Switch v-model:checked="configStore.settings.isDark" />
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
import { useConfigStore } from '@/core/stores/config.store'
import {
  Button,
  Card,
  Form,
  FormItem,
  RadioButton,
  RadioGroup,
  Divider,
  Input,
  Select,
  SelectOption,
  Switch,
} from 'ant-design-vue/es'

import { DirectionsEnum, ComponentsSizesEnum, LanguagesEnum } from '@/core/enums'
import RadioGroupColor from '@/core/components/RadioGroupColor.vue'
import RadioGroupImage from '@/core/components/RadioGroupImage.vue'
import { useI18n } from 'vue-i18n'
import { Icon } from '@iconify/vue/dist/iconify.js'

const configStore = useConfigStore()
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

const items = reactive([
  {
    label: 'auto',
    src: 'https://gw.alipayobjects.com/zos/rmsportal/LCkqqYNmvBEbokSDscrm.svg',
    value: 'auto',
  },
  {
    label: 'light',
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
