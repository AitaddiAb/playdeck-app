/**
 * Vue Router Configuration
 *
 * Configures the application routing with history mode and catch-all redirect.
 * All routes are imported from the centralized routes file.
 *
 * @module Router
 */

import { createRouter, createWebHistory } from 'vue-router'
import { routes } from '@/Routes/AppRoutes'

/**
 * Router instance
 * Uses WebHistory mode for clean URLs
 * Includes catch-all route that redirects to home
 *
 * @type {Object}
 */
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

export default router
