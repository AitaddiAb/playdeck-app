# ContextMenu.js

**Location**: `src/Utils/ContextMenu.js`

**Description**: Utility for creating Tauri native context menus for specific elements. Provides global context menu disabling with selective enablement.

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Overview](#overview)
- [Features](#features)
- [API](#api)
  - [`ContextMenu.add(selector, items)`](#contextmenuaddselector-items)
- [Usage](#usage)
  - [Basic Usage](#basic-usage)
  - [Multiple Items](#multiple-items)
  - [Different Selectors](#different-selectors)
  - [In Vue Components](#in-vue-components)
- [Global Context Menu Disabling](#global-context-menu-disabling)
- [Element Waiting](#element-waiting)
- [Menu Item Caching](#menu-item-caching)
- [HMR Warnings](#hmr-warnings)
- [Dependencies](#dependencies)
- [Related Documentation](#related-documentation)

## Overview

Creates native Tauri context menus that appear when right-clicking on specific elements. The utility automatically disables the default browser context menu globally and only enables custom menus for registered elements.

## Features

- Native Tauri context menus
- Global context menu disabling
- Selective enablement for specific elements
- Supports any CSS selector
- Automatic element waiting (for dynamic elements)
- Menu item caching and management

## API

### `ContextMenu.add(selector, items)`

Add context menu items to an element.

**Parameters**:
- `selector` (string): CSS selector (e.g., "#id", ".class", "tag", "#app .menus")
- `items` (Object|Array): Single menu item or array of menu items
  - `label` (string): Menu item label
  - `action` (Function): Menu item action callback
  - `id` (string, optional): Menu item ID (auto-generated from label if not provided)

**Returns**: `Promise<void>`

## Usage

### Basic Usage

```javascript
import { ContextMenu } from '@/Utils/ContextMenu'
import { isDesktop } from '@/App/Platform'

if (isDesktop) {
  await ContextMenu.add('#myElement', {
    label: 'Option',
    action: () => console.log('Clicked')
  })
}
```

### Multiple Items

```javascript
await ContextMenu.add('#myElement', [
  { label: 'Option 1', action: () => console.log('Option 1') },
  { label: 'Option 2', action: () => console.log('Option 2') },
  { label: 'Option 3', action: () => console.log('Option 3') }
])
```

### Different Selectors

```javascript
// ID selector
await ContextMenu.add('#appBar', items)

// Class selector
await ContextMenu.add('.my-class', items)

// Tag selector
await ContextMenu.add('button', items)

// Complex selector
await ContextMenu.add('#app .menus', items)
```

### In Vue Components

```vue
<script setup>
import { onMounted } from 'vue'
import { ContextMenu } from '@/Utils/ContextMenu'
import { isDesktop } from '@/App/Platform'
import { WindowControl } from '@/Utils/WindowControl'

const menuItems = [
  { label: 'Fullscreen', action: WindowControl.toggleFullscreen },
  { label: 'Minimize', action: WindowControl.minimize },
  { label: 'Maximize', action: WindowControl.toggleMaximize },
  { label: 'Close', action: WindowControl.close }
]

onMounted(async () => {
  if (isDesktop) {
    await ContextMenu.add('#AppBar', menuItems)
  }
})
</script>

<template>
  <div id="AppBar">
    <!-- Content -->
  </div>
</template>
```

## Global Context Menu Disabling

The utility automatically disables the default browser context menu globally. Only elements registered with `ContextMenu.add()` will show a context menu when right-clicked.

## Element Waiting

If an element doesn't exist when `ContextMenu.add()` is called, the utility will wait up to 5 seconds for the element to appear in the DOM. This is useful for dynamically rendered elements.

```javascript
// This will wait for the element to appear
await ContextMenu.add('#dynamicElement', items)
```

## Menu Item Caching

Menus are cached by selector. If you call `ContextMenu.add()` multiple times with the same selector, new items will be added to the existing menu.

```javascript
// First call
await ContextMenu.add('#myElement', [
  { label: 'Option 1', action: () => {} }
])

// Second call - adds to existing menu
await ContextMenu.add('#myElement', [
  { label: 'Option 2', action: () => {} }
])

// Result: Menu with both Option 1 and Option 2
```

## HMR Warnings

During development, you may see "Couldn't find callback id" warnings when the page reloads. These are:

- **Harmless**: Don't affect functionality
- **Development-only**: Won't appear in production
- **Expected behavior**: Normal with Tauri + HMR

These warnings occur because:
1. `MenuItem.new()` and `Menu.new()` create async callbacks in Rust
2. When the page reloads (HMR), the JavaScript context resets
3. Rust tries to call back to JavaScript, but the callback IDs no longer exist

We cannot prevent them from JavaScript because Rust callbacks cannot be cancelled.

## Dependencies

- `@/App/Platform`: Platform detection (`isDesktop`)
- `@tauri-apps/api/menu`: Tauri menu API (`Menu`, `MenuItem`)

## Related Documentation

- [Platform Detection](../App/PLATFORM.md) - Platform utilities
- [WindowControl](./WINDOW_CONTROL.md) - Window control utility

