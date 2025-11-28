<script setup>
/**
 * Application Layout Component
 *
 * Main layout wrapper for the application.
 * Includes navigation header and router view for page content.
 *
 * @component LayoutApp
 */

import AppHeader from '@/Views/Components/App/AppHeader.vue'
import AppSidebar from '@/Views/Components/App/AppSidebar.vue'
import AppPage from '@/Views/Components/App/AppPage.vue'
import GameMetadataDialog from '@/Views/Components/GameMetadataDialog.vue'
// import AppFooter from '@/Views/Components/App/AppFooter.vue'

import { GamesStore, SettingsStore } from '@/Stores'
import { onMounted } from 'vue'

// Import global styles
import 'quasar/src/css/index.sass'
import '@/Styles/App.sass'

onMounted(() => {
  SettingsStore.InitSettings()
  GamesStore.LoadGames()
})
</script>

<template>
  <QLayout view="lHh lpr lFf">
    <AppHeader />

    <AppSidebar />

    <AppPage />

    <GameMetadataDialog />

    <!-- <AppFooter /> -->
  </QLayout>
</template>
