/**
 * Game Metadata Utility
 *
 * Provides functions for loading and saving game metadata.
 * Metadata is stored in {game.path}/Playdeck/metadata.json
 *
 * @module GameMetadata
 */

import { ReadFile, WriteFile } from '@/Utils/FileManager'

/**
 * Load metadata for a game
 * @param {Object} game - Game object with path property
 * @returns {Promise<Object>} Metadata object (empty object if file doesn't exist or fails to load)
 */
export const LoadMetadata = async (game) => {
  if (!game || !game.path) {
    console.error('LoadMetadata: Game object with path is required')
    return {}
  }

  const metadataPath = `${game.path}/Playdeck/metadata.json`

  try {
    // Try to read the metadata file
    const contents = await ReadFile({ path: metadataPath })
    const metadata = JSON.parse(contents)
    return metadata
  } catch (error) {
    // File doesn't exist or error reading - return empty object
    const errorMessage = error.message || String(error)
    const errorCode = error.code || ''
    const errorString = String(error).toLowerCase()

    // Check for various "file not found" error patterns
    const isFileNotFound =
      errorCode === 'ENOENT' ||
      errorMessage.includes('not found') ||
      errorMessage.includes('No such file') ||
      errorMessage.includes('No such file or directory') ||
      errorString.includes('no such file') ||
      errorString.includes('not found') ||
      errorString.includes('os error 2')

    if (isFileNotFound) {
      // File doesn't exist - return empty object silently
      return {}
    } else if (errorMessage.includes('JSON') || errorMessage.includes('parse')) {
      // JSON parsing error
      console.error(`Error parsing metadata file ${metadataPath}:`, error)
      return {}
    } else {
      // Other error - log but still return empty object
      console.error(`Error reading metadata file ${metadataPath}:`, error)
      return {}
    }
  }
}

/**
 * Save metadata for a game
 * @param {Object} game - Game object (the entire object is saved as metadata)
 * @returns {Promise<void>}
 */
export const SaveMetadata = async (game) => {
  if (!game || !game.path) {
    throw new Error('SaveMetadata: Game object with path is required')
  }

  const metadataPath = `${game.path}/Playdeck/metadata.json`

  try {
    const contents = JSON.stringify(game, null, 2)
    await WriteFile({
      path: metadataPath,
      contents: contents,
    })
  } catch (error) {
    console.error(`Error saving metadata file ${metadataPath}:`, error)
    throw error
  }
}
