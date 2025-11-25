# AppHeader Component

**Location**: `src/Views/Components/App/AppHeader.vue`

**Description**: Top header bar component with window controls. Only visible on desktop platforms.

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Overview](#overview)
- [Features](#features)
- [Window Controls](#window-controls)
- [Dependencies](#dependencies)
- [Usage](#usage)
- [Related Documentation](#related-documentation)

## Overview

The AppHeader component provides the top header bar for the application. It includes window controls and supports context menu interactions for desktop platforms.

## Features

- Fullscreen toggle button
- Context menu support (right-click for window controls)
- Window drag region for frameless window
- Desktop-only rendering

## Window Controls

- **Fullscreen toggle**: Green triangle icon button that toggles fullscreen mode

## Dependencies

- `@/App/Platform`: Platform detection (`isDesktop`)
- `@/Utils/WindowControl`: Window control functions
- `@/Utils/ContextMenu`: Context menu utility
- `@iconify-prerendered/vue-mingcute`: Icon components (`IconTriangleLine`)

## Usage

The component is automatically used in the main layout:

```vue
<AppHeader />
```

The context menu is automatically set up on mount with window control options.

## Related Documentation

- [WindowControl](../../Utils/WINDOW_CONTROL.md) - Window control utility
- [ContextMenu](../../Utils/CONTEXT_MENU.md) - Context menu utility
- [Platform](../../App/PLATFORM.md) - Platform detection

