<template>
  <LayoutSider
    v-model:collapsed="collapsed"
    collapsible
    breakpoint="lg"
    :class="windowSize.width.value > 640 ? undefined : '!absolute z-50 top-0 bottom-0 '"
    :collapsed-width="windowSize.width.value > 640 ? undefined : 0"
  >
    <div class=" bg-primary flex justify-center items-center gap-x-2" :class="panelSettings.settings.isCompact ? 'h-14': 'h-16'">
      <a href="http://localhost:3000" target="_blank">
        <Tooltip title="مشاهده فروشگاه">
          <AzButton type="primary" v-if="collapsed" class="!w-10 !h-10 !p-1">
            <img class="h-full w-full object-contain" src="/logo.png" alt="" srcset="" />
          </AzButton>
          <AzButton type="primary" class="!gap-x-1" icon="tabler:eye" v-if="!collapsed">
            مشاهده فروشگاه
          </AzButton>
        </Tooltip>
      </a>
    </div>

    <Menu
      class="h-full"
      v-model:selectedKeys="selectedKeys"
      mode="inline"
      :items="menus.menuItems.value"
      @click="handleClick"
      @openChange="router.push({ name: selectedKeys[0] })"
    />
  </LayoutSider>
</template>
<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import type { MenuProps } from 'ant-design-vue'
import { Menu, LayoutSider, Button, Tooltip } from 'ant-design-vue/es'
import { useRoute, useRouter } from 'vue-router'
import { useMenus } from '@/menus'
import { AzButton } from '@/core/components'

const menus = useMenus()
import { useWindowSize } from '@vueuse/core'
import { usePanelSettingsStore } from '@/core/stores/panelSettings.store'

const windowSize = useWindowSize()
const panelSettings = usePanelSettingsStore()
const collapsed = ref<boolean>(false)

const selectedKeys = ref<string[]>(['TheDashboard'])

const route = useRoute()

onMounted(() => {
  selectedKeys.value = [String(route.name)]
})
watch(
  () => route.name,
  () => {
    selectedKeys.value = [String(route.name)]
  },
)
const router = useRouter()

const handleClick: MenuProps['onClick'] = (e) => {
  router.push({ name: `${e.key}` })
  if (windowSize.width.value <= 640) {
    collapsed.value = !collapsed.value
  }
}
</script>
<style lang="less">
.ant-layout {
  .ant-layout-sider {
    .ant-layout-sider-trigger {
      @apply !bg-primary;
      height: 46.5px;
      line-height: 50.5px;
    }
  }
}
.ant-layout .ant-layout-sider-zero-width-trigger {
  background: var(--primary-color) !important;
  border-inline-end: 0 !important;
  top: 8px
}
</style>
