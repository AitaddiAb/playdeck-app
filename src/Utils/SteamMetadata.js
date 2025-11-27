/**
 * Steam Metadata Utility
 *
 * Provides functions for searching and fetching game metadata from Steam Store.
 * Uses Internal Steam Web API (/api/storesearch) for search and Steam Store API for detailed metadata.
 *
 * @module SteamMetadata
 */

import { fetch as tauriFetch } from '@tauri-apps/plugin-http'

const STEAM_STORE_SEARCH_API = 'https://store.steampowered.com/api/storesearch'
const STEAM_APP_DETAILS_API = 'https://store.steampowered.com/api/appdetails'

/**
 * Search for games on Steam Store using Internal Steam Web API
 * @param {string} searchTerm - Game name to search for
 * @returns {Promise<Array>} Array of game search results with id, name, release, thumbnail
 */
export const searchSteam = async (searchTerm) => {
  if (!searchTerm || !searchTerm.trim()) {
    return []
  }

  try {
    const url = new URL(STEAM_STORE_SEARCH_API)
    url.searchParams.set('term', searchTerm.trim())
    url.searchParams.set('l', 'english')
    url.searchParams.set('cc', 'US') // Country code is required

    const response = await tauriFetch(url.toString(), { method: 'GET' })

    if (!response.ok) {
      throw new Error(`Steam search failed: ${response.statusText}`)
    }

    const data = await response.json()

    console.log(data)

    if (!data || !Array.isArray(data.items)) {
      return []
    }

    // Filter for apps only and limit to 6 results
    const results = data.items
      .filter((item) => item.type === 'app')
      .slice(0, 6) // Limit to 6 results
      .map((item) => ({
        id: item.id.toString(),
        name: item.name || '',
        release: '', // storesearch doesn't provide release date
        thumbnail: item.tiny_image || null,
      }))

    return results
  } catch (error) {
    console.error('Error searching Steam:', error)
    return []
  }
}

/**
 * Fetch detailed game metadata from Steam Store API
 * Uses Internal Steam Web API /api/appdetails endpoint
 * Rate limited to 200 requests per 5 minutes
 *
 * @param {number|string} appId - Steam app ID
 * @param {Object} options - Optional parameters
 * @param {string} options.language - Language code (default: 'english')
 * @param {string} options.countryCode - Country code (default: 'US')
 * @returns {Promise<Object|null>} Steam game data object or null if not found
 */
export const getSteamMetadata = async (appId, options = {}) => {
  if (!appId) {
    return null
  }

  try {
    const url = new URL(STEAM_APP_DETAILS_API)
    url.searchParams.set('appids', appId.toString())
    url.searchParams.set('l', options.language || 'english')
    if (options.countryCode) {
      url.searchParams.set('cc', options.countryCode)
    }

    const response = await tauriFetch(url.toString(), { method: 'GET' })

    if (!response.ok) {
      // Handle rate limiting (429 Too Many Requests)
      if (response.status === 429) {
        console.warn('Steam API rate limit reached. Please wait before making more requests.')
        throw new Error('Rate limit exceeded. Please try again later.')
      }
      throw new Error(`Steam API request failed: ${response.statusText}`)
    }

    const data = await response.json()

    // Steam API returns data in format: { [appId]: { success: boolean, data: {...} } }
    const appData = data[appId.toString()]

    if (!appData || !appData.success || !appData.data) {
      return null
    }

    return appData.data
  } catch (error) {
    console.error(`Error fetching Steam metadata for appId ${appId}:`, error)
    return null
  }
}
