import { computed } from 'vue'
import type { ComputedRef } from 'vue'
import { ComponentsSizesEnum } from '@/core/enums'
import { usePanelSettingsStore } from '@/core/stores/panelSettings.store'
export const useComputedClass = () => {
  const panelSettingsStore = usePanelSettingsStore()

  const getClass = ({
    s = '',
    m = '',
    l = '',
    sC = '',
    mC = '',
    lC = '',
  }: {
    s?: string
    m?: string
    l?: string
    sC?: string
    mC?: string
    lC?: string
  }): ComputedRef<string> => {
    return computed(() => {
      const { isCompact, componentsSize } = panelSettingsStore.settingList

      const classesMapping: Record<string, Record<ComponentsSizesEnum, string>> = {
        true: {
          [ComponentsSizesEnum.LARGE]: lC,
          [ComponentsSizesEnum.MIDDLE]: mC,
          [ComponentsSizesEnum.SMALL]: sC,
        },
        false: {
          [ComponentsSizesEnum.LARGE]: l,
          [ComponentsSizesEnum.MIDDLE]: m,
          [ComponentsSizesEnum.SMALL]: s,
        },
      }

      return classesMapping[isCompact ? 'true' : 'false'][componentsSize] || m
    })
  }

  return { getClass }
}
