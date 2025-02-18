<template>
  <LayoutHeader
    class="!leading-12 !p-inline-4 flex items-center  !from-primary !to-primary-300"
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
              {{ t('panel.exit') }}
              <template #icon>
                <Icon icon="uil:signout" />
              </template>
            </MenuItem>
          </Menu>
        </template>
      </Dropdown>
      <Divider type="vertical" class="bg-white" />
      <Tooltip title="بزرگنمایی" size="small">
        <AzButton
          icon="lets-icons:full"
          type="text"
          class="text-white"
          @click="configProviderStore.fullscreen.toggle"
        />
      </Tooltip>
      <Divider type="vertical" class="bg-white" />
      <Tooltip title="قفل صفحه" size="small">
        <LockScreen />
      </Tooltip>
    </div>
  </LayoutHeader>
</template>
<script lang="ts" setup>
import { Dropdown, LayoutHeader, Menu, MenuItem, Divider,Tooltip } from 'ant-design-vue/es'
import { Icon } from '@iconify/vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/core/stores/auth.store'
import { useConfigProviderStore } from '@/core/stores/configProvider.store'
import LockScreen from '@/core/components/LockScreen.vue'
import { AzButton } from '@/core/components'
import { useI18n } from 'vue-i18n'
import { DirectionsEnum, LanguagesEnum } from '@/core/enums'
import AzFullScreen from '@/core/components/AzFullScreen.vue'
import { computed } from 'vue'

const configProviderStore = useConfigProviderStore()
const authStore = useAuthStore()
const router = useRouter()

const { t } = useI18n()
const logout = () => {
  authStore.logout()
  router.push({ name: 'TheAuthLogin' })
}

const headerClass = computed(() => {
  if (configProviderStore.direction === DirectionsEnum.RTL) {
    return '!bg-gradient-to-l'
  } else {
    return '!bg-gradient-to-r '
  }
})
</script>
