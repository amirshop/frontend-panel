<template>
  <ConfigProvider
    :componentSize="panelSettingStore.settings.componentSize"
    :direction="panelSettingStore.settings.direction"
    :locale="panelSettingStore.locale"
    :theme="panelSettingStore.theme"
    :ref="panelSettingsStore.fullscreen.appRef"
  >
    <div :class="classList">
      <RouterView />
    </div>
  </ConfigProvider>
</template>

<script lang="ts" setup>
import { ConfigProvider } from 'ant-design-vue/es'
import { RouterView } from 'vue-router'
import { usePanelSettingsStore } from '@/core/stores/panelSettings.store'
import { onMounted, ref, watch } from 'vue'
import type { SeedToken } from 'ant-design-vue/es/theme/internal'
import type { MapToken } from 'ant-design-vue/es/theme/interface'
import { useI18n } from 'vue-i18n'
import { usePanelSettingStore } from '@/stores/panelSetting.store'
import { theme } from 'ant-design-vue'
import { useCssVariables } from '@/composable/cssVariables.composable'
const { useToken } = theme
const { token } = useToken()
const { updateColors } = useCssVariables()

const panelSettingStore = usePanelSettingStore()
const { t } = useI18n()

onMounted(() => updateColors(panelSettingStore.settings.colorPrimary))
watch(
  () => panelSettingStore.settings.colorPrimary,
  (newColor) => {
    updateColors(newColor)
  },
)

onMounted(panelSettingStore.setLanguageConfig)
watch(() => panelSettingStore.settings.language, panelSettingStore.setLanguageConfig, {
  immediate: true,
})

const classList = ref('')
onMounted(() => {
  if (classList.value == 'dark bg-dark' && panelSettingStore.settings.isDark === false) {
    classList.value = ''
  }
  if (classList.value === '' && panelSettingStore.settings.isDark === true) {
    classList.value = 'dark bg-dark'
  }
})
watch(
  () => panelSettingStore.settings.isDark,
  (newValue) => {
    if (newValue === false) {
      classList.value = ''
    }
    if (newValue === true) {
      classList.value = 'dark bg-dark'
    }
  },
)
</script>
