# Platform.js

**Location**: `src/App/Platform.js`

**Description**: Platform detection plugin. Detects Tauri desktop app or browser environment.

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Overview](#overview)
- [Features](#features)
- [Exports](#exports)
  - [Constants](#constants)
- [Usage](#usage)
  - [Import in Components](#import-in-components)
  - [Global Properties](#global-properties)
- [Platform Detection](#platform-detection)
- [HMR Warning Filtering](#hmr-warning-filtering)
- [Related Documentation](#related-documentation)

## Overview

Provides platform detection capabilities to determine if the application is running in a Tauri desktop environment or a browser. Also provides platform-specific constants and utilities.

## Features

- Detects if running in Tauri desktop app
- Gets OS type when in Tauri (windows, macos, linux, etc.)
- Falls back to 'browser' when not in Tauri
- Provides platform-specific constants and utilities
- Filters Tauri HMR warnings during development

## Exports

### Constants

- `Platform`: Current platform string ('browser' | 'windows' | 'macos' | 'linux' | 'android' | 'ios')
- `isDesktop`: Boolean - true if running on desktop (Windows, macOS, Linux)
- `isMobile`: Boolean - true if running on mobile (Android, iOS)
- `isMacOS`: Boolean - true if running on macOS
- `isWindows`: Boolean - true if running on Windows
- `isLinux`: Boolean - true if running on Linux

## Usage

### Import in Components

```javascript
import { isDesktop, isMacOS, Platform } from '@/App/Platform'

if (isDesktop) {
  // Desktop-specific code
}

if (isMacOS) {
  // macOS-specific code
}
```

### Global Properties

The plugin also registers global Vue properties:

```javascript
// In components
this.$platform // Platform string
this.$isDesktop // Boolean
this.$isMobile // Boolean
this.$isMacOS // Boolean
this.$isWindows // Boolean
this.$isLinux // Boolean
```

## Platform Detection

Platform detection is synchronous. The value is determined at module load time:

```javascript
import { isTauri } from '@tauri-apps/api/core'
import { type } from '@tauri-apps/plugin-os'

export const Platform = isTauri() ? type() : 'browser'
```

## HMR Warning Filtering

During development, the module filters Tauri HMR warnings to reduce console noise. These warnings are harmless and expected when using Tauri with Hot Module Replacement.

## Related Documentation

- [App.js](./APP.md) - Application entry point
- [WindowControl](../Utils/WINDOW_CONTROL.md) - Uses platform detection

