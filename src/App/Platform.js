/**
 * Platform Detection Plugin
 *
 * Detects the current platform (Tauri desktop app or browser).
 * Provides platform information as a global Vue property.
 *
 * @module Platform
 */

import { isTauri } from '@tauri-apps/api/core'
import { type } from '@tauri-apps/plugin-os'

/**
 * Detect current platform
 * Returns OS type if running in Tauri, otherwise 'browser'
 * @type {string}
 */
export const Platform = isTauri() ? type() : 'browser'

/**
 * Check if current platform is desktop
 * @type {boolean}
 */
export const isDesktop = ['windows', 'macos', 'linux'].includes(Platform)

/**
 * Check if current platform is mobile
 * @type {boolean}
 */
export const isMobile = ['android', 'ios'].includes(Platform)

/**
 * Check if current platform is macOS
 * @type {boolean}
 */
export const isMacOS = Platform === 'macos'
/**
 * Check if current platform is Windows
 * @type {boolean}
 */
export const isWindows = Platform === 'windows'

/**
 * Check if current platform is Linux
 * @type {boolean}
 */
export const isLinux = Platform === 'linux'

/**
 * Vue plugin for platform detection
 * Makes platform available in all components via this.$a.Platform
 */
export default {
  /**
   * Install plugin - registers global properties
   * @param {Object} app - Vue app instance
   */
  install(app) {
    app.config.globalProperties.$platform = Platform
    app.config.globalProperties.$isDesktop = isDesktop
    app.config.globalProperties.$isMobile = isMobile
    app.config.globalProperties.$isMacOS = isMacOS
    app.config.globalProperties.$isWindows = isWindows
    app.config.globalProperties.$isLinux = isLinux
  },
}

// Filter Tauri callback warnings
if (typeof window !== 'undefined') {
  console._warn = console.warn
  console.warn = (...args) => {
    const message = args.join(' ')
    // Skip Tauri callback warnings
    if (message.includes('[TAURI]') && message.includes("Couldn't find callback id")) {
      if (!console._tauri_hmr_warn) {
        console.debug('[tauri] Some async operations lost callback IDs.')
        console._tauri_hmr_warn = true
      }
    } else console._warn(...args)
  }
}
