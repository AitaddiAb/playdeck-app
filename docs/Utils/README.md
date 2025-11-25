# Utils Directory Documentation

The `src/Utils/` directory contains utility functions and helpers used throughout the application.

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Overview](#overview)
- [Files](#files)
- [Usage](#usage)
- [Dependencies](#dependencies)
- [Related Documentation](#related-documentation)

## Overview

This directory includes reusable utilities that provide common functionality:

- Window control for Tauri desktop applications
- Context menu management for native menus
- Other helper functions

## Files

- **[WINDOW_CONTROL.md](./WINDOW_CONTROL.md)** - `WindowControl.js` - Tauri window control utility
- **[CONTEXT_MENU.md](./CONTEXT_MENU.md)** - `ContextMenu.js` - Native context menu utility

## Usage

All utilities can be imported directly:

```javascript
import { WindowControl } from '@/Utils/WindowControl'
import { ContextMenu } from '@/Utils/ContextMenu'
```

## Dependencies

Most utilities depend on:

- `@/App/Platform` - Platform detection (`isDesktop`)
- Tauri APIs - For desktop-specific features

---

## Related Documentation

- [App Documentation](../App/README.md) - Core application setup
- [Platform Detection](../App/PLATFORM.md) - Platform utilities

