/**
 * File Manager Utility
 *
 * Provides file system operations for reading directories and finding files.
 *
 * @module FileManager
 */

import { readDir, readTextFile, writeTextFile, writeFile, mkdir } from '@tauri-apps/plugin-fs'
import { openPath } from '@tauri-apps/plugin-opener'
import { fetch } from '@tauri-apps/plugin-http'
import { GenerateImageFilename } from '@/Utils/ImageFilename'

/**
 * Read directory and return array of subdirectory relative paths
 * @param {Object} options - Options object
 * @param {string} options.path - Directory path to read
 * @returns {Promise<Array<string>>} Array of subdirectory relative paths (directory names)
 */
export const ReadDir = async (options) => {
  const { path } = options || {}
  if (!path) return []

  try {
    const entries = await readDir(path)
    const dirs = []

    for (const entry of entries) {
      // Only include directories, skip hidden directories
      if (entry.isDirectory && !entry.name.startsWith('.')) {
        // Return just the directory name (relative path)
        dirs.push(entry.name)
      }
    }

    return dirs
  } catch (error) {
    console.error(`Error reading directory ${path}:`, error)
    return []
  }
}

/**
 * Find files matching extensions in a directory
 * @param {Object} options - Options object
 * @param {string} options.path - Directory path to search
 * @param {string|Array<string>} options.extensions - File extensions to match (e.g., ".exe", ".bat" or ".exe,.bat" or [".exe", ".bat"])
 * @param {string|Array<string>} [options.exclusions] - Words to exclude files containing these words (e.g., "crash,PrereqSetup" or ["crash", "PrereqSetup"])
 * @param {boolean} [options.recursive=false] - Whether to search subdirectories recursively (default: false)
 * @returns {Promise<Array<string>>} Array of relative file paths from the search path
 */
export const FindFile = async (options) => {
  const { path, extensions, exclusions, recursive = false } = options || {}
  if (!path || !extensions) return []

  // Normalize extensions: convert string to array, handle comma-separated values
  let extensionsArray = []
  if (typeof extensions === 'string') {
    extensionsArray = extensions
      .split(',')
      .map((e) => e.trim())
      .filter((e) => e.length > 0)
  } else if (Array.isArray(extensions)) {
    extensionsArray = extensions.map((e) => (typeof e === 'string' ? e.trim() : String(e))).filter((e) => e.length > 0)
  }

  if (extensionsArray.length === 0) return []

  // Normalize extensions to lowercase for case-insensitive matching
  const normalizedExtensions = extensionsArray.map((e) => e.toLowerCase())

  // Normalize exclusions: convert string to array, handle comma-separated values
  let exclusionsArray = []
  if (exclusions) {
    if (typeof exclusions === 'string') {
      exclusionsArray = exclusions
        .split(',')
        .map((e) => e.trim())
        .filter((e) => e.length > 0)
    } else if (Array.isArray(exclusions)) {
      exclusionsArray = exclusions
        .map((e) => (typeof e === 'string' ? e.trim() : String(e)))
        .filter((e) => e.length > 0)
    }
  }

  // Normalize exclusions to lowercase for case-insensitive matching
  const normalizedExclusions = exclusionsArray.map((e) => e.toLowerCase())

  /**
   * Check if file should be excluded based on exclusion words
   * @param {string} filePath - Full file path
   * @param {string} fileName - File name
   * @returns {boolean} True if file should be excluded
   */
  const shouldExclude = (filePath, fileName) => {
    if (normalizedExclusions.length === 0) return false

    const lowerPath = filePath.toLowerCase()
    const lowerName = fileName.toLowerCase()

    // Check if any exclusion word is contained in the path or filename
    return normalizedExclusions.some((exclusion) => lowerPath.includes(exclusion) || lowerName.includes(exclusion))
  }

  /**
   * Recursively search for files matching the pattern
   * @param {string} dirPath - Directory path to search
   * @param {string} basePath - Base path for calculating relative paths
   * @param {Array<string>} foundFiles - Array to collect found file paths
   * @param {number} currentDepth - Current depth level
   */
  const searchFiles = async (dirPath, basePath, foundFiles = [], currentDepth = 0) => {
    try {
      const entries = await readDir(dirPath)

      for (const entry of entries) {
        // Skip hidden files/directories
        if (entry.name.startsWith('.')) {
          continue
        }

        // Join path (Tauri normalizes paths, so '/' works on all platforms)
        const separator = dirPath.endsWith('/') || dirPath.endsWith('\\') ? '' : '/'
        const entryPath = `${dirPath}${separator}${entry.name}`

        if (entry.isDirectory) {
          // Search subdirectories if recursive mode is enabled
          if (recursive) {
            await searchFiles(entryPath, basePath, foundFiles, currentDepth + 1)
          }
        } else {
          // Check if file should be excluded
          if (shouldExclude(entryPath, entry.name)) {
            continue
          }

          // Check if file matches any of the extensions
          const fileName = entry.name.toLowerCase()
          const matchesExtension = normalizedExtensions.some((ext) => fileName.endsWith(ext))
          if (matchesExtension) {
            // Calculate relative path from basePath
            const relativePath = entryPath.replace(basePath + '/', '').replace(basePath + '\\', '')
            foundFiles.push(relativePath)
          }
        }
      }
    } catch (error) {
      console.error(`Error reading directory ${dirPath}:`, error)
    }

    return foundFiles
  }

  try {
    const foundFiles = await searchFiles(path, path, [], 0)
    return foundFiles
  } catch (error) {
    console.error(`Error finding files in ${path}:`, error)
    return []
  }
}

