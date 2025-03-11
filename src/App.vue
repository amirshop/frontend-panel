<template>
  <AppLayout />
    <VueQueryDevtools />

</template>
<script setup lang="ts">
import AppLayout from '@/core/layouts/AppLayout.vue'
// import { useHead } from '@vueuse/head'
import { useI18n } from 'vue-i18n'
import { computed, onMounted } from 'vue'
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'

// const { t } = useI18n()

// const pageTitle = computed(() => t('siteTitle'))
// const metaDescription = computed(() => t('siteDescription'))
// const ogTitle = computed(() => t('dashboardTitle'))

// onMounted(() =>
//   useHead({
//     title: pageTitle.value,
//     meta: [
//       { name: 'description', content: metaDescription.value },
//       { property: 'og:title', content: ogTitle.value },
//     ],
//   }),
// )
</script>
