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
import PanelSidebar from './PanelLayout/PanelSidebar.vue'
import PanelHeader from './PanelLayout/PanelHeader.vue'
import PanelMain from './PanelLayout/PanelMain.vue'
import { Layout } from 'ant-design-vue/es'
import { ref } from 'vue'
</script>
