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
- [Element Availability](#element-availability)
- [Menu Item Caching](#menu-item-caching)
- [Empty Submenu Handling](#empty-submenu-handling)
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
- Submenu support with nested items
- Empty submenu handling (shows disabled "Nothing there" item)
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
  - `type` (string, optional): Set to `'PredefinedMenuItem'` to create a predefined menu item (e.g., separator) or `'Submenu'` to create a submenu
  - `options` (Object, optional): Options for PredefinedMenuItem (required when `type` is `'PredefinedMenuItem'`)
    - `item` (string): Predefined item type (e.g., `'Separator'`)
    - `text` (string, optional): Text for the predefined item
  - `text` (string, optional): Submenu text (required when `type` is `'Submenu'`)
  - `items` (Array, optional): Array of menu items for submenu (required when `type` is `'Submenu'`)

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

### Adding Separators

Separators can be added between menu items using PredefinedMenuItem:

```javascript
await ContextMenu.add('#myElement', [
  { label: 'Option 1', action: () => console.log('Option 1') },
  { 
    type: 'PredefinedMenuItem', 
    options: { text: 'separator-text', item: 'Separator' } 
  },
  { label: 'Option 2', action: () => console.log('Option 2') }
])
```

### Adding Submenus

Submenus allow you to group menu items under categories. Submenus can contain regular items, separators, and even nested submenus:

```javascript
await ContextMenu.add('#myElement', [
  { label: 'Play', action: () => console.log('Play') },
  {
    type: 'Submenu',
    text: 'Actions',
    items: [
      { label: 'Action 1', action: () => console.log('Action 1') },
      { label: 'Action 2', action: () => console.log('Action 2') }
    ]
  }
])
```

**Example with nested structure:**
```javascript
await ContextMenu.add('#myElement', [
  { label: 'Play', action: () => console.log('Play') },
  {
    type: 'Submenu',
    text: 'Actions',
    items: [
      { label: 'Action 1', action: () => console.log('Action 1') },
      { 
        type: 'PredefinedMenuItem', 
        options: { text: 'separator-text', item: 'Separator' } 
      },
      { label: 'Action 2', action: () => console.log('Action 2') }
    ]
  }
])
```

**Empty Submenu Handling:**
If a submenu has no items (empty array), it will automatically display a disabled "Nothing there" item:

```javascript
// Empty submenu will show "Nothing there" (disabled)
await ContextMenu.add('#myElement', [
  {
    type: 'Submenu',
    text: 'Actions',
    items: [] // Empty array
  }
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

## Element Availability

`ContextMenu.add()` expects the element to exist in the DOM when called. It should be called from `onMounted()` lifecycle hook in Vue components to ensure the element is available.

```javascript
// In Vue component
onMounted(async () => {
  await ContextMenu.add('#myElement', items)
})
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

## Empty Submenu Handling

If a submenu is created with an empty `items` array (length < 1), the utility automatically adds a disabled "Nothing there" menu item to prevent empty submenus:

```javascript
// This will show "Nothing there" (disabled) in the submenu
await ContextMenu.add('#myElement', [
  {
    type: 'Submenu',
    text: 'Actions',
    items: [] // Empty array triggers the "Nothing there" item
  }
])
```

This ensures that submenus always have at least one item, providing better UX by showing a clear indication when there are no actions available.

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
- `@tauri-apps/api/menu`: Tauri menu API (`Menu`, `MenuItem`, `PredefinedMenuItem`, `Submenu`)

## Related Documentation

- [Platform Detection](../App/PLATFORM.md) - Platform utilities
- [WindowControl](./WINDOW_CONTROL.md) - Window control utility

