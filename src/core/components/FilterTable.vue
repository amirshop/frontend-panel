<template>
  <Dropdown :trigger="['click']">
    <Tooltip :title="t('exportData')">
      <AzButton
        type="link"
        size="small"
        class="ant-dropdown-link"
        @click.prevent
        icon="tabler:table-export"
      >
        {{ t('filters') }}
      </AzButton>
    </Tooltip>
    <template #overlay>
      <Card>
        {{ props.filterList }}
        <Form>
          <FormItem>
            <Select>
              <SelectOption>sdf</SelectOption>
              <SelectOption>sdf</SelectOption>
              <SelectOption>sdf</SelectOption>
            </Select>
          </FormItem>
        </Form>
      </Card>
    </template>
  </Dropdown>
</template>
<script setup lang="ts">
import { Tooltip, Dropdown, Card, FormItem, SelectOption,Select } from 'ant-design-vue/es'
import { AzButton } from '@/core/components'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

interface Props {
  filterList: unknown[]
}
const props = withDefaults(defineProps<Props>(), {})
</script>
