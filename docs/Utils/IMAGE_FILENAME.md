# Image Filename Utility

**Location**: `src/Utils/ImageFilename.js`

**Description**: Utility for generating deterministic image filenames based on a key string and image data. Uses hash-based naming and magic bytes detection for file extensions.

## Overview

Provides functionality to generate consistent, deterministic filenames for images. The filename is based on a hash of the key string, and the file extension is automatically detected from the image data using magic bytes (file signature detection).

## Features

- **Deterministic Hashing**: Same key always produces the same hash
- **Magic Bytes Detection**: Automatically detects file extension from image data
- **Supported Formats**: PNG, JPEG, GIF, WebP, ICO
- **32-Character Hash**: Generates 32-character hexadecimal hash for filenames

## Function

### `GenerateImageFilename(key, arrayBuffer)`

Generate image filename from a key string and image data.

**Parameters**:
- `key` (string, required): Key string (e.g., "icon", "logo", or combined "icon1234")
- `arrayBuffer` (ArrayBuffer|Uint8Array, required): Image data as array buffer or uint8 array

**Returns**: `string` - Filename in format: `{hash:32}.{ext}` (e.g., `abc123def456789012345678901234.png`)

**Throws**: 
- `Error` if key is missing
- `Error` if arrayBuffer is missing

**Example**:
```javascript
import { GenerateImageFilename } from '@/Utils/ImageFilename'

const imageData = await fetch('https://example.com/image.png').then(r => r.arrayBuffer())
const filename = GenerateImageFilename('icon1234', imageData)
// Returns: 'abc123def456789012345678901234.png'
```

## Hash Algorithm

Uses a custom deterministic hash algorithm that combines four different hash functions:

1. **djb2-like hash** - First 8 characters
2. **sdbm-like hash** - Second 8 characters
3. **fnv-like hash** - Third 8 characters
4. **Simple additive hash** - Fourth 8 characters

The result is a 32-character hexadecimal string that is always the same for the same input.

## Supported Image Formats

The utility detects file extensions using magic bytes (file signatures):

| Format | Magic Bytes | Extension |
|--------|-------------|-----------|
| PNG | `89 50 4E 47 0D 0A 1A 0A` | `.png` |
| JPEG | `FF D8 FF` | `.jpg` |
| GIF | `47 49 46 38` or `47 49 46 39` | `.gif` |
| WebP | `RIFF ... WEBP` (at offset 8) | `.webp` |
| ICO | `00 00 01 00` or `00 00 02 00` | `.ico` |

**Default**: If format cannot be detected, defaults to `.jpg`

## Usage

### With FileManager.SaveImage

The `SaveImage` function in `FileManager.js` uses this utility internally:

```javascript
import { SaveImage } from '@/Utils/FileManager'

const path = await SaveImage({
  url: 'https://example.com/image.png',
  path: '/path/to/save/',
  key: 'logo',
  id: '12345'
})
// Filename is automatically generated using GenerateImageFilename('logo12345', imageData)
```

### Direct Usage

```javascript
import { GenerateImageFilename } from '@/Utils/ImageFilename'

// Fetch image
const response = await fetch('https://example.com/image.png')
const arrayBuffer = await response.arrayBuffer()

// Generate filename
const filename = GenerateImageFilename('icon1234', arrayBuffer)
// Returns: 'abc123def456789012345678901234.png'

// Save file
await writeFile(`/path/to/${filename}`, new Uint8Array(arrayBuffer))
```

## Use Cases

1. **Game Metadata Images**: Generate consistent filenames for game icons, logos, covers, etc.
2. **Cache Management**: Use deterministic names for caching downloaded images
3. **Deduplication**: Same key+id always produces the same filename, preventing duplicates

## Related Documentation

- [FileManager](./FILE_MANAGER.md) - Uses this utility in `SaveImage`
- [GamesStore](../App/STORE.md) - Uses `SaveImage` for game metadata images

