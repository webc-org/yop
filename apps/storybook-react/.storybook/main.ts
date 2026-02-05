import type { StorybookConfig } from '@storybook/react-vite'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const reactPackagePath = path.resolve(__dirname, '../../../packages/react')
const stylesPackagePath = path.resolve(__dirname, '../../../packages/styles')

const config: StorybookConfig = {
  stories: [
    '../../../packages/react/src/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: ['@storybook/addon-docs'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  viteFinal: async (config) => {
    config.base = process.env.CI ? '/yop/' : '/'
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve?.alias,
        components: path.resolve(reactPackagePath, 'src/components'),
        sections: path.resolve(reactPackagePath, 'src/components/sections'),
        modules: path.resolve(reactPackagePath, 'src/components/modules'),
        form: path.resolve(reactPackagePath, 'src/components/form'),
        base: path.resolve(reactPackagePath, 'src/components/base'),
        styles: path.resolve(stylesPackagePath, 'styles'),
        types: path.resolve(reactPackagePath, 'src/types'),
        i18n: path.resolve(reactPackagePath, 'src/i18n'),
        utils: path.resolve(reactPackagePath, 'src/utils'),
      },
    }
    return config
  },
  staticDirs: ['../../../brand/img'],
}

export default config
