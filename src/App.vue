<template>
  <AppLayout />
</template>
<script setup lang="ts">
import AppLayout from '@/core/layouts/AppLayout.vue'
import { useHead } from '@vueuse/head'
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

const { t } = useI18n()

// مقدار داینامیک برای title و meta
const pageTitle = computed(() => t('siteTitle'))
const metaDescription = computed(() => t('siteDescription'))
const ogTitle = computed(() => t('dashboardTitle'))

// تنظیم اولیه `useHead`
useHead({
  title: pageTitle.value,
  meta: [
    { name: 'description', content: metaDescription.value },
    { property: 'og:title', content: ogTitle.value },
  ],
})
</script>
