/**
 * Application Routes Configuration
 *
 * Defines all application routes with lazy-loaded components.
 * Routes use dynamic imports for code splitting and better performance.
 *
 * @module Routes
 */

import { IconGridLine, IconSettings1Line } from '@iconify-prerendered/vue-mingcute'

/**
 * Application routes array
 * @type {Array<Object>}
 */
export const routes = [
  {
    path: '/',
    name: 'Dashboard',
    icon: IconGridLine,
    component: () => import('@/Views/Pages/PageDashboard.vue'),
  },
  {
    path: '/settings',
    name: 'Settings',
    icon: IconSettings1Line,
    component: () => import('@/Views/Pages/PageSettings.vue'),
  },
]
