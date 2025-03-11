<template>
  <Card>
    <AgGridVue
      style="width: 100%; height: 80vh"
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
import {AG_GRID_LOCALE_IR} from "@/utils/fa-IR";

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
const AG_GRID_LOCALE_FA = {
  true: 'انتخاب شده',
  false: 'انتخاب نشده',
  pageSize: 'ddd',
  selectAll: '(انتخاب همه)',
  selectAllSearchResults: '(انتخاب همه نتایج جستجو)',
  searchOoo: 'جستجو...',
  blank: 'خالی',
  notBlank: 'پُر',
  blanks: '(جای خالی)',
  noMatches: 'بدون منطبق',
  filterOoo: 'فیلتر...',
  equals: 'برابر',
  notEqual: 'نه برابر',
  empty: 'یکی را انتخاب کن',
  lessThan: 'کمتر از',
  greaterThan: 'بزرگتر از',
  lessThanOrEqual: 'کمتر یا مساوی',
  greaterThanOrEqual: 'بزرگتر یا مساوی',
  inRange: 'در محدوده',
  inRangeStart: 'به',
  inRangeEnd: 'از',
  contains: 'حاوی',
  notContains: 'شامل نشود',
  startsWith: 'شروع با',
  endsWith: 'مختوم به',
  dateFormatOoo: 'yyyy-mm-dd',
  andCondition: 'و',
  orCondition: 'یا',
  applyFilter: 'اعمال',
  resetFilter: 'بازنشانی',
  clearFilter: 'پاک کردن',
  cancelFilter: 'لغو',
  textFilter: 'فیلتر متن',
  numberFilter: 'فیلتر عدد',
  dateFilter: 'فیلتر تاریخ',
  setFilter: 'تنظیم فیلتر',
  columns: 'ستون ها',
  filters: 'فیلترها',
  pivotMode: 'حالت محوری',
  groups: 'گروه های ردیف',
  rowGroupColumnsEmptyMessage: 'برای تنظیم گروه های ردیف اینجا را بکشید',
  values: 'ارزش ها',
  valueColumnsEmptyMessage: 'برای جمع آوری اینجا را بکشید',
  pivots: 'برچسب های ستون',
  pivotColumnsEmptyMessage: 'برای تنظیم برچسب های ستون به اینجا بکشید',
  group: 'گروه',
  loadingOoo: 'در حال بارگیری...',
  noRowsToShow: 'هیچ ردیفی برای نمایش وجود ندارد',
  enabled: 'فعال',
  pinColumn: 'سنجاق کردن ستون',
  pinLeft: 'سنجاق کردن به چپ',
  pinRight: 'سنجاق کردن به راست',
  noPin: 'بدون پین',
  valueAggregation: 'تجمیع مقادیر',
  autosizeThiscolumn: 'اندازه خودکار این ستون',
  autosizeAllColumns: 'اندازه خودکار همه ستون‌ها',
  groupBy: 'گروه‌بندی بر اساس',
  ungroupBy: 'لغو گروه بندی بر اساس',
  resetColumns: 'بازنشانی ستون ها',
  expandAll: 'گسترش همه',
  collapseAll: 'بستن همه',
  copy: 'کپی',
  ctrlC: 'Ctrl+C',
  copyWithHeaders: 'کپی با سر ستون',
  paste: 'چسباندن',
  ctrlV: 'Ctrl+V',
  export: 'خروجی',
  csvExport: 'CSV خروجی',
  excelExport: 'خروجی اکسل (.xlsx)',
  excelXmlExport: 'خروجی اکسل (.xml)',
  sum: 'جمع',
  min: 'دقیقه',
  max: 'حداکثر',
  none: 'هیچ',
  count: 'شمار',
  avg: 'متوسط',
  filteredRows: 'فیلتر شده',
  selectedRows: 'انتخاب شده',
  totalRows: 'همه ردیف ها',
  totalAndFilteredRows: 'ردیف',
  more: 'بیشتر',
  to: 'به',
  of: 'از',
  page: 'صفحه',
  nextPage: 'صفحه بعدی',
  lastPage: 'آخرین صفحه',
  firstPage: 'صفحه اول',
  previousPage: 'صفحه قبلی',
  pivotChartAndPivotMode: 'نمودار محوری و حالت محوری',
  pivotChart: 'نمودار محوری',
  chartRange: 'محدوده نمودار',
  columnChart: 'ستونی',
  groupedColumn: 'گروه بندی شده',
  stackedBarColumn: 'انباشته شده',
  normalizedColumn: '100% انباشته شده',
  barChart: 'میله ای',
  groupedBar: 'گروه بندی شده ',
  stackedBar: 'انباشته شده',
  normalizedBar: '100% انباشته شده',
  pieChart: 'پای',
  pie: 'پای',
  doughnut: 'دونات',
  line: 'خط',
  xyChart: 'XY (اسکتر)',
  scatter: 'اسکتر',
  bubble: 'حباب',
  areaChart: 'منطقه',
  area: 'منطقه',
  stackedArea: 'انباشته شده',
  normalizedArea: '100% انباشته شده',
  histogramChart: 'هیستوگرام',
  pivotChartTitle: 'نمودار محوری',
  rangeChartTitle: 'نمودار محدوده',
  settings: 'تنظیمات',
  data: 'داده',
  format: 'فرمت',
  categories: 'دسته ها',
  defaultCategory: '(هیچ)',
  series: 'سریال',
  xyValues: 'XY مقادیر',
  paired: 'حالت جفت',
  axis: 'محور',
  navigator: 'هدایتگر',
  color: 'رنگ',
  thickness: 'ضخامت',
  xType: 'نوع X',
  automatic: 'اتوماتیک',
  category: 'دسته',
  number: 'شماره',
  time: 'زمان',
  xRotation: 'X چرخش',
  yRotation: 'Y چرخش',
  ticks: 'کنه',
  width: 'عرض',
  height: 'ارتفاع',
  length: 'طول',
  padding: 'فاصله',
  spacing: 'فاصله گذاری',
  chart: 'نمودار',
  title: 'عنوان',
  titlePlaceholder: 'عنوان نمودار - برای ویرایش دوبار کلیک کنید',
  background: 'پس زمینه',
  font: 'فونت',
  top: 'بالا',
  right: 'درست',
  bottom: 'پایین',
  left: 'چپ',
  labels: 'برچسب ها',
  size: 'اندازه',
  minSize: 'حداقل اندازه',
  maxSize: 'حداکثر اندازه',
  legend: 'افسانه',
  position: 'مقام',
  markerSize: 'اندازه نشانگر',
  markerStroke: 'حرکت نشانگر',
  markerPadding: 'پدینگ نشانگر',
  itemSpacing: 'فاصله مورد',
  itemPaddingX: 'پدینگ ایتم X',
  itemPaddingY: 'پدینگ ایتم Y',
  layoutHorizontalSpacing: 'فاصله افقی',
  layoutVerticalSpacing: 'فاصله عمودی',
  strokeWidth: 'عرض ضربه',
  offset: 'افست',
  offsets: 'افست ها',
  tooltips: 'نکات ابزار',
  callout: 'فراخوانی',
  markers: 'نشانگرها',
  shadow: 'سایه',
  blur: 'تار',
  xOffset: 'X افست',
  yOffset: 'Y افست',
  lineWidth: 'عرض خط',
  normal: 'عادی',
  bold: 'پررنگ',
  italic: 'مورب',
  boldItalic: 'پررنگ مورب',
  predefined: 'از پیش تعریف شده',
  fillOpacity: 'تاری انباشته',
  strokeOpacity: 'تاری خط',
  histogramBinCount: 'تعداد جعبه',
  columnGroup: 'ستون',
  barGroup: 'میله',
  pieGroup: 'پای',
  lineGroup: 'خط',
  scatterGroup: 'XY (اسکتر)',
  areaGroup: 'منطقه',
  histogramGroup: 'هیستوگرام',
  groupedColumnTooltip: 'گروه بندی شده',
  stackedColumnTooltip: 'انباشته شده',
  normalizedColumnTooltip: '100% انباشته شده',
  groupedBarTooltip: 'گروه بندی شده',
  stackedBarTooltip: 'انباشته شده',
  normalizedBarTooltip: '100% انباشته شده',
  pieTooltip: 'پای',
  doughnutTooltip: 'دونات',
  lineTooltip: 'Line',
  groupedAreaTooltip: 'Area',
  stackedAreaTooltip: 'انباشته شده',
  normalizedAreaTooltip: '100% انباشته شده',
  scatterTooltip: 'اسکتر',
  bubbleTooltip: 'حباب',
  histogramTooltip: 'هیستوگرام',
  noDataToChart: 'داده ای برای ترسیم در دسترس نیست.',
  pivotChartRequiresPivotMode: 'نمودار محوری نیاز به فعال کردن حالت محوری دارد.',
  chartSettingsToolbarTooltip: 'منو',
  chartLinkToolbarTooltip: 'پیوند با جدول',
  chartUnlinkToolbarTooltip: 'لغو پیوند از جدول',
  chartDownloadToolbarTooltip: 'دانلود نمودار',
  ariaHidden: 'پنهان',
  ariaVisible: 'مرئی',
  ariaChecked: 'بررسی',
  ariaUnchecked: 'چک نشده',
  ariaIndeterminate: 'نامعین',
  ariaColumnSelectAll: 'تغییر وضعیت انتخاب همه ستون ها',
  ariaInputEditor: 'ویرایشگر ورودی',
  ariaDateFilterInput: 'ورودی فیلتر تاریخ',
  ariaFilterInput: 'ورودی فیلتر',
  ariaFilterColumnsInput: 'ورودی ستون های فیلتر',
  ariaFilterValue: 'مقدار فیلتر',
  ariaFilterFromValue: 'فیلتر از مقدار',
  ariaFilterToValue: 'فیلتر به مقدار',
  ariaFilteringOperator: 'اپراتور فیلتر کردن',
  ariaColumnToggleVisibility: 'نمایش تغییر ستون',
  ariaColumnGroupToggleVisibility: 'تغییر نمای گروه ستون',
  ariaRowSelect: 'برای انتخاب این ردیف SPACE را فشار دهید',
  ariaRowDeselect: 'برای لغو انتخاب این سطر, SPACE را فشار دهید',
  ariaRowToggleSelection: 'برای جابجایی انتخاب ردیف, Space را فشار دهید',
  ariaRowSelectAll: 'برای جابجایی انتخاب همه ردیف ها, Space را فشار دهید',
  ariaSearch: 'جستجو',
  ariaSearchFilterValues: 'مقادیر فیلتر جستجو',
}
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
