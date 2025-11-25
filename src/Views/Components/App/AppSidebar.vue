<script setup>
/**
 * Application Sidebar Component
 *
 * Left sidebar with window controls and navigation.
 * Only visible on desktop platforms.
 *
 * @component AppSidebar
 */

import { isDesktop } from '@/App/Platform'
import { WindowControl } from '@/Utils/WindowControl'
import { routes } from '@/Routes/AppRoutes'
import { useRoute } from 'vue-router'
import { IconCloseLine, IconRoundLine, IconSquareLine } from '@iconify-prerendered/vue-mingcute'

const $route = useRoute()
</script>

<template>
  <QDrawer v-if="isDesktop" id="Sidebar" class="bg-dark" mini :mini-width="65" :model-value="true" :breakpoint="1">
    <!-- Window Controls -->
    <div class="center-xy" style="height: 28px">
      <QBtn
        unelevated
        dense
        class="app-w-c bg-transparent-10"
        size="sm"
        text-color="red-5"
        @click="WindowControl.close()"
      >
        <IconCloseLine />
      </QBtn>
      <QBtn
        unelevated
        dense
        class="app-w-c bg-transparent-5"
        size="sm"
        text-color="pink-5"
        @click="WindowControl.toggleMaximize()"
      >
        <IconSquareLine />
      </QBtn>
      <QBtn
        unelevated
        dense
        class="app-w-c bg-transparent-5"
        size="sm"
        text-color="blue-5"
        @click="WindowControl.minimize()"
      >
        <IconRoundLine />
      </QBtn>
    </div>
    <div class="column content-center">
      <div v-for="route in routes" :key="route.path" class="center-xy" style="height: 52px; width: 52px">
        <QBtn
          flat
          :to="route.path"
          :class="`center-xy rounded-sm ${route.path === $route.path ? 'bg-transparent-10' : ''}`"
          style="height: 46px; width: 46px"
        >
          <component :is="route.icon" :class="`center-xy bg-transparent-5`" style="height: 20px; width: 20px" />
        </QBtn>
      </div>
    </div>
  </QDrawer>
</template>

<style lang="sass" scoped>
/**
 * Center the element horizontally and vertically
 */
.center-xy
  display: flex
  justify-content: center
  align-items: center

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
