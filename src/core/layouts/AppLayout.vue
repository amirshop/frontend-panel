<template>
  <ConfigProvider
    :theme="{
      algorithm: algorithm,
      token: {
        colorPrimary: configStore.settings.primaryColor ?? 'red',
        fontFamily: configStore.settings.fontFamily ?? '',
      },
    }"
    :locale="configStore.locale"
    :component-size="configStore.size"
    :direction="configStore.direction"
    :ref="configStore.fullscreen.appRef"
  >
    <div class="dark:bg-dark">
      <RouterView />
    </div>
  </ConfigProvider>
</template>
<script lang="ts" setup>
import { ConfigProvider, type DerivativeFunc, theme } from 'ant-design-vue/es'
import { RouterView } from 'vue-router'
import { useConfigStore } from '@/core/stores/config.store'
import { ref, watch } from 'vue'
import { useCssVariables } from '../composable/cssVariables.composable'
import type { SeedToken } from 'ant-design-vue/es/theme/internal'
import type { MapToken } from 'ant-design-vue/es/theme/interface'
const { primaryColor, fontFamily, updateColors } = useCssVariables()

const configStore = useConfigStore()

const token = ref(theme.useToken().token)
watch(token, (newVal) => {
  console.log(newVal)
})

watch(
  () => configStore.settings.primaryColor,
  (newColor) => {
    primaryColor.value = newColor
    updateColors()
  },
  { immediate: true },
)

watch(
  () => configStore.settings.fontFamily,
  (newColor) => {
    fontFamily.value = newColor
  },
  { immediate: true },
)

watch(
  () => configStore.settings.isDark,
  (newMode) => {
    if (newMode === true) {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }
  },
  { immediate: true },
)

const algorithm = ref<DerivativeFunc<SeedToken, MapToken>[]>([])

watch(
  () => configStore.settings.isCompact,
  (newVal) => {
    if (newVal) {
      if (!algorithm.value.includes(theme.compactAlgorithm)) {
        algorithm.value.push(theme.compactAlgorithm)
      }
    } else {
      algorithm.value = algorithm.value.filter((item) => item !== theme.compactAlgorithm)
    }
  },
  { immediate: true },
)

watch(
  () => configStore.settings.isDark,
  (newVal) => {
    if (newVal) {
      if (!algorithm.value.includes(theme.darkAlgorithm)) {
        algorithm.value.push(theme.darkAlgorithm)
      }
    } else {
      algorithm.value = algorithm.value.filter((item) => item !== theme.darkAlgorithm)
    }
  },
  { immediate: true },
)
</script>
