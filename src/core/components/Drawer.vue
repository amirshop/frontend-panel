<template>
  <Drawer title="Panel setting" :placement="placement">
    <Form layout="vertical" class="flex flex-col h-full">
      <FormItem label="Overall style settings">
        <RadioGroupImage v-model:value="checkedRadio" :items="items" />
      </FormItem>

      <FormItem label="Theme color">
        <RadioGroupColor
          v-model:value="configProviderStore.primaryColor"
          :colorList="colorList"
        />
      </FormItem>

      <Divider />
      <FormItem label="Language">
        <Select v-model:value="configProviderStore.language">
          <SelectOption :value="LanguagesEnum.FARSI">FARSI</SelectOption>
          <SelectOption :value="LanguagesEnum.ENGLISH">English</SelectOption>
        </Select>
      </FormItem>

      <FormItem label="Direction">
        <RadioGroup v-model:value="configProviderStore.direction">
          <RadioButton :value="DirectionsEnum.LTR">ltr</RadioButton>
          <RadioButton :value="DirectionsEnum.RTL">rtl</RadioButton>
        </RadioGroup>
      </FormItem>

      <FormItem label="Components size">
        <RadioGroup v-model:value="configProviderStore.size">
          <RadioButton :value="ComponentsSizesEnum.Large">Large</RadioButton>
          <RadioButton :value="ComponentsSizesEnum.Middle">Middle</RadioButton>
          <RadioButton :value="ComponentsSizesEnum.Small">Small</RadioButton>
        </RadioGroup>
      </FormItem>

      <Divider class="flex-1" />

      <Divider />
      <div class="flex gap-x-4">
        <Button type="primary" @click="emits('ok', false)"> Save </Button>
        <Button type="ghost" @click="emits('close', false)"> Reset </Button>
      </div>
    </Form>
  </Drawer>
</template>
<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import { useConfigProviderStore } from '@/core/stores/configProvider.store'
import {
  Button,
  Select,
  SelectOption,
  Drawer,
  Form,
  FormItem,
  RadioButton,
  RadioGroup,
  Divider,
} from 'ant-design-vue/es'

import { DirectionsEnum, ComponentsSizesEnum, LanguagesEnum } from '@/core/enums'
import RadioGroupColor from '@/core/components/RadioGroupColor.vue'
import RadioGroupImage from '@/core/components/RadioGroupImage.vue'
const configProviderStore = useConfigProviderStore()

const placement = computed(() => {
  return configProviderStore.direction === DirectionsEnum.LTR ? 'right' : 'left'
})
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
    label: 'Dark',
    src: 'https://gw.alipayobjects.com/zos/rmsportal/LCkqqYNmvBEbokSDscrm.svg',
    value: 'dark',
  },
  {
    label: 'Light',
    src: 'https://gw.alipayobjects.com/zos/rmsportal/jpRkZQMyYRryryPNtyIC.svg',
    value: 'light',
  },
  {
    label: 'Night',
    src: 'https://gw.alipayobjects.com/zos/antfincdn/hmKaLQvmY2/LCkqqYNmvBEbokSDscrm.svg',
    value: 'night',
  },
])
</script>
