<template>
  <Badge color="red" count="9" status="success" size="small">
    <AzButton type="link" icon="tabler:filter" @click="filterModal.open">
      {{ t('filters') }}
    </AzButton>
  </Badge>

  <Modal v-model:open="filterModal.isOpen.value" title="Filters" width="80vw">
    <Form layout="vertical" class="bg-light dark:bg-dark grid lg:grid-cols-2 gap-4 p-4">
      <template v-for="item in props.filterList" :key="item.key">
        <Card>
          <div class="flex justify-between mb-2">
            <div class="font-medium text-base">{{ t(item.key) }}</div>
            <AzButton type="link" danger icon="tabler:trash"  />
          </div>
          <div class="grid grid-cols-2 items-center gap-4">
            <FormItem label="نوع فیلتر">
              <Select placeholder="برای فیلتر کردن یکی را انتخاب کنید" class="w-full">
                <template v-if="item.dateType === TableFilterDataTypeEnum.STRING">
                  <SelectOption v-for="item in stringFIlters" :value="item.value" :key="item.value">
                    {{ t(item.label) }}
                  </SelectOption>
                </template>
                <template v-if="item.dateType === TableFilterDataTypeEnum.DATE">
                  <SelectOption v-for="item in dateFIlters" :value="item.value" :key="item.value">
                    {{ t(item.label) }}
                  </SelectOption>
                </template>
                <template v-if="item.dateType === TableFilterDataTypeEnum.NUMBER">
                  <SelectOption v-for="item in numberFIlters" :value="item.value" :key="item.value">
                    {{ t(item.label) }}
                  </SelectOption>
                </template>

                <template v-if="item.dateType === TableFilterDataTypeEnum.BOOLEAN">
                  <SelectOption
                    v-for="item in booleanFIlters"
                    :value="item.value"
                    :key="item.value"
                  >
                    {{ t(item.label) }}
                  </SelectOption>
                </template>

                <template v-if="item.dateType === TableFilterDataTypeEnum.SELECT">
                  <SelectOption v-for="item in selectFIlters" :value="item.value" :key="item.value">
                    {{ t(item.label) }}
                  </SelectOption>
                </template>
              </Select>
            </FormItem>
            <FormItem label="مقدار فیلتر">
              <Input />
            </FormItem>
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
}
interface Props {
  filterList: Filter[]
}
const props = withDefaults(defineProps<Props>(), {})
const { useToken } = theme
const { token } = useToken()
const filterModal = useModal()
filterModal.isOpen.value = true
</script>
