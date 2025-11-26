<script setup>
/**
 * Application Header Component
 *
 * Top header bar with window controls.
 * Only visible on desktop platforms.
 *
 * @component AppHeader
 */

import { onMounted } from 'vue'
import { isDesktop } from '@/App/Platform'
import { WindowControl } from '@/Utils/WindowControl'
import { ContextMenu } from '@/Utils/ContextMenu'
import { IconTriangleLine } from '@iconify-prerendered/vue-mingcute'

// Setup AppBar context menu
const AppBarContextMenu = [
  { id: 'fullscreen', label: 'Fullscreen', action: WindowControl.toggleFullscreen },
  { id: 'minimize', label: 'Minimize', action: WindowControl.minimize },
  { id: 'maximize', label: 'Maximize', action: WindowControl.toggleMaximize },
  { id: 'close', label: 'Close', action: WindowControl.close },
]

onMounted(async () => {
  if (isDesktop) {
    await ContextMenu.create('#AppBar', AppBarContextMenu)
  }
})
</script>

<template>
  <QHeader v-if="isDesktop" id="AppBar" class="bg-dark" style="height: 28px">
    <div class="fit flex justify-end items-center q-px-sm" data-tauri-drag-region>
      <QBtn
        unelevated
        dense
        class="app-w-c bg-transparent-10"
        size="sm"
        text-color="green-5"
        @click="WindowControl.toggleFullscreen()"
      >
        <IconTriangleLine />
      </QBtn>
    </div>
  </QHeader>
</template>

<style lang="sass" scoped>
/**
 * Application Window Controls
 */
$app-w-c-size: 14px

.app-w-c
  width: $app-w-c-size !important
  height: $app-w-c-size !important
  max-width: $app-w-c-size !important
  max-height: $app-w-c-size !important
  min-width: $app-w-c-size !important
  min-height: $app-w-c-size !important
  padding: 0 !important
  overflow: hidden
  border-radius: 50%
  margin: 0 2px !important
  q-btn__content
    display: flex !important
    justify-content: center !important
    align-items: center !important
    width: 100% !important
    height: 100% !important
    overflow: hidden !important
</style>
