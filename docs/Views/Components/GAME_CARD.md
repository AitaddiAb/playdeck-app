# GameCard Component

**Location**: `src/Views/Components/GameCard.vue`

**Description**: Reusable game card component that displays game information and provides context menu for launching games and executables.

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Overview](#overview)
- [Props](#props)
- [Features](#features)
- [Usage](#usage)
- [Game Object Structure](#game-object-structure)
- [Dependencies](#dependencies)
- [Related Documentation](#related-documentation)

## Overview

Displays a game card with game name and action counts. Supports double-click to launch games and right-click context menu for selecting executables.

## Props

- `id` (string, required): Unique identifier for the card element
- `game` (Object, required): Game object containing game information

## Features

- Double-click to launch first executable (if only one exists)
- Right-click context menu with all executables
- Visual feedback on hover
- Responsive card width from settings
- Native Tauri context menu integration

## Usage

```vue
<template>
  <GameCard
    :id="`game-card-${index}`"
    :game="game"
  />
</template>

<script setup>
import GameCard from '@/Views/Components/GameCard.vue'

const game = {
  name: 'My Game',
  path: '/path/to/game',
  executables: ['game.exe'],
  sub_executables: ['subdir/launcher.bat']
}
</script>
```

## Game Object Structure

The game object must have the following structure:

```javascript
{
  id: string,               // Unique identifier (random 8 character string)
  name: string,              // Game directory name
  path: string,              // Full path to game directory
  executables: string[],     // First-level executables (relative paths)
  sub_executables: string[]  // Sub-level executables (relative paths)
}
```

**Example**:
```javascript
{
  id: 'a3f9k2m1',           // Random 8 character identifier
  name: 'My Game',
  path: '/Volumes/Games/My Game',
  executables: ['game.exe', 'launcher.exe'],
  sub_executables: ['tools/patcher.exe', 'tools/updater.bat']
}
```

## Context Menu

The component automatically sets up a context menu with:

1. **Play**: Launches the first executable from the `executables` array
2. **Separator**: Horizontal line
3. **All Actions** (Submenu): Contains all executables and sub-executables, each listed by filename
4. Additional menu items can be added to the `cardContextMenuItems` array

The context menu is created using the `ContextMenu` utility and supports native Tauri menus with submenu support.

**Note**: If the "All Actions" submenu is empty, it will display a disabled "Nothing there" item.

## Double-Click Behavior

- If only one executable exists: Launches it immediately
- If multiple executables exist: Currently launches the first one (future: show selection menu)

## Dependencies

- `@/Utils/ContextMenu`: Context menu utility
- `@/Utils/FileManager`: File opening utility (`OpenFile`)
- `@/App/Store`: Settings store for card width
- `quasar`: QCard, QCardSection components

## Related Documentation

- [ContextMenu](../../Utils/CONTEXT_MENU.md) - Context menu utility
- [FileManager](../../Utils/FILE_MANAGER.md) - File operations
- [GamesStore](../../App/STORE.md) - Game store structure
- [PageDashboard](../Pages/PAGE_DASHBOARD.md) - Dashboard page that uses GameCard

