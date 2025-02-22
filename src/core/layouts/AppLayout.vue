<template>
  <ConfigProvider
    :theme="{
      algorithm: algorithm,
      token: {
        colorPrimary: panelSettingsStore.settingList.primaryColor,
        fontFamily: panelSettingsStore.settingList.fontFamily,
      },
    }"
    :locale="panelSettingsStore.locale"
    :component-size="panelSettingsStore.settingList.componentsSize"
    :direction="panelSettingsStore.settingList.direction"
    :ref="panelSettingsStore.fullscreen.appRef"
  >
    <RouterView />
  </ConfigProvider>
</template>

<script lang="ts" setup>
import { ConfigProvider, type DerivativeFunc, theme } from 'ant-design-vue/es'
import { RouterView } from 'vue-router'
import { usePanelSettingsStore } from '@/core/stores/panelConfig.store'
import { ref, watch } from 'vue'
import { useCssVariables } from '../composable/cssVariables.composable'
import type { SeedToken } from 'ant-design-vue/es/theme/internal'
import type { MapToken } from 'ant-design-vue/es/theme/interface'

const { primaryColor, fontFamily, updateColors } = useCssVariables()
const panelSettingsStore = usePanelSettingsStore()

const token = ref(theme.useToken().token)
watch(token, (newVal) => {
  console.log(newVal)
})

watch(
  () => panelSettingsStore.settingList.primaryColor,
  (newColor) => {
    primaryColor.value = newColor
    updateColors()
  },
  { immediate: true },
)

watch(
  () => panelSettingsStore.settingList.fontFamily,
  (newColor) => {
    fontFamily.value = newColor
  },
  { immediate: true },
)

const algorithm = ref<DerivativeFunc<SeedToken, MapToken>[]>([])

watch(
  () => panelSettingsStore.settingList.isCompact,
  (newVal) => {
    algorithm.value = [
      ...(panelSettingsStore.settingList.isDark ? [theme.darkAlgorithm] : []),
      ...(newVal ? [theme.compactAlgorithm] : []),
    ]
  },
  { immediate: true },
)

watch(
  () => panelSettingsStore.settingList.isDark,
  (newVal) => {
    algorithm.value = [
      ...(newVal ? [theme.darkAlgorithm] : []),
      ...(panelSettingsStore.settingList.isCompact ? [theme.compactAlgorithm] : []),
    ]

    if (newVal) {
      document.body.classList.add('bg-dark')
    } else {
      document.body.classList.remove('bg-dark')
    }
  },
  { immediate: true },
)
</script>
