<template>
  <Drawer :title="t('panelSetting')" :placement="placement" :closable="false">
    <Form layout="vertical" class="flex flex-col h-full">
      <FormItem :label="t('colorMode')">
        <RadioGroupImage v-model:value="panelSettingsStore.settings.isDark" :items="items" />
      </FormItem>

      <FormItem :label="t('themeColor')">
        <RadioGroupColor
          v-model:value="panelSettingsStore.settings.colorPrimary"
          :colorList="colorList"
        />
      </FormItem>

      <Divider />

      <FormItem :label="t('language')">
        <RadioGroup v-model:value="panelSettingsStore.settings.language">
          <RadioButton :value="LanguageEnum.FARSI">
            <div class="flex items-center gap-4">
              <Icon icon="twemoji:flag-iran" />
              <span>فارسی</span>
            </div>
          </RadioButton>
          <RadioButton :value="LanguageEnum.ENGLISH">
            <div class="flex items-center gap-4">
              <Icon icon="twemoji:flag-united-kingdom" />
              <span>English</span>
            </div>
          </RadioButton>
        </RadioGroup>
      </FormItem>

      <FormItem :label="t('direction')">
        <RadioGroup v-model:value="panelSettingsStore.settings.direction">
          <RadioButton :value="DirectionEnum.RTL">
            <div class="inline-flex items-center gap-2">
              <Icon icon="ooui:outdent-rtl" />
              <span>{{ t('right') }}</span>
            </div>
          </RadioButton>
          <RadioButton :value="DirectionEnum.LTR">
            <div class="inline-flex items-center gap-2">
              <Icon icon="ooui:outdent-ltr" />
              <span>{{ t('left') }}</span>
            </div>
          </RadioButton>
        </RadioGroup>
      </FormItem>

      <FormItem :label="t('fontFamily')" name="fontFamily">
        <Select v-model:value="panelSettingsStore.settings.fontFamily">
          <SelectOption :value="FontFamilyEnum.ENGLISH">Poppins</SelectOption>
          <SelectOption :value="FontFamilyEnum.FARSI">Vazirmatn</SelectOption>
        </Select>
      </FormItem>

      <Divider />

      <FormItem :label="t('componentsSize')">
        <RadioGroup v-model:value="panelSettingsStore.settings.componentSize">
          <RadioButton :value="ComponentSizeEnum.LARGE">{{ t('large') }}</RadioButton>
          <RadioButton :value="ComponentSizeEnum.MIDDLE">{{ t('middle') }}</RadioButton>
          <RadioButton :value="ComponentSizeEnum.SMALL">{{ t('small') }}</RadioButton>
        </RadioGroup>
      </FormItem>

      <FormItem :label="t('compactMode')" name="isCompact">
        <Switch v-model:checked="panelSettingsStore.settings.isCompact" />
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
import { DirectionEnum, ComponentSizeEnum, LanguageEnum, FontFamilyEnum } from '@/core/enums'
import RadioGroupColor from '@/core/components/RadioGroupColor.vue'
import RadioGroupImage from '@/core/components/RadioGroupImage.vue'
import { useI18n } from 'vue-i18n'
import darkModePicture from "@/core/assets/images/dark-mode.svg";
import lightModePicture from "@/core/assets/images/light-mode.svg";
const panelSettingsStore = usePanelSettingsStore()
const { t } = useI18n()

const placement = computed(() => {
  return panelSettingsStore.settings.direction === DirectionEnum.LTR ? 'right' : 'left'
})
const emits = defineEmits(['save'])
const colorList = reactive([
  {
    label: 'blue',
    value: '#2893ff',
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
    src: lightModePicture,
    value: false,
  },
  {
    label: 'dark',
    src: darkModePicture,
    value: true,
  },
])
</script>
<style lang="less">
.ant-drawer-header {
  @apply bg-primary;
}
</style>
