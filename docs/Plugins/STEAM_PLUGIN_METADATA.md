# Steam Plugin Metadata

**Location**: `src/Plugins/Metadata/SteamPluginMetadata.js`

**Description**: Metadata plugin for Steam Store. Fetches detailed game metadata using the Internal Steam Web API.

## Overview

Uses the Steam App Details API (`/api/appdetails`) to fetch comprehensive game metadata including descriptions, platforms, developers, publishers, genres, categories, tags, and image URLs.

## API Endpoint

- **URL**: `https://store.steampowered.com/api/appdetails`
- **Method**: GET
- **Parameters**:
  - `appids` (string|number): Steam app ID
  - `l` (string): Language code (default: 'english')
  - `cc` (string): Country code (default: 'US')

## Function

### `load({ app_id, lang, cc })`

Fetch detailed game metadata from Steam Store API.

**Parameters**:
- `app_id` (number|string, required): Steam app ID
- `lang` (string, optional): Language code (default: 'english')
- `cc` (string, optional): Country code (default: 'US')

**Returns**: `Promise<Object>` - Game metadata object in PlayDeck format:
```javascript
{
  id: string,                    // Steam app ID
  name: string,                  // Game name
  description: string,            // Short description
  description_detailed: string,  // Detailed description (HTML)
  release: string,               // Release date (format: "DD MMM, YYYY")
  platforms: Array<string>,       // e.g., ["windows", "mac", "linux"]
  developers: Array<string>,     // Developer names
  publishers: Array<string>,     // Publisher names
  tags: Array<string>,          // Game tags (empty - /api/appdetails doesn't provide tags, alternative API needed)
  genres: Array<string>,        // Genre descriptions
  categories: Array<string>,     // Category descriptions
  images: {
    icon: string,               // Icon URL (empty string - /api/appdetails doesn't provide icon, alternative API needed)
    logo: string,               // Logo image URL
    header: string,             // Header image URL
    capsule: string,            // Capsule image URL (231x87)
    background: string,        // Background image URL
    library_hero: string,       // Library hero image URL
    vertical_cover: string,     // Vertical cover image URL (600x900)
  }
}
```

**Throws**: 
- `Error` if app_id is missing
- `Error` if request fails
- `Error` if app not found or invalid data

**Example**:
```javascript
import { load as SteamDetails } from '@/Plugins/Metadata/SteamPluginMetadata'

const metadata = await SteamDetails({ app_id: '1245620' })
```

## Response Format

The API returns:
```json
{
  "1245620": {
    "success": true,
    "data": {
      "steam_appid": 1245620,
      "name": "ELDEN RING",
      "short_description": "...",
      "detailed_description": "...",
      "platforms": {
        "windows": true,
        "mac": false,
        "linux": false
      },
      "developers": ["FromSoftware Inc."],
      "publishers": ["Bandai Namco Entertainment"],
      "genres": [{ "description": "Action" }, ...],
      "categories": [{ "description": "Single-player" }, ...],
      "header_image": "https://...",
      "background": "https://...",
      // ... other fields
    }
  }
}
```

The plugin:
1. Extracts data from `data[app_id].data`
2. Maps platforms object to array of enabled platforms
3. Maps genres/categories/tags arrays to description strings
4. Constructs image URLs using CDN patterns and API responses

## Image URLs

Images are constructed using Steam CDN patterns:

- **Logo**: `https://cdn.akamai.steamstatic.com/steam/apps/{app_id}/logo.png`
- **Header**: From API `header_image` or CDN fallback
- **Capsule**: `https://cdn.akamai.steamstatic.com/steam/apps/{app_id}/capsule_231x87.jpg`
- **Background**: From API `background` field
- **Library Hero**: `https://cdn.akamai.steamstatic.com/steam/apps/{app_id}/library_hero.jpg`
- **Vertical Cover**: `https://cdn.akamai.steamstatic.com/steam/apps/{app_id}/library_600x900.jpg`
- **Icon**: Empty string - `/api/appdetails` does not provide icon, and `/broadcast/ajaxgetappinfoforcap` returns 404. Alternative API needed.

## Limitations

1. **Tags**: The `/api/appdetails` endpoint does not provide tags. The plugin attempts to extract tags from `game_data.tags`, but this field is typically undefined. The `/broadcast/ajaxgetappinfoforcap` endpoint was attempted as an alternative but returns 404 errors. **An alternative API is needed to fetch game tags.**

2. **Icon**: Game icons are not available from the `/api/appdetails` endpoint. The `/broadcast/ajaxgetappinfoforcap` endpoint was attempted as an alternative but returns 404 errors. **An alternative API is needed to fetch game icons.**

3. **Rate Limiting**: Steam API is rate limited to approximately 200 requests per 5 minutes.

## Rate Limiting

Steam API is rate limited to approximately 200 requests per 5 minutes. The plugin does not implement rate limiting internally - handle this in your application if needed.

## Related Documentation

- [SteamPluginSearch](./STEAM_PLUGIN_SEARCH.md) - Search plugin
- [Steam API: Get App Details](../SteamAPI/Get-App-Details.md) - Official API documentation
- [Steam Image URLs](../SteamAPI/Steam-Image-URLs.md) - Image URL patterns
- [Internal Steam Web API](https://github.com/Revadike/InternalSteamWebAPI/wiki) - Community documentation

