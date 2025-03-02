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
        <div class="hidden md:block">{{ t('export') }}</div>
      </AzButton>
    </Tooltip>
    <template #overlay>
      <Menu class="grid grid-cols-2">
        <Tooltip :title="t('excel')">
          <MenuItem @click="exportFile.json(props.data)">
            <Icon
              :class="
                getClass({
                  smC: 'text-4',
                  sm: 'text-4',
                  mdC: 'text-4',
                  md: 'text-6',
                  lgC: 'text-6',
                  lg: 'text-8',
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
                smC: 'text-4',
                sm: 'text-4',
                mdC: 'text-4',
                md: 'text-6',
                lgC: 'text-6',
                lg: 'text-8',
              }).value
            "
            icon="vscode-icons:file-type-xml"
          />
        </MenuItem>
        <MenuItem @click="exportFile.image()">
          <Icon
            :class="
              getClass({
                smC: 'text-4',
                sm: 'text-4',
                mdC: 'text-4',
                md: 'text-6',
                lgC: 'text-6',
                lg: 'text-8',
              }).value
            "
            icon="vscode-icons:file-type-image"
          />
        </MenuItem>
        <MenuItem @click="exportFile.excel(props.data)">
          <Icon
            :class="
              getClass({
                smC: 'text-4',
                sm: 'text-4',
                mdC: 'text-4',
                md: 'text-6',
                lgC: 'text-6',
                lg: 'text-8',
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
