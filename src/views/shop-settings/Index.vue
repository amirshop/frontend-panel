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
        <Input v-model:value="shopSettingsStore.settingList.shopFavicon" />
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
import { usePanelSettingsStore } from '@/core/stores/panelConfig.store'
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
  Radio,
  Tooltip,
} from 'ant-design-vue/es'

import { DirectionsEnum, ComponentsSizesEnum, LanguagesEnum } from '@/core/enums'
import RadioGroupColor from '@/core/components/RadioGroupColor.vue'
import RadioGroupImage from '@/core/components/RadioGroupImage.vue'
import { useI18n } from 'vue-i18n'
import { Icon } from '@iconify/vue/dist/iconify.js'
import { useShopSettingsStore } from '@/stores/shopSettings.store'

const shopSettingsStore = useShopSettingsStore()
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
    label: 'light',
    src: 'https://gw.alipayobjects.com/zos/rmsportal/jpRkZQMyYRryryPNtyIC.svg',
    value: false,
  },
  {
    label: 'dark',
    src: 'https://gw.alipayobjects.com/zos/antfincdn/hmKaLQvmY2/LCkqqYNmvBEbokSDscrm.svg',
    value: true,
  },
])
</script>
