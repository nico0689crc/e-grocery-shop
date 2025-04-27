import primaryColorConfig from './primaryColorConfig'
import type { Config } from './types'

export const themeConfig: Config = {
  primaryColor: primaryColorConfig[0].main,
  templateName: 'E-Grocery Shop',
  homePageUrl: '/',
  settingsCookieName: 'e-grocery-shop-settings',
  mode: 'light', // 'light', 'dark', 'system'
  layoutPadding: 24, // Common padding for header, content, footer layout components (in px)
  toastPosition: 'top-right' // 'top-right', 'top-center', 'top-left', 'bottom-right', 'bottom-center', 'bottom-left'
}
