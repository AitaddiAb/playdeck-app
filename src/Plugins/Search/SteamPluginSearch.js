/**
 * Steam Search Plugin
 *
 * Provides search functionality for Steam Store.
 * Uses Internal Steam Web API (/api/storesearch) for searching games.
 *
 * @module SteamPluginSearch
 */

import { fetch } from '@tauri-apps/plugin-http'

/** @constant {string} Steam Store Search API endpoint */
const STEAM_STORE_SEARCH_API = 'https://store.steampowered.com/api/storesearch'

/**
 * Search for games on Steam Store using Internal Steam Web API
 * @param {Object} params - Search parameters
 * @param {string} params.query - Game name to search for
 * @param {string} [params.lang] - Language code (default: 'english')
 * @param {string} [params.cc] - Country code (default: 'US')
 * @returns {Promise<Array>} Array of game search results with id, name, thumbnail
 * @throws {Error} If query is empty or search fails
 */
export const load = async ({ query, lang = 'english', cc = 'US' }) => {
  // Validate query
  if (!query || !query.trim()) throw new Error('Query is required and cannot be empty')

  // Build URL
  const url = new URL(STEAM_STORE_SEARCH_API)
  url.searchParams.set('term', query.trim())
  url.searchParams.set('l', lang || 'english')
  url.searchParams.set('cc', cc || 'US')

  // Fetch data
  const response = await fetch(url.toString(), { method: 'GET' })

  // Handle error
  if (!response.ok) throw { message: 'Steam API request failed', response }

  // Parse response
  const data = await response.json()

  // Validate response
  if (!data || !Array.isArray(data.items)) throw new Error('Invalid response format from Steam API')

  // Filter for apps only and limit to 10 results
  const games = data.items.filter((game) => game.type === 'app').slice(0, 10)

  // Map games to expected format
  return games.map((game) => ({
    id: game.id.toString(),
    name: game.name || '',
    thumbnail: game.tiny_image || null,
  }))
}
