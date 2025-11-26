# PageSettings

**Location**: `src/Views/Pages/PageSettings.vue`

**Description**: Application settings page component for configuring game discovery and UI preferences.

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Overview](#overview)
- [Features](#features)
- [Settings](#settings)
- [Route](#route)
- [Dependencies](#dependencies)
- [Related Documentation](#related-documentation)

## Overview

The PageSettings component provides the application settings interface. Users can configure game discovery paths, file extensions, exclusion patterns, and UI preferences.

## Features

- Games folder path selection (OS-native folder picker)
- File extensions configuration
- Exclusion patterns for filtering files
- Card width slider (200-300px, step 10)
- Save settings to localStorage
- Auto-reload games after saving

## Settings

### Games Path

Select the root folder containing game directories. Uses OS-native folder picker dialog.

### Games Extensions

Comma-separated list of file extensions to search for (e.g., `.exe,.bat,.sh`).

### Games Exclusion Patterns

Comma-separated list of words to exclude from file discovery. Files containing these words in their path or filename will be excluded (e.g., `crash,PrereqSetup,vc_redist`).

### Card Width

Slider to adjust game card width on the dashboard (200-300 pixels, increments of 10).

## Route

- **Path**: `/settings`
- **Name**: `Settings`

## Dependencies

- `@/App/Store`: SettingsStore and GamesStore
- `@tauri-apps/plugin-dialog`: Folder picker dialog
- `quasar`: QPage, QCard, QInput, QSlider, QBtn components

## Related Documentation

- [SettingsStore](../../App/STORE.md) - Settings store structure
- [GamesStore](../../App/STORE.md) - Game store structure
- [FileManager](../../Utils/FILE_MANAGER.md) - File operations
- [Routes](../../Routes/README.md) - Route definitions
- [Router](../../App/ROUTER.md) - Router configuration
