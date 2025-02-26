<template>
  <div class="grid grid-rows-[1fr_max-content] min-h-screen bg-auth-pattern" id="my-background">
    <div class="container mx-auto grid items-center">
      <div class="grid grid-cols-2">
        <div class="flex flex-col justify-center items-center">
          <AzCard :title="t('form.login')" class="w-120">
            <RouterView />
          </AzCard>
        </div>
        <img class="w-170" src="@/assets/images/panel/signup.svg" alt="" />
      </div>
    </div>
    <div
      class="p-4 bg-gray-50 grid grid-cols-3 gap-x-4 items-center justify-between border-t border-t-dashed border-t-gray-300"
    >
      <div>
        <Select v-model:value="panelSettingsStore.settings.direction" size="small">
          <SelectOption value="ltr">
            <div class="flex items-center gap-x-2">
              <Icon icon="twemoji:flag-england" />
              <span>English</span>
            </div>
          </SelectOption>

          <SelectOption value="rtl">
            <div class="flex items-center gap-x-2">
              <Icon icon="twemoji:flag-iran" />
              <span>فارسی</span>
            </div>
          </SelectOption>
          <SelectOption value="ltr">
            <div class="flex items-center gap-x-2">
              <Icon icon="twemoji:flag-azerbijan" />
              <span>آذری</span>
            </div>
          </SelectOption>
        </Select>
      </div>
      <div class="text-sm text-center font-body">
        تحلیل، طراحی و توسعه توسط امیر مقامی و امیر زرچینی
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { RouterView } from 'vue-router'
import { Select, SelectOption } from 'ant-design-vue/es'
import { usePanelSettingsStore } from '@/core/stores/panelSettings.store'
import { AzCard } from '@/core/components'
import { Icon } from '@iconify/vue/dist/iconify.js'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const panelSettingsStore = usePanelSettingsStore()
</script>
<style>
.bg-auth-pattern {
  background-image: url('../../assets/images/panel/auth-pattern.webp');
  background-position: center center;
  background-size: cover;
}
</style>
