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

import { ref, computed, onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { isDesktop } from '@/App/Platform'
import { WindowControl as WC } from '@/Utils/WindowControl'
import { ContextMenu as CM } from '@/Utils/ContextMenu'

// Setup AppBar context menu
const AppBarContextMenu = [
  { label: 'Fullscreen', action: WC.toggleFullscreen },
  { label: 'Minimize', action: WC.minimize },
  { label: 'Maximize', action: WC.toggleMaximize },
  { label: 'Close', action: WC.close },
]

onMounted(async () => await CM.add('#AppBar', AppBarContextMenu))

/**
 * Concept Design CSS
 * @description The CSS of the concept design for the app. for development purposes.
 */
const isDev = ref(import.meta.env.DEV)
const isConceptDesignCSS = computed(() => (isDev.value ? import.meta.env.VITE_APP_CONCEPT_DESIGN_CSS : null))
const showConceptDesign = ref(true)
</script>

<template>
  <div v-if="showConceptDesign && isConceptDesignCSS" :style="isConceptDesignCSS"></div>
  <div id="AppBar" v-if="isDesktop" class="absolute top-0 left-0 right-0 full-width" style="z-index: 1000">
    <!-- Window Controls -->
    <div class="row no-wrap q-gutter-x-xs justify-end q-pa-xs bg-grey-10" data-tauri-drag-region>
      <QBtn
        v-if="isConceptDesignCSS"
        outline
        dense
        class="app-w-c"
        label="C"
        size="sm"
        color="primary"
        @click="showConceptDesign = !showConceptDesign"
      />
      <QBtn outline dense class="app-w-c" label="-" size="sm" color="primary" @click="WC.minimize()" />
      <QBtn outline dense class="app-w-c" label="M" size="sm" color="primary" @click="WC.toggleMaximize()" />
      <QBtn outline dense class="app-w-c" label="F" size="sm" color="primary" @click="WC.toggleFullscreen()" />
      <QBtn outline dense class="app-w-c" label="X" size="sm" color="negative" @click="WC.close()" />
    </div>
  </div>

  <QCard
    dark
    flat
    unelevated
    class="fit"
    :class="`${showConceptDesign && isConceptDesignCSS ? 'bg-transparent' : ''}`"
    style="padding-top: calc(20px + 0.75rem)"
  >
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
