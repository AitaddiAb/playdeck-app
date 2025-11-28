# FileManager.js

**Location**: `src/Utils/FileManager.js`

**Description**: Utility for file system operations including reading directories, finding files, and opening files using Tauri APIs.

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Overview](#overview)
- [Features](#features)
- [API](#api)
  - [`ReadDir(options)`](#readdiroptions)
  - [`FindFile(options)`](#findfileoptions)
  - [`OpenFile(options)`](#openfileoptions)
- [Usage](#usage)
  - [Reading Directories](#reading-directories)
  - [Finding Files](#finding-files)
  - [Opening Files](#opening-files)
- [Dependencies](#dependencies)
- [Related Documentation](#related-documentation)

## Overview

Provides file system operations for Tauri desktop applications. All functions use an options object pattern for consistency and flexibility.

## Features

- Read directories and get subdirectory names
- Find files by extension patterns (supports multiple extensions)
- Exclude files based on exclusion patterns
- Recursive file search
- Read and write text files
- Download and save images with deterministic filenames
- Open files with system default application
- Case-insensitive pattern matching
- Automatic path normalization

## API

### `ReadDir(options)`

Read a directory and return array of subdirectory relative paths (directory names).

**Parameters**:
- `options` (Object): Options object
  - `path` (string): Directory path to read

**Returns**: `Promise<Array<string>>` - Array of subdirectory names (relative paths)

**Example**:
```javascript
const dirs = await ReadDir({ path: '/path/to/games' })
// Returns: ['Game1', 'Game2', 'Game3']
```

### `ReadFile(options)`

Read a text file and return its contents.

**Parameters**:
- `options` (Object): Options object
  - `path` (string): Full path to the file to read

**Returns**: `Promise<string>` - File contents as string

**Throws**: Error if path is not provided or file cannot be read

**Example**:
```javascript
const contents = await ReadFile({ path: '/path/to/file.json' })
```

### `WriteFile(options)`

Write text content to a file. Creates parent directories if they don't exist.

**Parameters**:
- `options` (Object): Options object
  - `path` (string): Full path to the file to write
  - `contents` (string): Text content to write

**Returns**: `Promise<void>`

**Throws**: Error if path or contents is not provided, or if write fails

**Example**:
```javascript
await WriteFile({
  path: '/path/to/file.json',
  contents: JSON.stringify(data, null, 2)
})
```

### `FindFile(options)`

Find files matching extensions in a directory.

**Parameters**:
- `options` (Object): Options object
  - `path` (string): Directory path to search
  - `extensions` (string|Array<string>): File extensions to match (e.g., ".exe", ".bat" or ".exe,.bat" or [".exe", ".bat"])
  - `exclusions` (string|Array<string>, optional): Words to exclude files containing these words (e.g., "crash,PrereqSetup" or ["crash", "PrereqSetup"])
  - `recursive` (boolean, optional): Whether to search subdirectories recursively (default: false)

**Returns**: `Promise<Array<string>>` - Array of relative file paths from the search path

**Example**:
```javascript
const files = await FindFile({
  path: '/path/to/game',
  extensions: '.exe,.bat',
  exclusions: 'crash,PrereqSetup',
  recursive: true
})
// Returns: ['game.exe', 'subdir/launcher.bat']
```

### `OpenFile(options)`

Open a file using the system's default application.

**Parameters**:
- `options` (Object): Options object
  - `path` (string): Full path to the file to open

**Returns**: `Promise<void>`

**Throws**: Error if path is not provided or file cannot be opened

**Example**:
```javascript
await OpenFile({ path: '/path/to/game/game.exe' })
```

### `SaveImage(options)`

Download an image from a URL and save it to a local path. Generates a deterministic filename based on key+id hash and image data (magic bytes detection for file extension).

**Parameters**:
- `options` (Object): Options object
  - `url` (string): URL of the image to download
  - `path` (string): Directory path where the image should be saved
  - `key` (string): Key string (e.g., "icon", "logo") used for filename generation
  - `id` (string|number): Identifier (e.g., 1234 or "1234") used for filename generation

**Returns**: `Promise<string|null>` - Full path to the saved image file, or null if image returns 404

**Throws**: Error if URL, path, key, or id is missing, or if download/save fails

**Example**:
```javascript
const imagePath = await SaveImage({
  url: 'https://cdn.example.com/game/logo.png',
  path: '/path/to/game/Playdeck/',
  key: 'logo',
  id: '12345'
})
// Returns: '/path/to/game/Playdeck/abc123def456.png' (deterministic hash-based filename)
```

## Usage

### Reading Directories

```javascript
import { ReadDir } from '@/Utils/FileManager'

// Get all subdirectories
const gameDirs = await ReadDir({ path: '/Volumes/Games' })
// Returns: ['Game1', 'Game2', 'Game3']
```

### Finding Files

```javascript
import { FindFile } from '@/Utils/FileManager'

// Find .exe files (non-recursive)
const exeFiles = await FindFile({
  path: '/path/to/game',
  extensions: '.exe',
  recursive: false
})

// Find multiple extensions (recursive)
const files = await FindFile({
  path: '/path/to/game',
  extensions: ['.exe', '.bat', '.sh'],
  recursive: true
})

// Find files with exclusions
const files = await FindFile({
  path: '/path/to/game',
  extensions: '.exe',
  exclusions: 'crash,PrereqSetup,vc_redist',
  recursive: true
})
```

### Opening Files

```javascript
import { OpenFile } from '@/Utils/FileManager'

// Open a file
await OpenFile({ path: '/path/to/game/game.exe' })

// With error handling
try {
  await OpenFile({ path: '/path/to/file.exe' })
} catch (error) {
  console.error('Failed to open file:', error)
}
```

## Dependencies

- `@tauri-apps/plugin-fs`: File system operations (`readDir`, `readTextFile`, `writeTextFile`, `writeFile`, `mkdir`)
- `@tauri-apps/plugin-opener`: Opening files with system default application (`openPath`)
- `@tauri-apps/plugin-http`: HTTP requests for downloading images (`fetch`)
- `@/Utils/ImageFilename`: Image filename generation utility (`GenerateImageFilename`)

## Related Documentation

- [ContextMenu](./CONTEXT_MENU.md) - Context menu utility
- [WindowControl](./WINDOW_CONTROL.md) - Window control utility
- [GamesStore](../App/STORE.md) - Game store that uses FileManager

