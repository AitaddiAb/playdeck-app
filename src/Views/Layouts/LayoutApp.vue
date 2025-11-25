<script setup>
/**
 * Application Layout Component
 *
 * Main layout wrapper for the application.
 * Includes navigation header and router view for page content.
 *
 * @component LayoutApp
 */

// Import global styles
import 'quasar/src/css/index.sass'
import '@/Styles/App.sass'

import AppHeader from '@/Views/Components/App/AppHeader.vue'
import AppSidebar from '@/Views/Components/App/AppSidebar.vue'
import AppPage from '@/Views/Components/App/AppPage.vue'
// import AppFooter from '@/Views/Components/App/AppFooter.vue'
</script>

<template>
  <QLayout view="lHh lpr lFf">
    <AppHeader />

    <AppSidebar />

    <AppPage />

    <!-- <AppFooter /> -->
  </QLayout>
</template>
