# GameCard Component

**Location**: `src/Views/Components/GameCard.vue`

**Description**: Reusable game card component that displays game information and provides context menu for launching games and managing game actions.

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Overview](#overview)
- [Props](#props)
- [Features](#features)
- [Usage](#usage)
- [Game Object Structure](#game-object-structure)
- [Click Behavior](#click-behavior)
- [Context Menu](#context-menu)
- [Dependencies](#dependencies)
- [Related Documentation](#related-documentation)

## Overview

Displays a game card with game name and metadata. Supports click to launch the default action and right-click context menu for managing game actions and metadata.

## Props

- `game` (Object, required): Game object containing game information and metadata

## Features

- Click to launch default action (if set)
- Right-click context menu with all actions
- Visual feedback on hover
- Responsive card width from settings
- Native Tauri context menu integration
- Badge indicator when no default action is set
- Ability to set default action from context menu
- Edit metadata option

## Usage

```vue
<template>
  <GameCard :game="game" />
</template>

<script setup>
import GameCard from '@/Views/Components/GameCard.vue'

const game = {
  id: 'a3f9k2m1',
  name: 'My Game',
  path: '/Volumes/Games/My Game',
  actions: {
    default: 'game.exe',
    others: ['launcher.exe', 'tools/patcher.exe']
  }
}
</script>
```

## Game Object Structure

The game object must have the following structure:

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
  developer?: string,             // Optional: Game developer
  publisher?: string,             // Optional: Game publisher
  release_date?: string,          // Optional: Release date
  genre?: string,                 // Optional: Game genre
  platform?: string,             // Optional: Platform
  version?: string               // Optional: Game version
}
```

**Example**:
```javascript
{
  id: 'a3f9k2m1',
  name: 'My Game',
  path: '/Volumes/Games/My Game',
  actions: {
    default: 'game.exe',          // Single first-level file becomes default
    others: ['launcher.exe', 'tools/patcher.exe', 'tools/updater.bat']
  },
  developer: 'Game Studio',
  publisher: 'Publisher Inc',
  release_date: '2024-01-01',
  genre: 'Action',
  platform: 'Windows',
  version: '1.0.0'
}
```

**Example with no default**:
```javascript
{
  id: 'b4g0l3n2',
  name: 'Another Game',
  path: '/Volumes/Games/Another Game',
  actions: {
    default: null,                // Multiple first-level files, no default
    others: ['game1.exe', 'game2.exe', 'launcher.bat', 'tools/patcher.exe']
  }
}
```

## Click Behavior

- **Click on card**: Launches the default action if one is set (`actions.default` is not `null`)
- **No default action**: Click does nothing (card shows a red "No Default Action" badge)

## Context Menu

The component automatically sets up a context menu with the following structure:

1. **Play**: 
   - Launches the default action (`actions.default`)
   - Enabled only when `actions.default` is not `null`
   - Disabled when no default action is set

2. **Context Menu Items 3-6**: Placeholder items (currently disabled)

3. **Separator**: Horizontal line

4. **Edit Metadata**: Opens the metadata editing dialog (`GameMetadataDialog`)

5. **All Actions** (Submenu): Contains all actions from `actions.others`
   - Each action is displayed as a nested submenu with the file path as the label
   - Each action submenu contains:
     - **Play**: Launches that specific action
     - **Set as Default**: Sets that action as the default and saves the metadata
       - After setting a default, the "Play" menu item is automatically enabled via `ContextMenu.update()`

The context menu is created using the `ContextMenu` utility and supports native Tauri menus with submenu support.

**Note**: If the "All Actions" submenu is empty, it will display a disabled "Nothing there" item.

### Setting Default Action

When a user selects "Set as Default" from an action's submenu:
1. The game metadata is updated with the new default action
2. The metadata is saved to disk via `SaveGameMetadata` action
3. The games array in the store is updated
4. The "Play" menu item is enabled via `ContextMenu.update()`

## Dependencies

- `@/Utils/ContextMenu`: Context menu utility for creating and updating menus
- `@/Utils/FileManager`: File opening utility (`OpenFile`)
- `@/Stores`: 
  - `SettingsStore`: For card width (`ui_card_width`)
  - `GamesStore`: For saving game metadata (`SaveGameMetadata`) and editing state (`game_to_edit`)
- `quasar`: QCard, QCardSection, QBadge components

## Related Documentation

- [ContextMenu](../../Utils/CONTEXT_MENU.md) - Context menu utility
- [FileManager](../../Utils/FILE_MANAGER.md) - File operations
- [GamesStore](../../App/STORE.md) - Game store structure
- [PageDashboard](../Pages/PAGE_DASHBOARD.md) - Dashboard page that uses GameCard

