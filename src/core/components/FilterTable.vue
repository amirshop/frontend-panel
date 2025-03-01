<template>
  <Badge color="red" count="9" status="success" size="small">
    <AzButton type="link" icon="tabler:filter" @click="filterModal.open">
      <div class="hidden md:block">{{ t('filters') }}</div>
    </AzButton>
  </Badge>

  <Modal v-model:open="filterModal.isOpen.value" title="Filters" width="80vw">
    <Form layout="vertical" class="bg-light dark:bg-dark grid lg:grid-cols-2 gap-4 p-4">
      <template v-for="item in props.filterList" :key="item.key">
        <Card>
          <div class="flex justify-between mb-2">
            <div class="font-medium text-base">{{ t(item.key) }}</div>
            <AzButton type="link" danger icon="tabler:trash" />
          </div>
          <div class="grid grid-cols-2 items-center gap-4">
            <template v-if="item.dateType === TableFilterDataTypeEnum.STRING">
              <FormItem :label="`نوع فیلتر ${item.dateType}`">
                <Select placeholder="برای فیلتر کردن یکی را انتخاب کنید" class="w-full">
                  <SelectOption v-for="item in stringFIlters" :value="item.value" :key="item.value">
                    {{ t(item.label) }}
                  </SelectOption>
                </Select>
              </FormItem>
              <FormItem label="مقدار فیلتر"> <Input v-model:value="item.value" /></FormItem>
            </template>

            <template v-if="item.dateType === TableFilterDataTypeEnum.NUMBER">
              <FormItem :label="`نوع فیلتر ${item.dateType}`">
                <Select placeholder="برای فیلتر کردن یکی را انتخاب کنید" class="w-full">
                  <SelectOption v-for="item in numberFIlters" :value="item.value" :key="item.value">
                    {{ t(item.label) }}
                  </SelectOption>
                </Select>
              </FormItem>
              <FormItem label="مقدار فیلتر"> <InputNumber v-model:value="item.value" class="w-full" /></FormItem>
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
                <Select placeholder="برای فیلتر کردن یکی را انتخاب کنید" class="w-full">
                  <SelectOption v-for="item in dateFIlters" :value="item.value" :key="item.value">
                    {{ t(item.label) }}
                  </SelectOption>
                </Select>
              </FormItem>
              <FormItem label="مقدار فیلتر">
                <DatePicker v-model:value="item.value" show-time class="w-full" />
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
  TableFilterOperatorNumberEnum,
} from '@/core/enums'
import { booleanFIlters, dateFIlters, numberFIlters, stringFIlters } from '@/core/constant'

const { t } = useI18n()

interface Filter {
  key: string
  dateType: TableFilterDataTypeEnum
  value: string
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
