import { useCssVar } from '@vueuse/core'
import { ref } from 'vue'
import tinyColor from 'tinycolor2'

export const useCssVariables = () => {
  const primaryColor50 = useCssVar('--primary-color-50')
  const primaryColor100 = useCssVar('--primary-color-100')
  const primaryColor200 = useCssVar('--primary-color-200')
  const primaryColor300 = useCssVar('--primary-color-300')
  const primaryColor400 = useCssVar('--primary-color-400')
  const primaryColor = useCssVar('--primary-color')
  const primaryColor600 = useCssVar('--primary-color-600')
  const primaryColor700 = useCssVar('--primary-color-700')
  const primaryColor800 = useCssVar('--primary-color-800')
  const primaryColor900 = useCssVar('--primary-color-900')

  const fontFamily = useCssVar('--font-family')

  fontFamily.value = 'Poppins'

  primaryColor50.value = '#EBF3FE'
  primaryColor100.value = '#D8E6FD'
  primaryColor200.value = '#B1CEFB'
  primaryColor300.value = '#8AB5FA'
  primaryColor400.value = '#639CF8'
  primaryColor.value = '#3B82F6'
  primaryColor600.value = '#0B60EA'
  primaryColor700.value = '#0848B0'
  primaryColor800.value = '#053075'
  primaryColor900.value = '#03183B'

  const setColor = (mode: 'dark' | 'light', present: number) => {
    if (mode === 'light') {
      return tinyColor(primaryColor.value).lighten(present).toHexString()
    }
    if (mode === 'dark') {
      return tinyColor(primaryColor.value).darken(present).toHexString()
    }
  }
  const previousColor = ref('')

  const updateColors = () => {
    if (!primaryColor.value || primaryColor.value === previousColor.value) return
    previousColor.value = primaryColor.value
    primaryColor50.value = setColor('light', 25)
    primaryColor100.value = setColor('light', 20)
    primaryColor200.value = setColor('light', 15)
    primaryColor300.value = setColor('light', 10)
    primaryColor400.value = setColor('light', 5)
    primaryColor600.value = setColor('dark', 5)
    primaryColor700.value = setColor('dark', 10)
    primaryColor800.value = setColor('dark', 15)
    primaryColor900.value = setColor('dark', 20)
  }

  return { primaryColor, fontFamily, updateColors }
}
