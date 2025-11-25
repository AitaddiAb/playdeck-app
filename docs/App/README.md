# App Directory Documentation

The `src/App/` directory contains the core application setup, plugins, and configuration files.

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Overview](#overview)
- [Files](#files)
  - [Core Files](#core-files)
- [Plugin Registration Order](#plugin-registration-order)
- [Usage](#usage)
- [Related Documentation](#related-documentation)

## Overview

This directory includes all the essential files that initialize and configure the Vue application, including:

- Application entry point
- Router configuration
- Store management (Pinia)
- Platform detection
- UI framework (Quasar)
- Translation system

## Files

### Core Files

- **[APP.md](./APP.md)** - `App.js` - Application entry point and plugin registration
- **[ROUTER.md](./ROUTER.md)** - `Router.js` - Vue Router configuration
- **[STORE.md](./STORE.md)** - `Store.js` - Pinia store initialization
- **[PLATFORM.md](./PLATFORM.md)** - `Platform.js` - Platform detection (Tauri/browser)
- **[QUASAR.md](./QUASAR.md)** - `Quasar.js` - Quasar UI framework configuration
- **[LANGUAGE.md](./LANGUAGE.md)** - `Language.js` - Internationalization (i18n) system

## Plugin Registration Order

The plugins are registered in `App.js` in the following order:

1. **Store** - Pinia state management
2. **Router** - Vue Router for navigation
3. **Quasar** - UI framework with plugins
4. **Platform** - Platform detection plugin
5. **Language** - Translation system ($t function)

## Usage

All plugins are automatically registered when the application starts. They are available globally:

```javascript
// Platform detection
import { isDesktop, isMacOS } from '@/App/Platform'

// Translation
this.$t('global.save')

// Router
this.$router.push('/settings')

// Store
import { useAppStore } from '@/Stores/App/AppStore'
```

---

## Related Documentation

- [Utils Documentation](../Utils/README.md) - Utility functions
- [Views Documentation](../Views/README.md) - Components and layouts
- [Routes Documentation](../Routes/README.md) - Route definitions

