/**
 * Image Filename Utility
 *
 * Provides functionality to generate deterministic image filenames
 * based on a key string and image data.
 *
 * @module ImageFilename
 */

/**
 * Generate a deterministic 32-character hex hash from a string
 * Uses a simple hash algorithm that always produces the same output for the same input
 * @param {string} input - Input string to hash
 * @returns {string} 32-character hexadecimal hash
 */
const generateHash = (input) => {
  const str = String(input)
  let hash1 = 0
  let hash2 = 0
  let hash3 = 0
  let hash4 = 0

  // Use different hash algorithms for each 8-character segment
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    // First segment: djb2-like hash
    hash1 = (hash1 << 5) + hash1 + char
    hash1 = hash1 & hash1 // Convert to 32-bit integer
    // Second segment: sdbm-like hash
    hash2 = char + (hash2 << 6) + (hash2 << 16) - hash2
    hash2 = hash2 & hash2
    // Third segment: fnv-like hash
    hash3 = ((hash3 ^ char) * 16777619) & 0xffffffff
    // Fourth segment: simple additive hash
    hash4 = (hash4 * 31 + char) & 0xffffffff
  }

  // Convert each hash to 8-character hex and combine to get 32 characters
  const hex1 = Math.abs(hash1).toString(16).padStart(8, '0').substring(0, 8)
  const hex2 = Math.abs(hash2).toString(16).padStart(8, '0').substring(0, 8)
  const hex3 = Math.abs(hash3).toString(16).padStart(8, '0').substring(0, 8)
  const hex4 = Math.abs(hash4).toString(16).padStart(8, '0').substring(0, 8)

  return (hex1 + hex2 + hex3 + hex4).substring(0, 32)
}

/**
 * Detect image file extension from array buffer data using magic bytes
 * @param {ArrayBuffer|Uint8Array} data - Image data as array buffer or uint8 array
 * @returns {string} File extension (e.g., 'png', 'jpg', 'jpeg', 'ico', 'gif', 'webp')
 */
const getExtensionFromData = (data) => {
  const bytes = data instanceof Uint8Array ? data : new Uint8Array(data)

  if (bytes.length < 4) return 'jpg' // Default fallback

  // PNG: 89 50 4E 47 0D 0A 1A 0A
  if (
    bytes[0] === 0x89 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x4e &&
    bytes[3] === 0x47 &&
    bytes.length >= 8 &&
    bytes[4] === 0x0d &&
    bytes[5] === 0x0a &&
    bytes[6] === 0x1a &&
    bytes[7] === 0x0a
  ) {
    return 'png'
  }

  // JPEG: FF D8 FF
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
    // Check if it's JPEG or JPEG 2000 (JP2 starts with FF 4F FF 51)
    // Standard JPEG continues with E0, E1, etc.
    if (bytes.length >= 4 && bytes[3] >= 0xe0 && bytes[3] <= 0xef) {
      return 'jpg'
    }
    // Could also be .jpeg, but we'll default to .jpg
    return 'jpg'
  }

  // GIF: 47 49 46 38 (GIF8) or 47 49 46 39 (GIF9)
  if (bytes[0] === 0x47 && bytes[1] === 0x49 && bytes[2] === 0x46 && (bytes[3] === 0x38 || bytes[3] === 0x39)) {
    return 'gif'
  }

  // WebP: RIFF (52 49 46 46) followed by WEBP (57 45 42 50) at offset 8
  if (
    bytes.length >= 12 &&
    bytes[0] === 0x52 &&
    bytes[1] === 0x49 &&
    bytes[2] === 0x46 &&
    bytes[3] === 0x46 &&
    bytes[8] === 0x57 &&
    bytes[9] === 0x45 &&
    bytes[10] === 0x42 &&
    bytes[11] === 0x50
  ) {
    return 'webp'
  }

  // ICO: 00 00 01 00 (icon) or 00 00 02 00 (cursor)
  if (bytes[0] === 0x00 && bytes[1] === 0x00 && bytes[2] === 0x01 && bytes[3] === 0x00) {
    return 'ico'
  }
  if (bytes[0] === 0x00 && bytes[1] === 0x00 && bytes[2] === 0x02 && bytes[3] === 0x00) {
    return 'ico'
  }

  // Default to .jpg if format cannot be detected
  return 'jpg'
}

/**
 * Generate image filename from a key string and image data
 * @param {string} key - Key string (e.g., "icon", "logo")
 * @param {ArrayBuffer|Uint8Array} arrayBuffer - Image data as array buffer or uint8 array
 * @returns {string} Filename in format: {hash:32}.{ext} (e.g., '1234567890.png')
 */
export const GenerateImageFilename = (key, arrayBuffer) => {
  if (!key) throw new Error('Key is required to generate image filename')
  if (!arrayBuffer) throw new Error('ArrayBuffer is required to generate image filename')

  // Generate deterministic hash from key
  const hash = generateHash(key)

  // Detect file extension from image data (magic bytes)
  const ext = getExtensionFromData(arrayBuffer)

  // Create filename: {hash:32}.{ext}
  return `${hash}.${ext}`
}
