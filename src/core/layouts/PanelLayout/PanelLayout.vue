<template>
  <Layout class="h-screen">
    <PanelSidebar />
    <Layout>
      <PanelHeader />
      <PanelMain />
    </Layout>
  </Layout>
</template>
<script lang="ts" setup>
import PanelSidebar from './PanelSidebar.vue'
import PanelHeader from './PanelHeader.vue'
import PanelMain from './PanelMain.vue'
import { Layout } from 'ant-design-vue/es'
</script>
