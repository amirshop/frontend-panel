<template>
  <LayoutSider v-model:collapsed="collapsed" collapsible>
    <div class="h-12 bg-primary flex justify-center items-center gap-x-2">
      <img class="h-10 w-10 object-contain" src="/logo.png" alt="" srcset="" />
      <span v-if="!collapsed" class="text-white">سامانه نهال</span>
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
import { Menu, LayoutSider } from 'ant-design-vue/es'
import { useRoute, useRouter } from 'vue-router'
import { useMenus } from '@/menus'

const menus = useMenus()

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
</style>
