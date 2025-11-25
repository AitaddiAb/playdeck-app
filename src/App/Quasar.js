/**
 * Quasar UI Framework Plugin
 *
 * Configures and registers Quasar UI components and plugins.
 * Note: Icon set can be configured by importing and setting it in the Quasar config.
 *
 * @module Quasar
 */

import { Quasar, Notify, Loading, LoadingBar } from 'quasar'

/**
 * Quasar plugins to enable
 * - Notify: Toast notifications
 * - Loading: Loading overlay/spinner
 * - LoadingBar: Progress bar at top of page
 */
const plugins = { Notify, Loading, LoadingBar }

/**
 * Vue plugin for Quasar
 * Installs Quasar with configured plugins and icon set
 */
const quasar = {
  /**
   * Install plugin - registers Quasar with Vue
   * @param {Object} app - Vue app instance
   */
  install(app) {
    app.use(Quasar, { plugins, config: { dark: true } })
  },
}

export default quasar
