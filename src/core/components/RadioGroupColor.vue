<template>
  <RadioGroup class="radio-group-color" @change="(e) => emits('update:modelValue', e.target.value)">
    <Tooltip :title="color.label" v-for="color in props.colorList" :key="color.value">
      <Radio :value="color.value">
        <div
          class="rounded"
          :class="[
            color.class,
            getClass({
              smC: 'w-5 h-5',
              sm: 'w-6 h-6',
              mdC: 'w-6 h-6',
              md: 'w-7 h-7',
              lgC: 'w-7 h-7',
              lg: 'w-8 h-8',
            }).value,
          ]"
        />
      </Radio>
    </Tooltip>
  </RadioGroup>
</template>
<script setup lang="ts">
import { Radio, RadioGroup, Tooltip, theme } from 'ant-design-vue/es'
import { useComputedClass } from '../composable/computedClass.composable'
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
const { token } = theme.useToken()
const { getClass } = useComputedClass()
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
