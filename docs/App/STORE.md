# Store.js

**Location**: `src/App/Store.js`

**Description**: Pinia store initialization. Creates the Pinia instance for state management.

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Overview](#overview)
- [Status](#status)
- [Usage](#usage)
- [Future Stores](#future-stores)
- [Related Documentation](#related-documentation)

## Overview

Initializes the Pinia instance for state management. All stores should be created in the `src/Stores/` directory and can be imported and used throughout the application.

## Status

- Pinia instance created and ready
- Stores can be added to `src/Stores/` directory
- Store instances can be imported and used throughout the app

## Usage

```javascript
// Create a store in src/Stores/App/AppStore.js
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    // state
  }),
  getters: {
    // getters
  },
  actions: {
    // actions
  }
})

// Use in components
import { useAppStore } from '@/Stores/App/AppStore'
const appStore = useAppStore()
```

## Future Stores

Planned stores:

- **AppStore**: App-level state (UI, theme, sidebar)
- **GameStore**: Game library management
- **SettingsStore**: Application settings

## Related Documentation

- [App.js](./APP.md) - Application entry point

