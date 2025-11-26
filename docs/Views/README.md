# Views Directory Documentation

The `src/Views/` directory contains all Vue components, layouts, and pages.

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Overview](#overview)
- [Structure](#structure)
- [Components](#components)
- [Layouts](#layouts)
  - [LayoutApp](#layoutapp)
- [Pages](#pages)
  - [PageDashboard](#pagedashboard)
  - [PageSettings](#pagesettings)
- [Related Documentation](#related-documentation)

## Overview

This directory is organized into three main subdirectories:

- **Components**: Reusable Vue components
- **Layouts**: Layout wrapper components
- **Pages**: Page components (route views)

## Structure

```
src/Views/
├── Components/          # Reusable components
│   └── App/            # App-specific components
│       ├── AppHeader.vue
│       ├── AppSidebar.vue
│       ├── AppPage.vue
│       └── AppFooter.vue
├── Layouts/            # Layout components
│   └── LayoutApp.vue   # Main application layout
└── Pages/              # Page components
    ├── PageDashboard.vue
    └── PageSettings.vue
```

## Components

Reusable components are located in `src/Views/Components/`:

### App Components

App-specific components in `src/Views/Components/App/`:

- **[AppHeader](./Components/APP_HEADER.md)** - Top header bar with window controls
- **[AppSidebar](./Components/APP_SIDEBAR.md)** - Left sidebar with navigation and window controls
- **[AppPage](./Components/APP_PAGE.md)** - Main page container with router view
- **[AppFooter](./Components/APP_FOOTER.md)** - Bottom footer component

### Game Components

- **[GameCard](./Components/GAME_CARD.md)** - Game card component with context menu support

## Layouts

### LayoutApp

**Location**: `src/Views/Layouts/LayoutApp.vue`

Root application layout component. Composes the main application structure using modular components.

See [LAYOUT_APP.md](./Layouts/LAYOUT_APP.md) for detailed documentation.

## Pages

Page components are loaded via Vue Router and defined in `src/Routes/AppRoutes.js`.

### PageDashboard

**Location**: `src/Views/Pages/PageDashboard.vue`

Main dashboard/home page.

See [PAGE_DASHBOARD.md](./Pages/PAGE_DASHBOARD.md) for detailed documentation.

### PageSettings

**Location**: `src/Views/Pages/PageSettings.vue`

Application settings page.

See [PAGE_SETTINGS.md](./Pages/PAGE_SETTINGS.md) for detailed documentation.

---

## Related Documentation

- [Components](./Components/) - Component documentation
- [Routes](../Routes/README.md) - Route definitions
- [App Documentation](../App/README.md) - Core application setup
