# Router.js

**Location**: `src/App/Router.js`

**Description**: Vue Router configuration with HTML5 history mode and catch-all redirect.

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Overview](#overview)
- [Features](#features)
- [Configuration](#configuration)
- [Routes](#routes)
- [Usage](#usage)
- [Related Documentation](#related-documentation)

## Overview

Configures the application routing system using Vue Router with HTML5 history mode. All routes are imported from the centralized routes file.

## Features

- HTML5 history mode (`createWebHistory`)
- Centralized route definitions from `AppRoutes.js`
- Automatic 404 handling (redirects to home)
- Catch-all route for unmatched paths

## Configuration

```javascript
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from '@/Routes/AppRoutes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...routes,
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
})
```

## Routes

Routes are defined in `src/Routes/AppRoutes.js`:

- `/` → PageDashboard (name: 'Dashboard')
- `/settings` → PageSettings (name: 'Settings')
- `/:pathMatch(.*)*` → Catch-all redirect to `/`

## Usage

The router is automatically registered in `App.js` and available globally:

```javascript
// In components
this.$router.push('/settings')
this.$router.replace('/')
this.$router.go(-1)

// Programmatic navigation
import { useRouter } from 'vue-router'
const router = useRouter()
router.push({ name: 'Dashboard' })
```

## Related Documentation

- [Routes Documentation](../Routes/README.md) - Route definitions
- [App.js](./APP.md) - Application entry point

