<template>
  <Badge color="red" count="9" status="success" size="small">
    <AzButton type="link" icon="tabler:filter" @click="filterModal.open">
      <div class="hidden md:block">{{ t('advanceFilter') }}</div>
    </AzButton>
  </Badge>

  <Modal v-model:open="filterModal.isOpen.value" title="Filters" width="60vw">
    <Form layout="vertical" class="bg-light dark:bg-dark grid lg:grid-cols-2 gap-4 p-4">
      <template v-for="item in props.filterList" :key="item.key">
        <Card>
          <div class="flex justify-between mb-2">
            <div class="font-medium text-base">{{ t(item.key) }}</div>
            <AzButton type="link" danger icon="tabler:trash" />
          </div>
          <div class="md:grid md:grid-cols-2 md:items-center md:gap-4">
            <template v-if="item.dateType === TableFilterDataTypeEnum.STRING">
              <FormItem :label="`نوع فیلتر ${item.dateType}`" class="w-40">
                <Select placeholder="برای فیلتر کردن یکی را انتخاب کنید">
                  <SelectOption v-for="item in stringFIlters" :value="item.value" :key="item.value">
                    {{ t(item.label) }}
                  </SelectOption>
                </Select>
              </FormItem>
              <FormItem label="مقدار فیلتر" class="w-40">
                <Input v-model:value="item.value"
              /></FormItem>
            </template>

            <template v-if="item.dateType === TableFilterDataTypeEnum.NUMBER">
              <FormItem :label="`نوع فیلتر ${item.dateType}`">
                <Select placeholder="برای فیلتر کردن یکی را انتخاب کنید">
                  <SelectOption v-for="item in numberFIlters" :value="item.value" :key="item.value">
                    {{ t(item.label) }}
                  </SelectOption>
                </Select>
              </FormItem>
              <FormItem label="مقدار فیلتر"> <InputNumber v-model:value="item.value" /></FormItem>
            </template>

            <template v-if="item.dateType === TableFilterDataTypeEnum.BOOLEAN">
              <FormItem :label="`نوع فیلتر ${item.dateType}`">
                <RadioGroup v-model:value="item.value">
                  <Radio v-for="item in booleanFIlters" :value="item.value" :key="item.value">
                    {{ t(item.label) }}
                  </Radio>
                </RadioGroup>
              </FormItem>
            </template>

            <template v-if="item.dateType === TableFilterDataTypeEnum.SELECT">
              <FormItem :label="`نوع فیلتر ${item.dateType}`">
                <Select>
                  <SelectOption
                    v-for="item in booleanFIlters"
                    :key="item.value"
                    mode="tags"
                    v-model:value="item.value"
                  >
                    {{ t(item.label) }}</SelectOption
                  >
                </Select>
              </FormItem>
            </template>
            <template v-if="item.dateType === TableFilterDataTypeEnum.DATE">
              <FormItem :label="`نوع فیلتر ${item.dateType}`">
                <Select placeholder="برای فیلتر کردن یکی را انتخاب کنید">
                  <SelectOption v-for="item in dateFIlters" :value="item.value" :key="item.value">
                    {{ t(item.label) }}
                  </SelectOption>
                </Select>
              </FormItem>
              <FormItem label="مقدار فیلتر">
                <DatePicker v-model:value="item.value" show-time />
              </FormItem>
            </template>
          </div>
        </Card>
      </template>
    </Form>
  </Modal>
</template>
<script setup lang="ts">
import {
  Form,
  FormItem,
  SelectOption,
  Select,
  Input,
  Modal,
  Badge,
  Divider,
  Card,
  theme,
  InputNumber,
  Radio,
  RadioGroup,
  DatePicker,
} from 'ant-design-vue/es'
import { AzButton } from '@/core/components'
import { useI18n } from 'vue-i18n'
import { useModal } from '../composable'
import {
  TableFilterDataTypeEnum,
  TableFilterOperatorBooleanEnum,
  TableFilterOperatorDateEnum,
  TableFilterOperatorNumberEnum,
  TableFilterOperatorSelectEnum,
  TableFilterOperatorStringEnum,
} from '@/core/enums'
import { booleanFIlters, dateFIlters, numberFIlters, stringFIlters } from '@/core/constant'

const { t } = useI18n()

interface Filter {
  felid: ColumnSharedType<T>
  dateType: TableFilterDataTypeEnum
  operator:
    | TableFilterOperatorSelectEnum
    | TableFilterOperatorBooleanEnum
    | TableFilterOperatorNumberEnum
    | TableFilterOperatorStringEnum
    | TableFilterOperatorDateEnum
  criteria: ''
}
interface Props {
  filterList: Filter[]
}
const props = withDefaults(defineProps<Props>(), {})
const { useToken } = theme
const { token } = useToken()
const filterModal = useModal()
// filterModal.isOpen.value = true
</script>
