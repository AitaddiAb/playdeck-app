/**
 * Store Initialization
 *
 * Centralizes all Pinia store instances and exports them for use throughout the application.
 * All stores are initialized here to ensure they share the same Pinia instance.
 *
 * @module Store
 */

import { createPinia } from 'pinia'
import { useSettingsStore } from '@/Stores/SettingsStore.js'
import { useGamesStore } from '@/Stores/GamesStore.js'

/**
 * Create and initialize Pinia instance
 * This instance is shared across all stores
 */
const Store = createPinia()

/**
 * Initialize all store instances
 * These are singleton instances that can be imported and used throughout the app
 */

/** @type {Object} Settings store - Manages application settings */
export const SettingsStore = useSettingsStore(Store)
/** @type {Object} Games store - Manages game discovery and launching */
export const GamesStore = useGamesStore(Store)

/**
 * Export Pinia instance for Vue app registration
 * @default
 */
export default Store
