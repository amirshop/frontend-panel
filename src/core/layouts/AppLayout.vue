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

const algorithm = ref<DerivativeFunc<SeedToken, MapToken>[]>([])

watch(
  () => configStore.settings.isCompact,
  (newVal) => {
    algorithm.value = [
      ...(configStore.settings.isDark ? [theme.darkAlgorithm] : []),
      ...(newVal ? [theme.compactAlgorithm] : [])
    ]
  },
  { immediate: true }
)

watch(
  () => configStore.settings.isDark,
  (newVal) => {
    algorithm.value = [
      ...(newVal ? [theme.darkAlgorithm] : []),
      ...(configStore.settings.isCompact ? [theme.compactAlgorithm] : [])
    ]
    
    if (newVal) {
      document.body.classList.add('dark', 'bg-dark')
    } else {
      document.body.classList.remove('dark', 'bg-dark')
    }
  },
  { immediate: true }
)
</script>