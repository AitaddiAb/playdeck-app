# PageDashboard

**Location**: `src/Views/Pages/PageDashboard.vue`

**Description**: Main dashboard/home page component displaying the game library.

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Overview](#overview)
- [Features](#features)
- [Route](#route)
- [Usage](#usage)
- [Game Display](#game-display)
- [Dependencies](#dependencies)
- [Related Documentation](#related-documentation)

## Overview

The PageDashboard component is the main landing page of the application. It displays the game library as a grid of game cards, allowing users to launch games by double-clicking or using the context menu.

## Features

- Displays games from GamesStore
- Game cards with double-click to launch
- Context menu for selecting executables
- Loading states and empty states
- Responsive card width from settings
- Automatic game discovery from configured path

## Route

- **Path**: `/`
- **Name**: `Dashboard`

## Usage

The dashboard automatically loads games when mounted and displays them in a scrollable grid layout.

## Game Display

Games are displayed as cards using the `GameCard` component. Each card shows:
- Game name
- Number of executables and sub-executables
- Double-click to launch (if single executable)
- Right-click context menu for all executables

## Dependencies

- `@/App/Store`: SettingsStore and GamesStore
- `@/Views/Components/GameCard`: Game card component
- `@tauri-apps/plugin-opener`: Opening files
- `quasar`: QPage, QScrollArea, QCard components

## Related Documentation

- [GameCard](../Components/GAME_CARD.md) - Game card component
- [GamesStore](../../App/STORE.md) - Game store structure
- [FileManager](../../Utils/FILE_MANAGER.md) - File operations
- [Routes](../../Routes/README.md) - Route definitions
- [Router](../../App/ROUTER.md) - Router configuration
