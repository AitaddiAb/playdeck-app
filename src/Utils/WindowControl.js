/**
 * Window Control Utility
 *
 * Provides a simplified API for controlling the application window.
 * Only works on desktop platforms (Windows, macOS, Linux).
 *
 * @module WindowControl
 */

import { isDesktop } from '@/App/Platform'
import { getCurrentWindow } from '@tauri-apps/api/window'

/**
 * Application Window Control Object
 * Provides methods to control the window (minimize, maximize, close, fullscreen)
 *
 * @example
 * ```javascript
 * import { WindowControl } from '@/Utils/WindowControl'
 *
 * // In a Vue component
 * WindowControl.minimize()
 * WindowControl.maximize()
 * WindowControl.toggleMaximize()
 * WindowControl.close()
 * WindowControl.toggleFullscreen()
 * ```
 */
export const WindowControl = {
  /**
   * Minimize the window
   * @returns {Promise<void>}
   */
  async minimize() {
    if (!isDesktop) {
      return
    }
    try {
      const appWindow = getCurrentWindow()
      await appWindow.minimize()
    } catch (error) {
      console.error('Failed to minimize window:', error)
    }
  },

  /**
   * Maximize the window
   * @returns {Promise<void>}
   */
  async maximize() {
    if (!isDesktop) {
      return
    }
    try {
      const appWindow = getCurrentWindow()
      await appWindow.maximize()
    } catch (error) {
      console.error('Failed to maximize window:', error)
    }
  },

  /**
   * Unmaximize the window
   * @returns {Promise<void>}
   */
  async unmaximize() {
    if (!isDesktop) {
      return
    }
    try {
      const appWindow = getCurrentWindow()
      await appWindow.unmaximize()
    } catch (error) {
      console.error('Failed to unmaximize window:', error)
    }
  },

  /**
   * Toggle maximize/unmaximize the window
   * @returns {Promise<void>}
   */
  async toggleMaximize() {
    if (!isDesktop) {
      return
    }
    try {
      const appWindow = getCurrentWindow()
      await appWindow.toggleMaximize()
    } catch (error) {
      console.error('Failed to toggle maximize window:', error)
    }
  },

  /**
   * Close the window
   * @returns {Promise<void>}
   */
  async close() {
    if (!isDesktop) {
      return
    }
    try {
      const appWindow = getCurrentWindow()
      await appWindow.close()
    } catch (error) {
      console.error('Failed to close window:', error)
    }
  },

  /**
   * Set fullscreen mode
   * @param {boolean} fullscreen - Whether to set fullscreen (true) or exit fullscreen (false)
   * @returns {Promise<void>}
   */
  async setFullscreen(fullscreen) {
    if (!isDesktop) {
      return
    }
    try {
      const appWindow = getCurrentWindow()
      await appWindow.setFullscreen(fullscreen)
    } catch (error) {
      console.error('Failed to set fullscreen:', error)
    }
  },

  /**
   * Toggle fullscreen mode
   * @returns {Promise<void>}
   */
  async toggleFullscreen() {
    if (!isDesktop) {
      return
    }
    try {
      const appWindow = getCurrentWindow()
      const isFullscreen = await appWindow.isFullscreen()
      await appWindow.setFullscreen(!isFullscreen)
    } catch (error) {
      console.error('Failed to toggle fullscreen:', error)
    }
  },

  /**
   * Check if window is maximized
   * @returns {Promise<boolean>}
   */
  async isMaximized() {
    if (!isDesktop) {
      return false
    }
    try {
      const appWindow = getCurrentWindow()
      return await appWindow.isMaximized()
    } catch (error) {
      console.error('Failed to check if window is maximized:', error)
      return false
    }
  },

  /**
   * Check if window is fullscreen
   * @returns {Promise<boolean>}
   */
  async isFullscreen() {
    if (!isDesktop) {
      return false
    }
    try {
      const appWindow = getCurrentWindow()
      return await appWindow.isFullscreen()
    } catch (error) {
      console.error('Failed to check if window is fullscreen:', error)
      return false
    }
  },
}
