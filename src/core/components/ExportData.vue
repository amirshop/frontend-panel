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
        {{ t('export') }}
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
        <MenuItem @click="exportFile.image()">
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
    </template>
  </Dropdown>
</template>
<script setup lang="ts">
import { Tooltip, Dropdown, Menu, MenuItem } from 'ant-design-vue/es'
import { useExportFile } from '@/core/composable/exportFile.composable'
import { AzButton } from '@/core/components'
import { Icon } from '@iconify/vue/dist/iconify.js'
import { useI18n } from 'vue-i18n'
import { useComputedClass } from '@/core/composable/computedClass.composable'

const exportFile = useExportFile()
const { t } = useI18n()
const { getClass } = useComputedClass()

interface Props {
  data: unknown[]
}
const props = withDefaults(defineProps<Props>(), {})
</script>
