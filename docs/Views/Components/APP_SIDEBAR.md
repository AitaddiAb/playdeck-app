# AppSidebar Component

**Location**: `src/Views/Components/App/AppSidebar.vue`

**Description**: Left sidebar component with window controls and navigation. Only visible on desktop platforms.

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Overview](#overview)
- [Features](#features)
- [Window Controls](#window-controls)
- [Navigation](#navigation)
- [Dependencies](#dependencies)
- [Usage](#usage)
- [Related Documentation](#related-documentation)

## Overview

The AppSidebar component provides the left sidebar navigation for the application. It includes window controls at the top and navigation buttons for routes.

## Features

- Window controls (close, maximize, minimize)
- Navigation buttons for routes
- Active route highlighting
- Mini drawer mode (collapsed by default)
- Desktop-only rendering

## Window Controls

The sidebar includes three window control buttons at the top:

- **Close**: Red circle icon button that closes the window
- **Maximize toggle**: Pink square icon button that toggles maximize/unmaximize
- **Minimize**: Blue circle icon button that minimizes the window

## Navigation

- Dynamic route buttons from `AppRoutes.js`
- Active route highlighting with background (`bg-transparent-10`)
- Icon-based navigation using route icons

## Dependencies

- `@/App/Platform`: Platform detection (`isDesktop`)
- `@/Utils/WindowControl`: Window control functions
- `@/Routes/AppRoutes`: Route definitions
- `vue-router`: Route navigation (`useRoute`)
- `@iconify-prerendered/vue-mingcute`: Icon components (`IconCloseLine`, `IconRoundLine`, `IconSquareLine`)

## Usage

The component is automatically used in the main layout:

```vue
<AppSidebar />
```

The sidebar uses Quasar's `QDrawer` component with mini mode enabled.

## Related Documentation

- [WindowControl](../../Utils/WINDOW_CONTROL.md) - Window control utility
- [Routes](../../Routes/README.md) - Route definitions
- [Platform](../../App/PLATFORM.md) - Platform detection

