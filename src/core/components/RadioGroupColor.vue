<template>
  <RadioGroup class="radio-group-color" @change="(e) => (primaryColor = e.target.value)">
    <Tooltip title="cyan">
      <Radio value="#22d3ee">
        <div class="w-8 h-8 rounded bg-cyan" />
      </Radio>
    </Tooltip>

    <Tooltip title="teal">
      <Radio value="#00BBA7FF">
        <div class="w-8 h-8 rounded bg-teal" />
      </Radio>
    </Tooltip>

    <Tooltip title="cyan">
      <Radio value="#00B8DBFF">
        <div class="w-8 h-8 rounded bg-cyan" />
      </Radio>
    </Tooltip>

    <Tooltip title="sky">
      <Radio value="#00A6F4FF">
        <div class="w-8 h-8 rounded bg-sky" />
      </Radio>
    </Tooltip>

    <Tooltip title="blue">
      <Radio value="#2B7FFFFF">
        <div class="w-8 h-8 rounded bg-blue" />
      </Radio>
    </Tooltip>
    <Tooltip title="indigo">
      <Radio value="#7C86FFFF">
        <div class="w-8 h-8 rounded bg-indigo" />
      </Radio>
    </Tooltip>

    <Tooltip title="slate">
      <Radio value="#62748EFF">
        <div class="w-8 h-8 rounded bg-slate" />
      </Radio>
    </Tooltip>

    <Tooltip title="violet">
      <Radio value="#8E51FFFF">
        <div class="w-8 h-8 rounded bg-violet" />
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
}
interface Props {
  colorList: ColorItem[]
  selectedColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  colorList: () => [],
  selectedColor: 'red',
})
const primaryColor = useCssVar('--color-primary')
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
