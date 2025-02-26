<template>
  <LayoutHeader
    class="!leading-12 !p-inline-4 flex items-center !from-primary !to-primary-300"
    :class="headerClass"
  >

    <div class="flex items-center ms-auto">
      <Dropdown :trigger="['click']" class="!ms-auto">
        <AzButton
          icon="tabler:user"
          type="text"
          class="text-white !flex !items-center gap-x-2"
          @click.prevent
        >
          {{ authStore.currentUser.username ?? 'ناشناس' }}
        </AzButton>
        <template #overlay>
          <Menu>
            <MenuItem key="0" class="!text-red" @click="logout">
              {{ t('exit') }}
              <template #icon>
                <Icon icon="uil:signout" />
              </template>
            </MenuItem>
          </Menu>
        </template>
      </Dropdown>
      <Divider type="vertical" class="bg-white" />
      <Tooltip
        :title="panelSettingsStore.fullscreen.isFullscreen ? t('exitFullScreen') : t('fullScreen')"
        size="small"
      >
        <AzButton
          :icon="
            panelSettingsStore.fullscreen.isFullscreen ? 'subway:close-2' : 'subway:fullscreen'
          "
          type="text"
          class="text-white"
          @click="panelSettingsStore.fullscreen.toggle"
        />
      </Tooltip>
      <Divider type="vertical" class="bg-white" />
      <Tooltip :title="t('lockScreen')" size="small">
        <LockScreen />
      </Tooltip>
      <Divider type="vertical" class="bg-white" />
      <Tooltip :title="t('panelSetting')" size="small">
        <AzButton
          icon="tabler:settings"
          type="text"
          class="text-white"
          @click="panelSettingModal.open"
        />
        <Drawer v-model:open="panelSettingModal.isOpen.value" @save="panelSettingModal.close" />
      </Tooltip>
    </div>
  </LayoutHeader>
</template>
<script lang="ts" setup>
import { Dropdown, LayoutHeader, Menu, MenuItem, Divider, Tooltip } from 'ant-design-vue/es'
import { Icon } from '@iconify/vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/core/stores/auth.store'
import { usePanelSettingsStore } from '@/core/stores/panelSettings.store'
import LockScreen from '@/core/components/LockScreen.vue'
import { AzButton } from '@/core/components'
import { useI18n } from 'vue-i18n'
import { DirectionEnum, LanguageEnum } from '@/core/enums'
import AzFullScreen from '@/core/components/AzFullScreen.vue'
import { computed } from 'vue'
import Drawer from '@/core/components/Drawer.vue'
import { useModal } from '@/core/composable'

const panelSettingsStore = usePanelSettingsStore()
const authStore = useAuthStore()
const router = useRouter()

const { t } = useI18n()
const logout = () => {
  authStore.logout()
  router.push({ name: 'TheAuthLogin' })
}

const headerClass = computed(() => {
  if (panelSettingsStore.settings.direction === DirectionEnum.RTL) {
    return '!bg-gradient-to-l'
  } else {
    return '!bg-gradient-to-r '
  }
})
const panelSettingModal = useModal()
</script>
