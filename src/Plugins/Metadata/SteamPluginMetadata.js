/**
 * Steam Metadata Plugin
 *
 * Provides metadata fetching functionality for Steam Store.
 * Uses Internal Steam Web API /api/appdetails endpoint for detailed game metadata.
 * Rate limited to 200 requests per 5 minutes
 *
 * @module SteamPluginMetadata
 */

import { fetch } from '@tauri-apps/plugin-http'

/** @constant {string} Steam App Details API endpoint */
const STEAM_APP_DETAILS_API = 'https://store.steampowered.com/api/appdetails'

/** @constant {string} Steam CDN base URL for app images */
const STEAM_APP_CDN_API = `https://cdn.akamai.steamstatic.com/steam/apps`

/**
 * Fetch detailed game metadata from Steam Store API
 * @param {Object} params - Request parameters
 * @param {number|string} params.app_id - Steam app ID
 * @param {string} [params.lang] - Language code (default: 'english')
 * @param {string} [params.cc] - Country code (default: 'US')
 * @returns {Promise<Object>} Steam game data object
 * @throws {Error} If app_id is missing, request fails, or app not found
 */
export const load = async ({ app_id, lang = 'english', cc = 'US' }) => {
  // Validate app_id
  if (!app_id) throw new Error('app_id is required')

  // Build URL
  const url = new URL(STEAM_APP_DETAILS_API)
  url.searchParams.set('appids', app_id.toString())
  url.searchParams.set('l', lang || 'english')
  url.searchParams.set('cc', cc || 'US')

  // Fetch data
  const response = await fetch(url.toString(), { method: 'GET' })

  // Handle error
  if (!response.ok) throw { message: 'Steam API request failed', response }

  const data = await response.json()

  // Steam API returns data in format: { [appId]: { success: boolean, data: {...} } }
  const game_data = data[app_id.toString()]?.data

  // Validate game data
  if (!game_data) throw { message: 'App not found or invalid data', data }

  // Map Steam API response to Playdeck metadata format
  const game = {
    id: game_data.steam_appid.toString(),
    name: game_data.name,
    description: game_data.short_description,
    description_detailed: game_data.detailed_description,
    release: game_data.release_date.date,
    // Filter platforms object to get only enabled platforms (e.g., {windows: true, mac: false} -> ["windows"])
    platforms: Object.keys(game_data.platforms).filter((key) => game_data.platforms[key] === true),
    developers: game_data.developers,
    publishers: game_data.publishers,
    // Tags: /api/appdetails does not provide tags. /broadcast/ajaxgetappinfoforcap returns 404.
    // Alternative API needed for tags.
    tags: game_data.tags?.map((tag) => tag.description) || [],
    // Map genres array to description strings
    genres: game_data.genres?.map((genre) => genre.description) || [],
    // Map categories array to description strings
    categories: game_data.categories?.map((category) => category.description) || [],
    images: {
      // Icon: /api/appdetails does not provide icon. /broadcast/ajaxgetappinfoforcap returns 404.
      // Alternative API needed for icon.
      icon: '',
      // Logo image from CDN
      logo: `${STEAM_APP_CDN_API}/${app_id}/logo.png`,
      // Header image from API response or CDN fallback
      header: game_data.header_image || `${STEAM_APP_CDN_API}/${app_id}/header.jpg`,
      // Capsule image (231x87) - alternative: capsule_616x353.jpg for larger size
      capsule: `${STEAM_APP_CDN_API}/${app_id}/capsule_231x87.jpg`,
      // Background image from API response
      background: game_data.background || '',
      // Library hero image from CDN
      library_hero: `${STEAM_APP_CDN_API}/${app_id}/library_hero.jpg`,
      // Vertical cover image (600x900) from CDN
      vertical_cover: `${STEAM_APP_CDN_API}/${app_id}/library_600x900.jpg`,
    },
  }

  return game
}
