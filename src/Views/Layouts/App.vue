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

import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { AppWindow } from '@/Utils/WindowControl'
import { ContextMenu } from '@/Utils/ContextMenu'
import { isDesktop } from '@/App/Platform'

// Setup AppBar context menu
const AppBarContextMenu = [
  { label: 'Fullscreen', action: AppWindow.toggleFullscreen },
  { label: 'Minimize', action: AppWindow.minimize },
  { label: 'Maximize', action: AppWindow.toggleMaximize },
  { label: 'Close', action: AppWindow.close },
]

onMounted(async () => await ContextMenu.add('#AppBar', AppBarContextMenu))
</script>

<template>
  <div id="AppBar" v-if="isDesktop" class="absolute top-0 left-0 right-0 full-width" style="z-index: 1000">
    <!-- Window Controls -->
    <div class="row no-wrap q-gutter-x-xs justify-end q-pa-xs bg-grey-10" data-tauri-drag-region>
      <QBtn outline dense class="app-w-c" label="-" size="sm" color="primary" @click="AppWindow.minimize()" />
      <QBtn outline dense class="app-w-c" label="M" size="sm" color="primary" @click="AppWindow.toggleMaximize()" />
      <QBtn outline dense class="app-w-c" label="F" size="sm" color="primary" @click="AppWindow.toggleFullscreen()" />
      <QBtn outline dense class="app-w-c" label="X" size="sm" color="negative" @click="AppWindow.close()" />
    </div>
  </div>

  <QCard dark flat unelevated class="fit" style="padding-top: calc(20px + 0.75rem)">
    <!-- Navigation Toolbar -->
    <QCardSection class="q-pa-sm">
      <QToolbar class="bg-transparent-10 rounded-sm">
        <QToolbarTitle class="text-weight-medium">Playdeck</QToolbarTitle>
        <div class="q-gutter-x-sm">
          <QBtn outline color="primary" label="Home" to="/" />
          <QBtn outline color="primary" label="Settings" to="/settings" />
        </div>
      </QToolbar>
    </QCardSection>

    <!-- Main Content -->
    <QCardSection>
      <RouterView />
    </QCardSection>
  </QCard>
</template>

<style lang="sass">
/**
 * Application Window Controls
 *
 * @module AppWindowControls
 */
.app-w-c
  width: 20px
  height: 20px
  border-radius: 50%
  display: flex
  justify-content: center
  align-items: center
</style>
