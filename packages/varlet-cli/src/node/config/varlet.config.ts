import fse from 'fs-extra'
import { mergeWith } from 'lodash-es'
import { VARLET_CONFIG, SITE_CONFIG } from '../shared/constant.js'
import { outputFileSyncOnChange } from '../shared/fsUtils.js'
import { isArray } from '@varlet/shared'
import { pathToFileURL } from 'url'
import { type CopyOptions } from '@varlet/vite-plugins'

const { pathExistsSync, statSync } = fse

export interface VarletConfigIcons {
  /**
   * @default `varlet-icons`
   * Font name.
   */
  name?: string
  /**
   * @default `var-icon`
   * Font name prefix.
   */
  namespace?: string
  /**
   * @default `true`
   * Output base64
   */
  base64?: boolean
  /**
   * @default `./svg`
   * SVG icons folder path.
   */
  entry?: string
  /**
   * @default `./dist`
   * SVG icons folder path.
   */
  output?: string
  /**
   * @default true
   * Whether to generate png
   */
  genPng?: boolean
  publicPath?: string
  fontFamilyClassName?: string
  fontWeight?: string
  fontStyle?: string
}

export interface VarletConfigEsbuild {
  target?: string | string[]
}

export interface VarletConfig {
  /**
   * @default `Varlet`
   * UI library name.
   */
  name?: string
  /**
   * @default `var`
   * Component name prefix
   */
  namespace?: string
  /**
   * @default `localhost`
   * Local dev server host
   */
  host?: string
  /**
   * @default `8080`
   * Local dev server port
   */
  port?: number
  title?: string
  logo?: string
  themeKey?: string
  defaultLanguage?: 'zh-CN' | 'en-US'
  /**
   * @default `false`
   * Show mobile component on the right.
   */
  useMobile?: boolean
  lightTheme?: Record<string, string>
  darkTheme?: Record<string, string>
  highlight?: { style: string }
  analysis?: { baidu: string }
  pc?: Record<string, any>
  mobile?: Record<string, any>
  copy?: CopyOptions['paths']
  icons?: VarletConfigIcons
  esbuild?: VarletConfigEsbuild
  /**
   * @default `[]`
   * Directive folder name for component library.
   */
  directives?: string[]
}

export function defineConfig(config: VarletConfig) {
  return config
}

export function mergeStrategy(value: any, srcValue: any, key: string) {
  const keys = ['features', 'members']

  if (keys.includes(key) && isArray(srcValue)) {
    return srcValue
  }
}

export async function getVarletConfig(emit = false): Promise<Required<VarletConfig>> {
  const defaultConfig = (await import('./varlet.default.config.js')).default
  const config: any = pathExistsSync(VARLET_CONFIG)
    ? (await import(`${pathToFileURL(VARLET_CONFIG).href}?_t=${statSync(VARLET_CONFIG).mtimeMs}`)).default
    : {}
  const mergedConfig = mergeWith(defaultConfig, config, mergeStrategy)

  if (emit) {
    const source = JSON.stringify(mergedConfig, null, 2)
    outputFileSyncOnChange(SITE_CONFIG, source)
  }

  return mergedConfig
}
