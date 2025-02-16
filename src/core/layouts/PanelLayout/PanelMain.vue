<template>
  <LayoutContent class="p-4 overflow-y-auto overflow-x-hidden">
    <Transition :name="randomAnimation">
      <RouterView v-slot="{ Component }">
        <component :is="Component" />
      </RouterView>
    </Transition>
  </LayoutContent>
</template>

<script lang="ts" setup>
import { RouterView, useRouter } from 'vue-router'
import { LayoutContent } from 'ant-design-vue/es'
import { onMounted, reactive, ref } from 'vue'

const randomAnimation = ref('slide-x')
const animations = reactive(['slide-x', 'slide-y'])
const getRandomAnimation = () => {
  const randomIndex = Math.floor(Math.random() * animations.length)
  return animations[randomIndex]
}

onMounted(() => {
  const router = useRouter()
  router.beforeEach((to, from, next) => {
    randomAnimation.value = getRandomAnimation()
    next()
  })
})
</script>

<style>
[v-cloak] {
  display: none;
}
</style>
