import { ref, computed } from 'vue'

type PaginationOptions = {
  total: number // تعداد کل آیتم‌ها
  pageSize: number // تعداد آیتم‌ها در هر صفحه
  currentPage: number // صفحه فعلی
  onChange: (page: number, pageSize: number) => void // هندلر تغییر صفحه
}

export function usePagination({ total, pageSize, currentPage, onChange }: PaginationOptions) {
  const current = ref(currentPage) // صفحه فعلی
  const size = ref(pageSize) // تعداد آیتم‌ها در هر صفحه

  // محاسبه تعداد کل صفحات
  const totalPages = computed(() => Math.ceil(total / size.value))

  // تغییر صفحه
  const changePage = (page: number) => {
    current.value = page
    onChange(page, size.value) // فراخوانی هندلر تغییر صفحه
  }

  // تغییر تعداد آیتم‌ها در هر صفحه
  const changePageSize = (newPageSize: number) => {
    size.value = newPageSize
    current.value = 1 // پس از تغییر تعداد آیتم‌ها به صفحه اول برگردد
    onChange(current.value, size.value)
  }

  return {
    current,
    size,
    totalPages,
    changePage,
    changePageSize,
  }
}
