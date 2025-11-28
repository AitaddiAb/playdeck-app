# Steam Plugin Search

**Location**: `src/Plugins/Search/SteamPluginSearch.js`

**Description**: Search plugin for Steam Store. Searches for games by name using the Internal Steam Web API.

## Overview

Uses the Steam Store Search API (`/api/storesearch`) to find games by name. Returns a list of matching games with their IDs, names, and thumbnails.

## API Endpoint

- **URL**: `https://store.steampowered.com/api/storesearch`
- **Method**: GET
- **Parameters**:
  - `term` (string): Search query
  - `l` (string): Language code (default: 'english')
  - `cc` (string): Country code (default: 'US')

## Function

### `load({ query, lang, cc })`

Search for games on Steam Store.

**Parameters**:
- `query` (string, required): Game name to search for
- `lang` (string, optional): Language code (default: 'english')
- `cc` (string, optional): Country code (default: 'US')

**Returns**: `Promise<Array>` - Array of game search results:
```javascript
[
  {
    id: string,        // Steam app ID
    name: string,       // Game name
    thumbnail: string   // Thumbnail image URL (or null)
  },
  // ...
]
```

**Throws**: 
- `Error` if query is empty or search fails
- `Error` if response format is invalid

**Example**:
```javascript
import { load as SteamSearch } from '@/Plugins/Search/SteamPluginSearch'

const results = await SteamSearch({ query: 'Elden Ring' })
// Returns: [{ id: '1245620', name: 'ELDEN RING', thumbnail: '...' }, ...]
```

## Response Format

The API returns:
```json
{
  "items": [
    {
      "type": "app",
      "id": 1245620,
      "name": "ELDEN RING",
      "tiny_image": "https://...",
      // ... other fields
    }
  ]
}
```

The plugin:
1. Filters for `type === 'app'` (excludes bundles, packages, etc.)
2. Limits results to 10 games
3. Maps to simplified format with `id`, `name`, `thumbnail`

## Rate Limiting

Steam API is rate limited to approximately 200 requests per 5 minutes. The plugin does not implement rate limiting internally - handle this in your application if needed.

## Related Documentation

- [SteamPluginMetadata](./STEAM_PLUGIN_METADATA.md) - Metadata fetching plugin
- [Steam API: Search Store](../SteamAPI/Search-Store.md) - Official API documentation
- [Internal Steam Web API](https://github.com/Revadike/InternalSteamWebAPI/wiki) - Community documentation

