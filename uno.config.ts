import { defineConfig } from 'unocss'
import transformerDirectives from '@unocss/transformer-directives'

export default defineConfig({
  transformers: [transformerDirectives()],
  theme: {
    colors: {
      primary: {
        DEFAULT: 'var(--primary-color)',
        '50': 'var(--primary-color-50)',
        '100': 'var(--primary-color-100)',
        '200': 'var(--primary-color-200)',
        '300': 'var(--primary-color-300)',
        '400': 'var(--primary-color-400)',
        '500': 'var(--primary-color-500)',
        '600': 'var(--primary-color-600)',
        '700': 'var(--primary-color-700)',
        '800': 'var(--primary-color-800)',
        '900': 'var(--primary-color-900)',
      },
    },
  },
})
