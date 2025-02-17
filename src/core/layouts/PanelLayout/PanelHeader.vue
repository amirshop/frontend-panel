<template>
  <LayoutHeader
    class="!bg-gradient-to-r  !leading-12 !p-inline-4 flex items-center"
    :class="
      configProviderStore.language === LanguagesEnum.ENGLISH
        ? '!from-blue !to-primary'
        : '!from-primary !to-blue'
    "
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
      <LockScreen />
    </div>
  </LayoutHeader>
</template>
<script lang="ts" setup>
import { Dropdown, LayoutHeader, Menu, MenuItem } from 'ant-design-vue/es'
import { Icon } from '@iconify/vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/core/stores/auth.store'
import { useConfigProviderStore } from '@/core/stores/configProvider.store'
import LockScreen from '@/core/components/LockScreen.vue'
import { AzButton } from '@/core/components'
import { useI18n } from 'vue-i18n'
import { LanguagesEnum } from '@/core/enums'

const configProviderStore = useConfigProviderStore()
const authStore = useAuthStore()
const router = useRouter()

const { t } = useI18n()
const logout = () => {
  authStore.logout()
  router.push({ name: 'TheAuthLogin' })
}
</script>
