import { computed } from 'vue'
import type { ComputedRef } from 'vue'
import { ComponentSizeEnum } from '@/core/enums'
import { usePanelSettingsStore } from '@/core/stores/panelSettings.store'
export const useComputedClass = () => {
  const panelSettingsStore = usePanelSettingsStore()

  const getClass = ({
    sm = '',
    md = '',
    lg = '',
    smC = '',
    mdC = '',
    lgC = '',
  }: {
    sm?: string
    md?: string
    lg?: string
    smC?: string
    mdC?: string
    lgC?: string
  }): ComputedRef<string> => {
    return computed(() => {
      const { isCompact, componentSize } = panelSettingsStore.settings

      const classesMapping: Record<string, Record<ComponentSizeEnum, string>> = {
        true: {
          [ComponentSizeEnum.LARGE]: lgC,
          [ComponentSizeEnum.MIDDLE]: mdC,
          [ComponentSizeEnum.SMALL]: smC,
        },
        false: {
          [ComponentSizeEnum.LARGE]: lg,
          [ComponentSizeEnum.MIDDLE]: md,
          [ComponentSizeEnum.SMALL]: sm,
        },
      }

      return classesMapping[isCompact ? 'true' : 'false'][componentSize] || md
    })
  }

  return { getClass }
}
