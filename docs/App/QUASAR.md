# Quasar.js

**Location**: `src/App/Quasar.js`

**Description**: Quasar UI framework configuration and plugin registration.

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Overview](#overview)
- [Plugins Enabled](#plugins-enabled)
- [Configuration](#configuration)
- [Usage](#usage)
  - [Notify (Toast Notifications)](#notify-toast-notifications)
  - [Loading](#loading)
  - [LoadingBar](#loadingbar)
  - [Complete Example](#complete-example)
- [Theme Configuration](#theme-configuration)
- [Icon Set](#icon-set)
- [Related Documentation](#related-documentation)

## Overview

Configures and registers the Quasar UI framework with Vue. Enables global Quasar plugins and sets up the framework for use throughout the application.

## Plugins Enabled

The following Quasar plugins are enabled:

- **Notify**: Toast notifications for user feedback
- **Loading**: Loading overlay/spinner for async operations
- **LoadingBar**: Progress bar at top of page for navigation/loading states

## Configuration

```javascript
import { Quasar, Notify, Loading, LoadingBar } from 'quasar'

const plugins = { Notify, Loading, LoadingBar }

const quasar = {
  install(app) {
    app.use(Quasar, { plugins, config: { dark: true } })
  },
}
```

## Usage

Quasar plugins are accessed using the `useQuasar()` composable in the Composition API.

### Notify (Toast Notifications)

```javascript
import { useQuasar } from 'quasar'

// In setup() or <script setup>
const $q = useQuasar()

// Success notification
$q.notify({
  type: 'positive',
  message: 'Operation successful',
  position: 'top',
})

// Error notification
$q.notify({
  type: 'negative',
  message: 'An error occurred',
  position: 'top',
})
```

### Loading

```javascript
import { useQuasar } from 'quasar'

const $q = useQuasar()

// Show loading overlay
$q.loading.show()

// Hide loading overlay
$q.loading.hide()

// Show with message
$q.loading.show({
  message: 'Loading...',
})
```

### LoadingBar

```javascript
import { useQuasar } from 'quasar'

const $q = useQuasar()

// Show progress bar
$q.loadingBar.start()

// Set progress (0-100)
$q.loadingBar.set(50)

// Increment progress
$q.loadingBar.increment(10)

// Stop progress bar
$q.loadingBar.stop()
```

### Complete Example

```vue
<script setup>
import { useQuasar } from 'quasar'

const $q = useQuasar()

function showNotification() {
  $q.notify({
    type: 'positive',
    message: 'Operation successful',
  })
}

function showLoading() {
  $q.loading.show()
  // Do async work...
  $q.loading.hide()
}
</script>
```

## Theme Configuration

The Quasar theme is configured in `src/Styles/Quasar.sass` with custom colors and variables.

## Icon Set

Icon set can be configured by importing and setting it in the Quasar config. Currently using `@iconify-prerendered/vue-mingcute` for icons.

## Related Documentation

- [App.js](./APP.md) - Application entry point
- [Styles Documentation](../Styles/README.md) - Theme configuration
