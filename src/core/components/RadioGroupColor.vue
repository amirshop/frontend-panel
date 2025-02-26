<template>
  <RadioGroup class="radio-group-color" @change="(e) => emits('update:modelValue', e.target.value)">
    <Tooltip :title="color.label" v-for="color in props.colorList" :key="color.value">
      <Radio :value="color.value">
        <div class="w-8 h-8 rounded" :class="color.class" />
      </Radio>
    </Tooltip>
  </RadioGroup>
</template>
<script setup lang="ts">
import { useCssVar } from '@vueuse/core'
import { Radio, RadioGroup, Tooltip } from 'ant-design-vue/es'

interface ColorItem {
  label: string
  value: string
  class: string
}
interface Props {
  colorList: ColorItem[]
  selectedColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  colorList: () => [],
  selectedColor: 'red',
})
const emits = defineEmits(['update:modelValue'])
</script>
<style lang="less">
.radio-group-color {
  @apply flex flex-wrap gap-2;

  .ant-radio-wrapper {
    margin-inline-end: 0;

    .ant-radio {
      @apply hidden;
    }

    span {
      &:nth-child(2) {
        @apply p-0 rounded;
        border: 1px solid transparent;
      }
    }

    &.ant-radio-wrapper-checked {
      span {
        &:nth-child(2) {
          position: relative;
          &::before {
            content: '';
            display: block;
            position: absolute;
            bottom: -6px;
            width: 80%;
            margin-inline: auto;
            left: 0;
            right: 0;
            height: 2px;
            background-color: red;
          }
        }
      }
    }
  }
}
</style>
