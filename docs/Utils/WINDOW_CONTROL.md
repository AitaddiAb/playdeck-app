# WindowControl.js

**Location**: `src/Utils/WindowControl.js`

**Description**: Utility for controlling the Tauri application window. Provides a simplified API for window operations.

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Overview](#overview)
- [Features](#features)
- [Methods](#methods)
  - [`minimize()`](#minimize)
  - [`maximize()`](#maximize)
  - [`unmaximize()`](#unmaximize)
  - [`toggleMaximize()`](#togglemaximize)
  - [`close()`](#close)
  - [`setFullscreen(fullscreen)`](#setfullscreenfullscreen)
  - [`toggleFullscreen()`](#togglefullscreen)
  - [`isMaximized()`](#ismaximized)
  - [`isFullscreen()`](#isfullscreen)
- [Usage](#usage)
  - [Basic Usage](#basic-usage)
  - [In Template](#in-template)
  - [Check Window State](#check-window-state)
- [Platform Detection](#platform-detection)
- [Error Handling](#error-handling)
- [Dependencies](#dependencies)
- [Related Documentation](#related-documentation)

## Overview

Provides a clean, promise-based API for controlling the Tauri application window. All methods automatically handle platform detection and error handling.

## Features

- Window minimize, maximize, unmaximize, toggle maximize
- Window close
- Fullscreen toggle and set
- Window state checking (isMaximized, isFullscreen)
- Desktop-only (silently returns on non-desktop platforms)
- Error handling for all operations

## Methods

### `minimize()`

Minimize the window.

```javascript
await WindowControl.minimize()
```

### `maximize()`

Maximize the window.

```javascript
await WindowControl.maximize()
```

### `unmaximize()`

Unmaximize the window.

```javascript
await WindowControl.unmaximize()
```

### `toggleMaximize()`

Toggle between maximized and normal state.

```javascript
await WindowControl.toggleMaximize()
```

### `close()`

Close the window.

```javascript
await WindowControl.close()
```

### `setFullscreen(fullscreen)`

Set fullscreen mode.

**Parameters**:
- `fullscreen` (boolean): `true` to enter fullscreen, `false` to exit

```javascript
await WindowControl.setFullscreen(true)
await WindowControl.setFullscreen(false)
```

### `toggleFullscreen()`

Toggle fullscreen mode.

```javascript
await WindowControl.toggleFullscreen()
```

### `isMaximized()`

Check if window is maximized.

**Returns**: `Promise<boolean>`

```javascript
const maximized = await WindowControl.isMaximized()
if (maximized) {
  // Window is maximized
}
```

### `isFullscreen()`

Check if window is fullscreen.

**Returns**: `Promise<boolean>`

```javascript
const fullscreen = await WindowControl.isFullscreen()
if (fullscreen) {
  // Window is fullscreen
}
```

## Usage

### Basic Usage

```javascript
import { WindowControl } from '@/Utils/WindowControl'

// In a component
export default {
  methods: {
    async handleMinimize() {
      await WindowControl.minimize()
    },
    async handleClose() {
      await WindowControl.close()
    }
  }
}
```

### In Template

```vue
<template>
  <q-btn @click="WindowControl.minimize()">Minimize</q-btn>
  <q-btn @click="WindowControl.toggleMaximize()">Maximize</q-btn>
  <q-btn @click="WindowControl.close()">Close</q-btn>
</template>

<script setup>
import { WindowControl } from '@/Utils/WindowControl'
</script>
```

### Check Window State

```javascript
import { WindowControl } from '@/Utils/WindowControl'

async function checkWindowState() {
  const isMaximized = await WindowControl.isMaximized()
  const isFullscreen = await WindowControl.isFullscreen()
  
  console.log('Maximized:', isMaximized)
  console.log('Fullscreen:', isFullscreen)
}
```

## Platform Detection

All methods automatically check if running on desktop. On non-desktop platforms, methods silently return without performing any action.

```javascript
// This will only work on desktop (Windows, macOS, Linux)
await WindowControl.minimize()

// On mobile/browser, it will silently return
```

## Error Handling

All methods include error handling. Errors are logged to the console but don't throw exceptions:

```javascript
// If window control fails, error is logged but doesn't crash the app
await WindowControl.minimize()
```

## Dependencies

- `@/App/Platform`: Platform detection (`isDesktop`)
- `@tauri-apps/api/window`: Tauri window API (`getCurrentWindow`)

## Related Documentation

- [Platform Detection](../App/PLATFORM.md) - Platform utilities
- [ContextMenu](./CONTEXT_MENU.md) - Context menu utility

