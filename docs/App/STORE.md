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

**Getters**:
- `games_path`: Gets games path from SettingsStore
- `games_extensions`: Gets extensions from SettingsStore
- `games_exclusions`: Gets exclusions from SettingsStore

**Actions**:
- `LoadGames()`: Discover and load games from the games path

**Game Object Structure**:
```javascript
{
  id: string,               // Unique identifier (random 8 character string)
  name: string,              // Game directory name
  path: string,              // Full path to game directory
  executables: string[],     // First-level executables (relative paths)
  sub_executables: string[]  // Sub-level executables (relative paths)
}
```

## Related Documentation

- [App.js](./APP.md) - Application entry point
- [FileManager](../Utils/FILE_MANAGER.md) - File system operations used by GamesStore

