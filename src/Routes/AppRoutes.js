/**
 * Application Routes Configuration
 *
 * Defines all application routes with lazy-loaded components.
 * Routes use dynamic imports for code splitting and better performance.
 *
 * @module Routes
 */

/**
 * Application routes array
 * @type {Array<Object>}
 */
export const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('@/Views/Pages/DashboardPage.vue'),
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('@/Views/Pages/SettingsPage.vue'),
  },
]
