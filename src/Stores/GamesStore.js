/**
 * Games Store
 *
 * Manages game discovery and launching.
 * Uses SettingsStore to get the games folder path and exclusion patterns.
 *
 * @module GamesStore
 */

import { defineStore } from 'pinia'
import { SettingsStore } from '@/App/Store'
import { FindFile, ReadDir } from '@/Utils/FileManager'

export const useGamesStore = defineStore('GamesStore', {
  /**
   * Store state
   */
  state: () => ({
    /** @type {Array} Array of discovered games */
    games: [],
  }),
  getters: {
    games_path: () => SettingsStore.games_path || null,
    games_extensions: () => SettingsStore.games_extensions || null,
    games_exclusions: () => SettingsStore.games_exclusions || null,

    games_sorted: (state) => state.games.sort((a, b) => a.name.localeCompare(b.name)),
  },

  actions: {
    /**
     * Sort game files into executables and sub_executables
     * @private
     * @param {Array<string>} gameFiles - Array of relative file paths
     * @returns {Object} Object with sorted executables and sub_executables
     */
    _sortGameFiles(gameFiles) {
      // Separate first-level executables (no path separators) from sub-level executables
      const executables = []
      const sub_executables = []

      gameFiles.forEach((file) => {
        // Check if file is in a subdirectory (contains path separator)
        if (file.includes('/') || file.includes('\\')) {
          sub_executables.push(file)
        } else {
          executables.push(file)
        }
      })

      // Sort both arrays alphabetically
      return {
        executables: executables.sort((a, b) => a.localeCompare(b)),
        sub_executables: sub_executables.sort((a, b) => a.localeCompare(b)),
      }
    },

    /**
     * Load games from the saved folder path
     */
    async LoadGames() {
      this.games = []
      const dir_options = { path: this.games_path }
      const games_dirs = await ReadDir(dir_options)

      games_dirs.forEach(async (game_dir) => {
        const file_options = {
          path: `${this.games_path}/${game_dir}`,
          extensions: this.games_extensions,
          exclusions: this.games_exclusions,
          recursive: true,
        }
        const game_files = await FindFile(file_options)
        if (game_files.length > 0) {
          const game = {
            id: Math.random().toString(36).substring(2, 9), // Random 8 character string
            name: game_dir,
            path: `${this.games_path}/${game_dir}`,
            ...this._sortGameFiles(game_files), // {executables, sub_executables}
          }
          this.games.push(game)
        }
      })
    },
  },
})
