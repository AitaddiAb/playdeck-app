# App.js

**Location**: `src/App/App.js`

**Description**: Application entry point. Initializes Vue app and registers all plugins.

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Overview](#overview)
- [Plugins Registered](#plugins-registered)
- [Entry Point](#entry-point)
- [Code Structure](#code-structure)
- [Related Documentation](#related-documentation)

## Overview

This is the main bootstrap file that starts the application. It creates the Vue application instance and registers all necessary plugins in the correct order.

## Plugins Registered

The following plugins are registered in order:

1. **Store** - Pinia state management (`src/App/Store.js`)
2. **Router** - Vue Router for navigation (`src/App/Router.js`)
3. **Quasar** - UI framework with plugins (`src/App/Quasar.js`)
4. **Platform** - Platform detection (Tauri/browser) (`src/App/Platform.js`)
5. **Language** - Translation system ($t function) (`src/App/Language.js`)

## Entry Point

Referenced in `index.html` as `/src/App/App.js`

## Code Structure

```javascript
import { createApp } from 'vue'
import Store from './Store.js'
import Router from './Router.js'
import Quasar from './Quasar.js'
import Platform from './Platform.js'
import Language from './Language.js'
import LayoutApp from '@/Views/Layouts/LayoutApp.vue'

const App = createApp(LayoutApp)

App.use(Store)
App.use(Router)
App.use(Quasar)
App.use(Platform)
App.use(Language)

App.mount('#app')
```

## Related Documentation

- [Router](./ROUTER.md) - Router configuration
- [Store](./STORE.md) - Store management
- [Quasar](./QUASAR.md) - UI framework
- [Platform](./PLATFORM.md) - Platform detection
- [Language](./LANGUAGE.md) - Translation system
