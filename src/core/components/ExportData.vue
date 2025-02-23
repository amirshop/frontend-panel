<template>
  <Dropdown>
    <Tooltip :title="t('exportData')">
      <AzButton
        type="link"
        size="small"
        class="ant-dropdown-link"
        @click.prevent
        icon="tabler:table-export"
      >
        <!-- {{ t('export') }} -->
      </AzButton>
    </Tooltip>
    <template #overlay>
      <Menu class="grid grid-cols-2">
        <Tooltip :title="t('excel')">
          <MenuItem @click="exportFile.json(props.data)">
            <Icon
              :class="
                getClass({
                  sC: 'text-4',
                  s: 'text-4',
                  mC: 'text-4',
                  m: 'text-6',
                  lC: 'text-6',
                  l: 'text-8',
                }).value
              "
              icon="vscode-icons:file-type-json"
            />
          </MenuItem>
        </Tooltip>
        <MenuItem @click="exportFile.xml(props.data)">
          <Icon
            :class="
              getClass({
                sC: 'text-4',
                s: 'text-4',
                mC: 'text-4',
                m: 'text-6',
                lC: 'text-6',
                l: 'text-8',
              }).value
            "
            icon="vscode-icons:file-type-xml"
          />
        </MenuItem>
        <MenuItem @click="exportFile.image(props.data)">
          <Icon
            :class="
              getClass({
                sC: 'text-4',
                s: 'text-4',
                mC: 'text-4',
                m: 'text-6',
                lC: 'text-6',
                l: 'text-8',
              }).value
            "
            icon="vscode-icons:file-type-image"
          />
        </MenuItem>
        <MenuItem @click="exportFile.excel(props.data)">
          <Icon
            :class="
              getClass({
                sC: 'text-4',
                s: 'text-4',
                mC: 'text-4',
                m: 'text-6',
                lC: 'text-6',
                l: 'text-8',
              }).value
            "
            icon="vscode-icons:file-type-excel"
          />
        </MenuItem>
      </Menu>
      <div class="bg-slate-200 dark:bg-dark grid grid-cols-2 gap-2 p-2 shadow rounded">
        <Tooltip :title="t('excel')">
          <Icon
            @click="exportFile.excel(props.data)"
            class="bg-white dark:bg-slate-700 rounded p-2 cursor-pointer"
            icon="vscode-icons:file-type-excel"
          />
        </Tooltip>
        <Tooltip :title="t('json')">
          <Icon
            @click="exportFile.json(props.data)"
            class="bg-white dark:bg-slate-700 rounded p-2 cursor-pointer"
            icon="vscode-icons:file-type-json"
          />
        </Tooltip>
        <Tooltip :title="t('image')">
          <Icon
            @click="exportFile.image('az-table')"
            class="bg-white dark:bg-slate-700 rounded p-2 cursor-pointer"
            icon="vscode-icons:file-type-image"
          />
        </Tooltip>
        <Tooltip :title="t('xml')">
          <Icon
            @click="exportFile.xml(props.data)"
            class="bg-white dark:bg-slate-700 rounded p-2 cursor-pointer"
            icon="vscode-icons:file-type-xml"
          />
        </Tooltip>
      </div>
    </template>
  </Dropdown>
</template>
<script setup lang="ts">
import {
  Table,
  Card,
  Divider,
  RangePicker,
  Tooltip,
  Input,
  InputNumber,
  Switch,
  Form,
  FormItem,
  Badge,
  Dropdown,
  Menu,
  MenuItem,
} from 'ant-design-vue/es'
import { useExportFile } from '@/core/composable/exportFile.composable'
import { AzButton } from '@/core/components'
import { Icon } from '@iconify/vue/dist/iconify.js'
import { useI18n } from 'vue-i18n'
import { usePanelSettingsStore } from '../stores/panelSettings.store'
import { computed } from 'vue'
import { ComponentsSizesEnum } from '../enums'
import { useComputedClass } from '@/core/composable/computedClass.composable'

const exportFile = useExportFile()
const { t } = useI18n()
const { getClass } = useComputedClass()

interface Props {
  data: unknown[]
}
const props = withDefaults(defineProps<Props>(), {})
</script>