/**
 * Read a text file and return its contents
 * @param {Object} options - Options object
 * @param {string} options.path - Full path to the file to read
 * @returns {Promise<string>} File contents as string
 */
export const ReadFile = async (options) => {
  const { path } = options || {}
  if (!path) {
    throw new Error('Path is required to read file')
  }

  try {
    const contents = await readTextFile(path)
    return contents
  } catch (error) {
    // Check if it's a "file not found" error - don't log these as they're often expected
    const errorMessage = error.message || String(error)
    const errorCode = error.code || ''
    const errorString = String(error).toLowerCase()

    const isFileNotFound =
      errorCode === 'ENOENT' ||
      errorMessage.includes('not found') ||
      errorMessage.includes('No such file') ||
      errorMessage.includes('No such file or directory') ||
      errorString.includes('no such file') ||
      errorString.includes('not found') ||
      errorString.includes('os error 2')

    // Only log non-"file not found" errors
    if (!isFileNotFound) {
      console.error(`Error reading file ${path}:`, error)
    }
    throw error
  }
}

/**
 * Write text content to a file
 * @param {Object} options - Options object
 * @param {string} options.path - Full path to the file to write
 * @param {string} options.contents - Text content to write
 * @returns {Promise<void>}
 */
export const WriteFile = async (options) => {
  const { path, contents } = options || {}
  if (!path) {
    throw new Error('Path is required to write file')
  }
  if (contents === undefined) {
    throw new Error('Contents is required to write file')
  }

  try {
    // Extract directory path from file path
    const pathParts = path.split(/[/\\]/)
    pathParts.pop() // Remove filename
    const dirPath = pathParts.join('/')

    // Create directory if it doesn't exist
    if (dirPath) {
      try {
        await mkdir(dirPath, { recursive: true })
      } catch (mkdirError) {
        // Directory might already exist, ignore error
        if (mkdirError.code !== 'EEXIST') {
          console.warn(`Warning creating directory ${dirPath}:`, mkdirError)
        }
      }
    }

    // Write file
    await writeTextFile(path, contents)
  } catch (error) {
    console.error(`Error writing file ${path}:`, error)
    throw error
  }
}

/**
 * Open a file using the system's default application
 * @param {Object} options - Options object
 * @param {string} options.path - Full path to the file to open
 * @returns {Promise<void>}
 */
export const OpenFile = async (options) => {
  const { path } = options || {}
  if (!path) {
    throw new Error('Path is required to open file')
  }

  try {
    await openPath(path)
  } catch (error) {
    console.error(`Error opening file ${path}:`, error)
    throw error
  }
}

/**
 * Download an image from a URL and save it to a local path
 * @param {Object} options - Options object
 * @param {string} options.url - URL of the image to download
 * @param {string} options.path - Directory path where the image should be saved
 * @param {string} options.key - Key string (e.g., "icon", "logo")
 * @param {string|number} options.id - Identifier (e.g., 1234 or "1234")
 * @returns {Promise<string>} Full path to the saved image file
 */
export const SaveImage = async (options) => {
  const { url, path: dirPath, key, id } = options || {}

  if (!url) throw new Error('URL is required to save image')
  if (!dirPath) throw new Error('Path is required to save image')
  if (!key) throw new Error('Key is required to save image')
  if (!id) throw new Error('ID is required to save image')

  try {
    // Fetch image from URL first
    const response = await fetch(url, { method: 'GET' })

    if (response.status === 404) return null
    if (!response.ok) throw new { message: 'Failed to fetch image', response }()

    // Get image data as array buffer
    const arrayBuffer = await response.arrayBuffer()
    const uint8Array = new Uint8Array(arrayBuffer)

    // Generate filename from key+id and image data
    const hashInput = `${key}${id}`
    const filename = GenerateImageFilename(hashInput, arrayBuffer)

    // Construct full file path
    const separator = dirPath.endsWith('/') || dirPath.endsWith('\\') ? '' : '/'
    const fullPath = `${dirPath}${separator}${filename}`

    // Write binary data to file
    await writeFile(fullPath, uint8Array)

    return fullPath
  } catch (error) {
    console.error(`Error saving image from ${url} to ${dirPath}:`, error)
    throw error
  }
}
