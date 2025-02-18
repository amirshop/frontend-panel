import { defineConfig, presetAttributify, presetUno } from 'unocss'
import transformerDirectives from '@unocss/transformer-directives'
import { ColorsEnum, FontFamilyEnum } from './src/core/enums'

export default defineConfig({
  transformers: [transformerDirectives()],
  presets: [presetUno(), presetAttributify()],
  theme: {
    fontFamily: {
      body: [FontFamilyEnum.PRIMARY],
    },
    colors: {
      primary: ColorsEnum.PRIMARY,
    },
    extend: {},
  },
})
