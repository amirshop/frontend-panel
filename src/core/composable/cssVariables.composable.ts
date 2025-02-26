import { useCssVar } from '@vueuse/core'
import { ref } from 'vue'
import tinyColor from 'tinycolor2'

export const useCssVariables = () => {
  const primaryColor50 = useCssVar('--primary-color-50')
  const primaryColor100 = useCssVar('--primary-color-100')
  const primaryColor200 = useCssVar('--primary-color-200')
  const primaryColor300 = useCssVar('--primary-color-300')
  const primaryColor400 = useCssVar('--primary-color-400')
  const primaryColor500 = useCssVar('--primary-color-500')
  const primaryColor = useCssVar('--primary-color')
  const primaryColor600 = useCssVar('--primary-color-600')
  const primaryColor700 = useCssVar('--primary-color-700')
  const primaryColor800 = useCssVar('--primary-color-800')
  const primaryColor900 = useCssVar('--primary-color-900')
  const primaryColor950 = useCssVar('--primary-color-950')

  // const primaryFontFamily = useCssVar('--primary-font-family')

  // primaryFontFamily.value = 'Poppins'

  primaryColor50.value = '#edf8ff'
  primaryColor100.value = '#d7edff'
  primaryColor200.value = '#b9e1ff'
  primaryColor300.value = '#88d0ff'
  primaryColor400.value = '#50b5ff'
  primaryColor500.value = '#2893ff'
  primaryColor.value = '#2893ff'
  primaryColor600.value = '#1677ff'
  primaryColor700.value = '#0a5ceb'
  primaryColor800.value = '#0f4abe'
  primaryColor900.value = '#134295'
  primaryColor950.value = '#112a5a'

  const setColor = (mode: 'dark' | 'light', present: number) => {
    if (mode === 'light') {
      return tinyColor(primaryColor500.value).lighten(present).toHexString()
    }
    if (mode === 'dark') {
      return tinyColor(primaryColor500.value).darken(present).toHexString()
    }
  }
  const previousColor = ref('')

  const updateColors = (newColor: string) => {
    if (!primaryColor || newColor === previousColor.value) return
    primaryColor.value = newColor
    primaryColor500.value = newColor
    primaryColor50.value = setColor('light', 25)
    primaryColor100.value = setColor('light', 20)
    primaryColor200.value = setColor('light', 15)
    primaryColor300.value = setColor('light', 10)
    primaryColor400.value = setColor('light', 5)
    primaryColor600.value = setColor('dark', 5)
    primaryColor700.value = setColor('dark', 10)
    primaryColor800.value = setColor('dark', 15)
    primaryColor900.value = setColor('dark', 20)
    primaryColor950.value = setColor('dark', 25)
  }

  return { primaryColor, primaryColor500, updateColors }
}
