<template>
  <RadioGroup class="radio-group-image">
    <Tooltip :title="item.label" v-for="item in props.items" :key="item.value">
      <Radio :value="item.value">
        <img :class="props.imageClass" :src="item.src" :alt="item.label" />
      </Radio>
    </Tooltip>
  </RadioGroup>
</template>
<script setup lang="ts">
import { Radio, RadioGroup, Tooltip } from 'ant-design-vue/es'

interface Item {
  label: string
  src: string
  value: string | number
}
interface Props {
  items: Item[]
  imageClass?: string
  shadowColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  items: () => [],
  imageClass: '',
  shadowColor: 'red',
})
</script>
<style lang="less">
.radio-group-image {
  @apply flex flex-wrap gap-2;
  .ant-radio-wrapper {
    margin-inline-end: 0;
    .ant-radio {
      @apply hidden;
    }
    span {
      &:nth-child(2) {
        padding: 0;
        @apply p-0 rounded;
        border: 1px solid transparent;
      }
    }
    &.ant-radio-wrapper-checked {
      span {
        &:nth-child(2) {
          img {
            filter: drop-shadow(0px 0px 3px v-bind('props.shadowColor'));
          }
        }
      }
    }
  }
}
</style>
