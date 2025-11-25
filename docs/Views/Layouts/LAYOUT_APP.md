# LayoutApp

**Location**: `src/Views/Layouts/LayoutApp.vue`

**Description**: Root application layout component. Composes the main application structure using modular components.

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Overview](#overview)
- [Features](#features)
- [Structure](#structure)
- [Components Used](#components-used)
- [Dependencies](#dependencies)
- [Usage](#usage)
- [Related Documentation](#related-documentation)

## Overview

The App layout is the root layout component that wraps the entire application. It uses Quasar's `QLayout` component and composes the application structure from modular components.

## Features

- Global Quasar styles import
- Application-specific styles
- Modular component architecture
- Desktop-only features (window controls, frameless window)
- Quasar layout system integration

## Structure

```vue
<QLayout view="lHh lpr lFf">
  <AppHeader />
  <AppSidebar />
  <AppPage />
  <!-- <AppFooter /> -->
</QLayout>
```

### Layout View Configuration

The `view="lHh lpr lFf"` prop configures the Quasar layout:
- `l` - Left drawer (sidebar)
- `H` - Header
- `h` - Header offset
- `p` - Page container
- `r` - Right drawer (not used)
- `F` - Footer (commented out)
- `f` - Footer offset (not used)

## Components Used

The layout uses the following components:

- **[AppHeader](../Components/APP_HEADER.md)** - Top header bar with window controls
- **[AppSidebar](../Components/APP_SIDEBAR.md)** - Left sidebar with navigation and window controls
- **[AppPage](../Components/APP_PAGE.md)** - Main page container with router view
- **[AppFooter](../Components/APP_FOOTER.md)** - Bottom footer (commented, ready for use)

## Dependencies

- `quasar/src/css/index.sass` - Quasar global styles
- `@/Styles/App.sass` - Application-specific styles
- `@/Views/Components/App/AppHeader.vue` - Header component
- `@/Views/Components/App/AppSidebar.vue` - Sidebar component
- `@/Views/Components/App/AppPage.vue` - Page container component
- `@/Views/Components/App/AppFooter.vue` - Footer component (commented)

## Usage

The layout is automatically used as the root component in `src/App/App.js`:

```javascript
import LayoutApp from '@/Views/Layouts/LayoutApp.vue'

const App = createApp(LayoutApp)
App.mount('#app')
```

## Related Documentation

- [App.js](../../App/APP.md) - Application entry point
- [AppHeader Component](../Components/APP_HEADER.md) - Header component
- [AppSidebar Component](../Components/APP_SIDEBAR.md) - Sidebar component
- [AppPage Component](../Components/APP_PAGE.md) - Page container component
- [AppFooter Component](../Components/APP_FOOTER.md) - Footer component
- [Views README](../README.md) - Views overview

