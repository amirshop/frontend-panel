<template>
  <ConfigProvider
    :theme="{
      token: configProviderStore.token,
    }"
    :locale="configProviderStore.locale"
    :component-size="configProviderStore.size"
    :direction="configProviderStore.direction"
    :ref="configProviderStore.fullscreen.appRef"
  >
    <RouterView />
  </ConfigProvider>
</template>
<script lang="ts" setup>
import { ConfigProvider } from 'ant-design-vue/es'
import { RouterView } from 'vue-router'
import { useConfigProviderStore } from '@/core/stores/configProvider.store'

const configProviderStore = useConfigProviderStore()
</script>
