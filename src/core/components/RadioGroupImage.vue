<template>
  <RadioGroup class="radio-group-image">
    <Tooltip :title="t(`${item.label}`)" v-for="(item, index) in props.items" :key="index">
      <Radio :value="item.value">
        <img :class="props.imageClass" :src="item.src" :alt="t(`${item.label}`)" />
      </Radio>
    </Tooltip>
  </RadioGroup>
</template>
<script setup lang="ts">
import { Radio, RadioGroup, Tooltip } from 'ant-design-vue/es'
import { useI18n } from 'vue-i18n'

interface Item {
  label: string
  src: string
  value: string | number | boolean
}
interface Props {
  items: Item[]
  imageClass?: string
  shadowColor?: string
}
const { t } = useI18n()
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
