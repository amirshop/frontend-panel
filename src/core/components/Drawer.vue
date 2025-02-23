<template>
  <Drawer title="Panel setting" :placement="placement" :closable="false">
    <Form layout="vertical" class="flex flex-col h-full">
      <FormItem :label="t('colorMode')">
        <RadioGroupImage v-model:value="panelSettingsStore.settingList.isDark" :items="items" />
      </FormItem>

      <FormItem :label="t('themeColor')">
        <RadioGroupColor
          v-model:value="panelSettingsStore.settingList.primaryColor"
          :colorList="colorList"
        />
      </FormItem>

      <Divider />

      <FormItem :label="t('language')">
        <RadioGroup v-model:value="panelSettingsStore.settingList.language">
          <RadioButton :value="LanguagesEnum.FARSI">
            <div class="flex items-center gap-4">
              <Icon icon="twemoji:flag-iran" />
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
        <RadioGroup v-model:value="panelSettingsStore.settingList.direction">
          <RadioButton :value="DirectionsEnum.RTL">
            <div class="inline-flex items-center gap-2">
              <Icon icon="ooui:outdent-rtl" />
              <span>{{ t('right') }}</span>
            </div>
          </RadioButton>
          <RadioButton :value="DirectionsEnum.LTR">
            <div class="inline-flex items-center gap-2">
              <Icon icon="ooui:outdent-ltr" />
              <span>{{ t('left') }}</span>
            </div>
          </RadioButton>
        </RadioGroup>
      </FormItem>

      <FormItem :label="t('fontFamily')" name="fontFamily">
        <Select v-model:value="panelSettingsStore.settingList.fontFamily">
          <SelectOption value="'Poppins', 'Vazirmatn'">Poppins</SelectOption>
          <SelectOption value="'Vazirmatn', 'Poppins'">Vazirmatn</SelectOption>
        </Select>
      </FormItem>

      <Divider />

      <FormItem :label="t('componentsSize')">
        <RadioGroup v-model:value="panelSettingsStore.settingList.componentsSize">
          <RadioButton :value="ComponentsSizesEnum.LARGE">{{ t('large') }}</RadioButton>
          <RadioButton :value="ComponentsSizesEnum.MIDDLE">{{ t('middle') }}</RadioButton>
          <RadioButton :value="ComponentsSizesEnum.SMALL">{{ t('small') }}</RadioButton>
        </RadioGroup>
      </FormItem>

      <FormItem :label="t('compactMode')" name="isCompact">
        <Switch v-model:checked="panelSettingsStore.settingList.isCompact" />
      </FormItem>

      <Divider />
      <div class="flex gap-x-4">
        <Button type="primary" @click="emits('save', false)"> {{ t('save') }} </Button>
      </div>
    </Form>
  </Drawer>
</template>
<script setup lang="ts">
import { computed, reactive, watch } from 'vue'
import { usePanelSettingsStore } from '@/core/stores/panelSettings.store'
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
  Switch,
} from 'ant-design-vue/es'
import { Icon } from '@iconify/vue/dist/iconify.js'
import { DirectionsEnum, ComponentsSizesEnum, LanguagesEnum } from '@/core/enums'
import RadioGroupColor from '@/core/components/RadioGroupColor.vue'
import RadioGroupImage from '@/core/components/RadioGroupImage.vue'
import { useI18n } from 'vue-i18n'
const panelSettingsStore = usePanelSettingsStore()
const { t } = useI18n()

const placement = computed(() => {
  return panelSettingsStore.settingList.direction === DirectionsEnum.LTR ? 'right' : 'left'
})
const emits = defineEmits(['save'])
const colorList = reactive([
  {
    label: 'blue',
    value: '#2b7fff',
    class: 'bg-blue',
  },
  {
    label: 'teal',
    value: '#2dd4bf',
    class: 'bg-teal',
  },
  {
    label: 'cyan',
    value: '#00b8dbff',
    class: 'bg-cyan',
  },
  {
    label: 'sky',
    value: '#00a6f4ff',
    class: 'bg-cyan',
  },
  {
    label: 'indigo',
    value: '#818cf8',
    class: 'bg-indigo',
  },
  {
    label: 'violet',
    value: '#a78bfa',
    class: 'bg-violet',
  },
  {
    label: 'fuchsia',
    value: '#e879f9',
    class: 'bg-fuchsia',
  },
  {
    label: 'Rose',
    value: '#fb7185',
    class: 'bg-rose',
  },
  {
    label: 'Slate',
    value: '#94a3b8',
    class: 'bg-slate',
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
