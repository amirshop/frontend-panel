import { computed } from 'vue'
import type { ComputedRef } from 'vue'
import { ComponentSizeEnum } from '@/core/enums'
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
      const { isCompact, componentSize } = panelSettingsStore.settings

      const classesMapping: Record<string, Record<ComponentSizeEnum, string>> = {
        true: {
          [ComponentSizeEnum.LARGE]: lC,
          [ComponentSizeEnum.MIDDLE]: mC,
          [ComponentSizeEnum.SMALL]: sC,
        },
        false: {
          [ComponentSizeEnum.LARGE]: l,
          [ComponentSizeEnum.MIDDLE]: m,
          [ComponentSizeEnum.SMALL]: s,
        },
      }

      return classesMapping[isCompact ? 'true' : 'false'][componentSize] || m
    })
  }

  return { getClass }
}
