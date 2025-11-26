/**
 * Settings Store
 *
 * Manages application settings including games folder path,
 * card width, and exclusion patterns.
 *
 * @module SettingsStore
 */

// Example exclusion patterns: '**Crash**,**PrereqSetup**,**vc_redist**,*Process**'

import { defineStore } from 'pinia'

export const useSettingsStore = defineStore('SettingsStore', {
  /**
   * Store state
   */
  state: () => ({
    /** @type {string|null} Games folder path */
    games_path: localStorage.getItem('playdeck_games_path') || '',

    /** @type {string|null} Games extensions */
    games_extensions: localStorage.getItem('playdeck_games_extensions') || '',

    /** @type {string} Exclusion patterns separated by commas */
    games_exclusions: localStorage.getItem('playdeck_games_exclusions') || '',

    /** @type {number} Card width in pixels (200-300, step 10) */
    ui_card_width: +localStorage.getItem('playdeck_ui_card_width') || 200,
  }),

  actions: {
    /**
     * Save settings to localStorage
     */
    SaveSettings(callback = () => {}) {
      // Save games folder path
      localStorage.setItem('playdeck_games_path', this.games_path)

      // Save games extensions
      localStorage.setItem('playdeck_games_extensions', this.games_extensions)

      // Save exclusion patterns
      localStorage.setItem('playdeck_games_exclusions', this.games_exclusions)

      // Save card width
      localStorage.setItem('playdeck_ui_card_width', this.ui_card_width)

      callback()
    },
  },
})
