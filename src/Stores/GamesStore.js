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
import { ReadDir, FindFile } from '@/Utils/FileManager'
import { LoadMetadata, SaveMetadata } from '@/Utils/GameMetadata'

export const useGamesStore = defineStore('GamesStore', {
  /**
   * Store state
   */
  state: () => ({
    /** @type {Array} Array of discovered games */
    games: [],
    /** @type {Object|null} Game object selected for metadata editing */
    game_to_edit: null,
  }),
  getters: {
    games_path: () => SettingsStore.games_path || null,
    games_extensions: () => SettingsStore.games_extensions || null,
    games_exclusions: () => SettingsStore.games_exclusions || null,

    games_sorted: (state) => state.games.sort((a, b) => a.name.localeCompare(b.name)),
  },

  actions: {
    /**
     * Create metadata for a game that doesn't have metadata.json
     * @param {Object} game - Game object with path and name properties
     * @returns {Promise<Object|null>} Created metadata object or null if no files found
     */
    async createMetadata(game) {
      if (!game || !game.path || !game.name) {
        return null
      }

      // Check if game path has at least one file (non-recursive)
      const firstLevelFiles = await FindFile({
        path: game.path,
        extensions: this.games_extensions,
        exclusions: this.games_exclusions,
        recursive: false,
      })

      // If no files found, return null (skip this game)
      if (firstLevelFiles.length === 0) {
        return null
      }

      // Get all files recursively
      const allFiles = await FindFile({
        path: game.path,
        extensions: this.games_extensions,
        exclusions: this.games_exclusions,
        recursive: true,
      })

      // Create metadata object
      const metadata = {
        id: Math.random().toString(36).substring(2, 9),
        name: game.name,
        path: game.path,
        actions: {
          default: firstLevelFiles.length === 1 ? firstLevelFiles[0] : null,
          others: [...firstLevelFiles, ...allFiles],
        },
      }

      // Save metadata
      await SaveMetadata(metadata)

      // Return created metadata
      return metadata
    },

    async LoadGames() {
      this.games = []
      const dir_options = { path: this.games_path }
      const games_dirs = await ReadDir(dir_options)

      const gamePromises = games_dirs.map(async (game_dir) => {
        const gamePath = `${this.games_path}/${game_dir}`

        // Check if metadata.json exists
        const tempGame = { name: game_dir, path: gamePath }
        const metadata = await LoadMetadata(tempGame)

        // If metadata is empty (file doesn't exist), try to create it
        if (!metadata || Object.keys(metadata).length === 0) {
          const createdMetadata = await this.createMetadata(tempGame)
          // If createMetadata returns null (no files found), skip this game
          if (!createdMetadata) {
            return null
          }
          // Return created metadata as game object
          return createdMetadata
        }

        // Return metadata as game object
        return metadata
      })

      const results = await Promise.all(gamePromises)
      this.games = results.filter((game) => game !== null)
    },

    async SaveGameMetadata(game) {
      if (!game || !game.path) return false

      try {
        await SaveMetadata(game)

        const index = this.games.findIndex((g) => g.id === game.id)
        if (index === -1) return false

        // Update game object in games array
        this.games[index] = game

        return true
      } catch (error) {
        console.error('Error saving game metadata:', error)
        return false
      }
    },
  },
})
