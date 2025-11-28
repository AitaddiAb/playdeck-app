# Plugins Documentation

**Location**: `src/Plugins/`

**Description**: Plugin system for game metadata providers. Each plugin provides search and metadata fetching functionality for different game stores and services.

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Overview](#overview)
- [Plugin Structure](#plugin-structure)
- [Available Plugins](#available-plugins)
- [Creating New Plugins](#creating-new-plugins)
- [Usage](#usage)

## Overview

The plugin system allows PlayDeck to fetch game metadata from multiple sources. Each plugin is split into two parts:

1. **Search Plugin** (`Search/`) - Searches for games by name
2. **Metadata Plugin** (`Metadata/`) - Fetches detailed metadata for a specific game

Plugins follow a consistent interface pattern using an exported `load` function.

## Plugin Structure

```
src/Plugins/
├── Search/
│   └── SteamPluginSearch.js    # Steam store search
└── Metadata/
    └── SteamPluginMetadata.js  # Steam store metadata
```

### Search Plugin Interface

```javascript
/**
 * @param {Object} params - Search parameters
 * @param {string} params.query - Game name to search for
 * @param {string} [params.lang] - Language code (default: 'english')
 * @param {string} [params.cc] - Country code (default: 'US')
 * @returns {Promise<Array>} Array of search results with id, name, thumbnail
 */
export const load = async ({ query, lang = 'english', cc = 'US' }) => {
  // Implementation
}
```

### Metadata Plugin Interface

```javascript
/**
 * @param {Object} params - Request parameters
 * @param {number|string} params.app_id - Game/app identifier
 * @param {string} [params.lang] - Language code (default: 'english')
 * @param {string} [params.cc] - Country code (default: 'US')
 * @returns {Promise<Object>} Game metadata object
 */
export const load = async ({ app_id, lang = 'english', cc = 'US' }) => {
  // Implementation
}
```

## Available Plugins

### Steam Plugin

- **Search**: `SteamPluginSearch.js` - Uses Steam Store Search API (`/api/storesearch`)
- **Metadata**: `SteamPluginMetadata.js` - Uses Steam App Details API (`/api/appdetails`)

**Features**:
- Search games by name
- Fetch detailed game metadata (name, description, platforms, developers, publishers, genres, categories, tags, images)
- Supports multiple languages and regions
- Rate limited to 200 requests per 5 minutes

**Documentation**:
- [SteamPluginSearch](./STEAM_PLUGIN_SEARCH.md)
- [SteamPluginMetadata](./STEAM_PLUGIN_METADATA.md)

## Creating New Plugins

To create a new plugin:

1. **Create Search Plugin**: `src/Plugins/Search/YourPluginSearch.js`
   ```javascript
   export const load = async ({ query, lang, cc }) => {
     // Search implementation
     return results
   }
   ```

2. **Create Metadata Plugin**: `src/Plugins/Metadata/YourPluginMetadata.js`
   ```javascript
   export const load = async ({ app_id, lang, cc }) => {
     // Metadata fetching implementation
     return metadata
   }
   ```

3. **Register in GameMetadataDialog**: Add to `plugins` object
   ```javascript
   const plugins = {
     Steam: { Search: SteamSearch, Details: SteamDetails },
     YourPlugin: { Search: YourSearch, Details: YourDetails },
   }
   ```

## Usage

### In Components

```javascript
import { load as SteamSearch } from '@/Plugins/Search/SteamPluginSearch'
import { load as SteamDetails } from '@/Plugins/Metadata/SteamPluginMetadata'

// Search for games
const results = await SteamSearch({ query: 'Elden Ring' })

// Get game details
const metadata = await SteamDetails({ app_id: '1245620' })
```

### Expected Metadata Format

All metadata plugins should return objects in this format:

```javascript
{
  id: string,                    // Unique identifier
  name: string,                   // Game name
  description: string,           // Short description
  description_detailed: string,  // Detailed description
  release: string,               // Release date
  platforms: Array<string>,     // e.g., ["windows", "mac", "linux"]
  developers: Array<string>,    // Developer names
  publishers: Array<string>,     // Publisher names
  tags: Array<string>,          // Game tags
  genres: Array<string>,        // Genres
  categories: Array<string>,    // Categories
  images: {
    icon: string,               // Icon URL (or empty string)
    logo: string,              // Logo URL
    header: string,             // Header image URL
    capsule: string,            // Capsule image URL
    background: string,         // Background image URL
    library_hero: string,       // Library hero image URL
    vertical_cover: string,     // Vertical cover image URL
  }
}
```

## Related Documentation

- [GameMetadataDialog](../Views/Components/GAME_METADATA_DIALOG.md) - UI component that uses plugins
- [GamesStore](../App/STORE.md) - Store that saves plugin metadata
- [Steam API Documentation](../SteamAPI/) - Steam API reference

