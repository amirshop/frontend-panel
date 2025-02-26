<template>
  <Card>
    <AgGridVue
      class="h-170 !border-none"
      :paginationPageSizeSelector="[5, 10, 20, 50, 100]"
      :enableRtl="true"
      :rowDragManaged="true"
      :pagination="true"
      :animateRows="true"
      :loading="false"
      :rowData="rowData"
      :columnDefs="colDefs"
      :defaultColDef="defaultColDef"
      :rowSelection="rowSelection"
      @cell-value-changed="onCellValueChanged"
      @selection-changed="onSelectionChanged"
      @grid-ready="onGridReady"
      :domLayout="'normal'"
      :localeText="AG_GRID_LOCALE_IR"
    />
  </Card>
</template>
<script setup lang="ts">
import { computed, defineComponent, onMounted, ref, shallowRef } from 'vue'
import { AgGridVue } from 'ag-grid-vue3'
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'
import { Card } from 'ant-design-vue'
import { AG_GRID_LOCALE_IR } from '@/utils/fa-IR'

import type {
  CellValueChangedEvent,
  ColDef,
  GridApi,
  GridReadyEvent,
  RowSelectionOptions,
  SelectionChangedEvent,
} from 'ag-grid-community'
import axios from 'axios'
import { useWindowSize } from '@vueuse/core'

ModuleRegistry.registerModules([AllCommunityModule])
interface IRow {
  mission: string
  company: string
  location: string
  date: string
  time: string
  rocket: string
  price: number
  successful: boolean
}
const defaultColDef = ref<ColDef>({
  editable: true,
  filter: true,
  flex: 1,
  minWidth: 100,
  sortable: true,
})

const rowData = ref<IRow[]>([])

const CompanyLogoRenderer = defineComponent({
  template: `
    <span style="display: flex; height: 100%; width: 100%; align-items: center;">
      <img :src="'https://www.ag-grid.com/example-assets/space-company-logos/' + cellValueLowerCase + '.png'" style="display: block; width: 25px; height: auto; max-height: 50%; margin-right: 12px; filter: brightness(1.1);"  alt=""/>
      <p style="text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">{{ cellValue }}</p>
    </span>
    `,
  setup(props) {
    const cellValue = props.params.value
    const cellValueLowerCase = cellValue.toLowerCase()
    return {
      cellValue,
      cellValueLowerCase,
    }
  },
})

// Column Definitions: Defines the columns to be displayed.
const colDefs = ref<ColDef[]>([
  {
    field: 'mission',
    rowDrag: true,
  },
  {
    field: 'company',
    cellRenderer: CompanyLogoRenderer,
  },
  { field: 'location' },
  { field: 'date' },
  {
    field: 'price',
  },
  { field: 'successful' },
  { field: 'rocket', filter: true },
])
const { width } = useWindowSize()
const colDefsComputed = computed(() => {
  if (width.value < 640) {
    return [
      {
        field: 'mission',
        rowDrag: true,
      },
      {
        field: 'price',
      },
    ]
  } else {
    return [
      {
        field: 'mission',
        rowDrag: true,
      },
      {
        field: 'company',
        cellRenderer: CompanyLogoRenderer,
      },
      { field: 'location' },
      { field: 'date' },
      {
        field: 'price',
      },
      { field: 'successful' },
      { field: 'rocket', filter: true },
    ]
  }
})
const gridApi = shallowRef<GridApi | null>(null)
const onGridReady = (params: GridReadyEvent) => {
  gridApi.value = params.api
  params.api.sizeColumnsToFit()
  const cols = params.api.getColumns()!
  cols.forEach((col) => {
    const colDef = col.getColDef()
    console.log(colDef.headerName + ', Column ID = ' + col.getId(), JSON.stringify(colDef))
  })
}

const getData = async () => {
  try {
    const { data } = await axios.get(
      'https://www.ag-grid.com/example-assets/space-mission-data.json',
    )
    rowData.value = data
  } catch (error) {
    console.log('🚀 ~ getData ~ error:', error)
  }
}
const onCellValueChanged = (event: CellValueChangedEvent) => {
  console.log(`New Cell Value: ${event.value}`)
}

const onSelectionChanged = (event: SelectionChangedEvent) => {
  console.log(`New Cell Value: ${event}`)
}
const rowSelection = ref<RowSelectionOptions>({
  mode: 'multiRow',
  headerCheckbox: false,
})

onMounted(getData)
</script>
