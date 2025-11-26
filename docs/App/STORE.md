# Store.js

**Location**: `src/App/Store.js`

**Description**: Pinia store initialization. Creates the Pinia instance and initializes all store instances for state management.

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Overview](#overview)
- [Initialized Stores](#initialized-stores)
- [Usage](#usage)
- [Store Structure](#store-structure)
- [Related Documentation](#related-documentation)

## Overview

Initializes the Pinia instance for state management and creates singleton instances of all stores. Stores are located in `src/Stores/` directory and follow the pattern `src/Stores/StoreName.js`.

## Initialized Stores

The following stores are initialized and exported:

- **SettingsStore**: Application settings (games path, extensions, exclusions, card width)
- **GamesStore**: Game discovery and management

## Usage

### Importing Store Instances

```javascript
// Import initialized store instances
import { SettingsStore, GamesStore } from '@/App/Store.js'

// Use directly (no need to call useSettingsStore())
SettingsStore.games_path = '/path/to/games'
SettingsStore.SaveSettings()

await GamesStore.LoadGames()
const games = GamesStore.games
```

### In Vue Components

```javascript
import { SettingsStore, GamesStore } from '@/App/Store.js'
import { storeToRefs } from 'pinia'

// Use storeToRefs for reactive binding
const { games_path, ui_card_width } = storeToRefs(SettingsStore)
const { games } = storeToRefs(GamesStore)

// Or use directly
SettingsStore.SaveSettings()
await GamesStore.LoadGames()
```

## Store Structure

### SettingsStore

**Location**: `src/Stores/SettingsStore.js`

**State**:
- `games_path` (string): Games folder path
- `games_extensions` (string): File extensions to search for (e.g., ".exe,.bat")
- `games_exclusions` (string): Exclusion patterns (e.g., "crash,PrereqSetup")
- `ui_card_width` (number): Card width in pixels (200-300, step 10)

**Actions**:
- `SaveSettings(callback)`: Save all settings to localStorage

### GamesStore

**Location**: `src/Stores/GamesStore.js`

**State**:
- `games` (Array): Array of discovered games
- `game_to_edit` (Object|null): Game object selected for metadata editing (set to open `GameMetadataDialog`)

**Getters**:
- `games_path`: Gets games path from SettingsStore
- `games_extensions`: Gets extensions from SettingsStore
- `games_exclusions`: Gets exclusions from SettingsStore
- `games_sorted`: Returns games array sorted alphabetically by name

**Actions**:
- `LoadGames()`: Discover and load games from the games path
  - Checks for `metadata.json` in each game directory
  - If metadata exists, loads it as the game object
  - If metadata doesn't exist, calls `createMetadata()` to auto-create it
  - Skips directories with no matching files
- `createMetadata(game)`: Creates metadata for a game that doesn't have `metadata.json`
  - Parameters: `game` (Object) - Must have `name` and `path` properties
  - Returns: Created metadata object or `null` if no files found
  - Automatically determines `actions.default` (first-level file if exactly one, otherwise `null`)
  - Sets `actions.others` to include all first-level files and all recursively found files
  - Saves the metadata to `game.path/Playdeck/metadata.json`
- `SaveGameMetadata(game)`: Saves game metadata and updates the games array
  - Parameters: `game` (Object) - Complete game object with updated metadata
  - Returns: `true` if successful, `false` if error
  - Updates the game in the `games` array after saving

**Game Object Structure**:
```javascript
{
  id: string,                    // Unique identifier (random 8 character string)
  name: string,                   // Game directory name
  path: string,                   // Full path to game directory
  actions: {
    default: string|null,         // Default action file path (relative to game.path)
                                 // null if no default is set or multiple first-level files exist
    others: string[]              // Array of all other action file paths (relative to game.path)
  },
  // Optional metadata fields:
  developer?: string,             // Game developer
  publisher?: string,             // Game publisher
  release_date?: string,          // Release date
  genres?: string[],              // Array of genres
  platform?: string,             // Platform
  rating?: string,               // Rating
  description?: string,          // Game description
  tags?: string[]                // Array of tags
}
```

**Example**:
```javascript
{
  id: 'a3f9k2m1',
  name: 'My Game',
  path: '/Volumes/Games/My Game',
  actions: {
    default: 'game.exe',
    others: ['launcher.exe', 'tools/patcher.exe']
  },
  developer: 'Game Studio',
  publisher: 'Publisher Inc',
  release_date: '2024-01-01',
  genres: ['Action', 'Adventure'],
  platform: 'Windows',
  rating: 'M',
  description: 'An exciting action game',
  tags: ['single-player', 'action']
}
```

## Related Documentation

- [App.js](./APP.md) - Application entry point
- [FileManager](../Utils/FILE_MANAGER.md) - File system operations used by GamesStore

