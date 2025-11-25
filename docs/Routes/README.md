# Routes Directory Documentation

The `src/Routes/` directory contains route definitions for the application.

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Overview](#overview)
- [Files](#files)
  - [AppRoutes.js](#approutesjs)
- [Routes](#routes)
- [Features](#features)
- [Route Structure](#route-structure)
- [Usage](#usage)
- [Programmatic Navigation](#programmatic-navigation)
- [Related Documentation](#related-documentation)

## Overview

Routes are defined in a centralized configuration file that supports lazy-loaded components for code splitting.

## Files

### AppRoutes.js

**Location**: `src/Routes/AppRoutes.js`

Centralized application routes configuration with lazy-loaded components.

## Routes

- `/` → PageDashboard (name: 'Dashboard')
- `/settings` → PageSettings (name: 'Settings')

## Features

- Lazy-loaded components for code splitting
- Route names for programmatic navigation
- Dynamic imports using `@/` alias
- Icon definitions for navigation

## Route Structure

```javascript
{
  path: '/',
  name: 'Dashboard',
  icon: IconGridLine,
  component: () => import('@/Views/Pages/PageDashboard.vue')
}
```

## Usage

Routes are automatically registered in `src/App/Router.js`:

```javascript
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

## Programmatic Navigation

```javascript
// Using route name
this.$router.push({ name: 'Dashboard' })

// Using path
this.$router.push('/settings')
```

---

## Related Documentation

- [Router Configuration](../App/ROUTER.md) - Router setup
- [Views Documentation](../Views/README.md) - Page components

