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
const Platform = isTauri() ? type() : 'browser'

/**
 * Platform object to be injected as global property
 */
const $a = { Platform }

/**
 * Vue plugin for platform detection
 * Makes platform available in all components via this.$a.Platform
 */
const platform_install = {
  /**
   * Install plugin - registers global properties
   * @param {Object} app - Vue app instance
   */
  install(app) {
    app.config.globalProperties.$a = $a
  },
}

export default platform_install
export { Platform }
