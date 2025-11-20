<script setup>
/**
 * Application Layout Component
 *
 * Main layout wrapper for the application.
 * Includes navigation header and router view for page content.
 *
 * @component AppLayout
 */

// Import global styles
import 'quasar/src/css/index.sass'
import '@/Styles/App.sass'

import { RouterView } from 'vue-router'
</script>

<template>
  <QCard dark flat unelevated class="fit bg-transparent">
    <QCardSection>
      <QToolbar class="bg-transparent-10 rounded-sm">
        <QToolbarTitle> Playdeck </QToolbarTitle>
        <div class="q-gutter-x-sm">
          <QBtn outline color="primary" label="Home" to="/" />
          <QBtn outline color="primary" label="Settings" to="/settings" />
        </div>
      </QToolbar>
    </QCardSection>
    <QCardSection>
      <RouterView />
    </QCardSection>
  </QCard>
</template>

<style lang="sass">

body, html, #app
  width: 100vw
  height: 100vh
  overflow: hidden
  background-color: $dark
</style>
