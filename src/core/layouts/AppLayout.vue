<template>
  <ConfigProvider
    :componentSize="panelSettingsStore.settings.componentSize"
    :direction="panelSettingsStore.settings.direction"
    :locale="panelSettingsStore.locale"
    :theme="panelSettingsStore.theme"
    :ref="panelSettingsStore.fullscreen.appRef"
  >
    <RouterView />
  </ConfigProvider>
</template>

<script lang="ts" setup>
import { ConfigProvider } from 'ant-design-vue/es'
import { RouterView } from 'vue-router'
import { usePanelSettingsStore } from '@/core/stores/panelSettings.store'
import { computed, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { theme } from 'ant-design-vue'
import { useCssVariables } from '@/core/composable/cssVariables.composable'
import { findIndex } from 'lodash'
const { useToken } = theme
const { token } = useToken()
const { t } = useI18n()
const { updateColors } = useCssVariables()

const panelSettingsStore = usePanelSettingsStore()

onMounted(() => updateColors(panelSettingsStore.settings.colorPrimary))
watch(
  () => panelSettingsStore.settings.colorPrimary,
  (newColor) => {
    console.log(newColor)

    updateColors(newColor)
  },
)

onMounted(panelSettingsStore.setLanguageConfig)
watch(() => panelSettingsStore.settings.language, panelSettingsStore.setLanguageConfig, {
  immediate: true,
})

const appElement = computed<HTMLElement>(
  () => document.getElementById('app') ?? ({} as HTMLElement),
)

const setDarkMode = () => {
  if (panelSettingsStore.settings.isDark) {
    appElement.value.classList.add('dark')
    appElement.value.classList.add('bg-dark')
  } else {
    appElement.value.classList.remove('dark')
    appElement.value.classList.remove('bg-dark')
  }
}
onMounted(setDarkMode)
watch(() => panelSettingsStore.settings.isDark, setDarkMode)
</script>
