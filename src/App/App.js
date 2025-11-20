/**
 * Application Entry Point
 *
 * Initializes the Vue application and registers all plugins.
 * This is the main bootstrap file that starts the application.
 *
 * @module App
 */

// Import Vue
import { createApp } from 'vue'

// Import plugins and configurations
import Store from './Store.js'
import Router from './Router.js'
import Quasar from './Quasar.js'
import Platform from './Platform.js'
import Language from './Language.js'

// Import root component
import AppLayout from '@/Views/Layouts/App.vue'

/**
 * Create Vue application instance
 */
const App = createApp(AppLayout)

/**
 * Register all plugins and configurations
 */
App.use(Store) // State management (Pinia stores)
App.use(Router) // Routing (Vue Router)
App.use(Quasar) // UI framework (Quasar)
App.use(Platform) // Platform detection plugin
App.use(Language) // Translation system ($t function)

/**
 * Mount Vue application to the DOM
 * The app will be mounted to the element with id="app"
 */
App.mount('#app')
