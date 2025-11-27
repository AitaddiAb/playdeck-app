<script setup>
/**
 * App Dialog Component
 *
 * Dialog for displaying app information.
 *
 * @component AppDialog
 */

import { IconCloseLine } from '@iconify-prerendered/vue-mingcute'

const model = defineModel('modelValue')
const props = defineProps({
  title: { type: String, default: '' },
  actions: { type: Array, default: () => [] },
  height: { type: String, default: '260px' },
  width: { type: String, default: '300px' },
})

const barStyle = { width: '8px', backgroundColor: '#fff', opacity: 0.05 }
const thumbStyle = { width: '8px', backgroundColor: '#fff', opacity: 0.1 }
</script>

<template>
  <QDialog v-model="model" persistent>
    <QCard flat bordered class="dialog-card" :style="{ height: props.height, width: props.width }">
      <!-- Header -->
      <div class="d-c-header flex justify-start items-center" style="height: 28px">
        <div class="q-px-sm">
          <QBtn unelevated dense class="app-w-c bg-transparent-5" size="sm" text-color="red-5" v-close-popup>
            <IconCloseLine />
          </QBtn>
        </div>
        <QSeparator vertical inset />

        <div class="q-px-sm" v-if="props.title">
          <div class="text-caption text-blue-1 opacity-80">{{ props.title }}</div>
        </div>
      </div>

      <!-- Content -->
      <div class="d-c-content" style="height: calc(100% - 40px - 28px)">
        <QScrollArea class="fit q-pa-sm" :bar-style="barStyle" :thumb-style="thumbStyle">
          <slot />
        </QScrollArea>
      </div>

      <!-- Footer -->
      <div class="d-c-footer q-py-xs q-px-sm" style="height: 40px">
        <div class="fit flex justify-end items-center q-gutter-x-sm">
          <QBtn
            v-for="(a, i) in props.actions"
            :key="i"
            :flat="a.flat || false"
            :outline="a.outline || false"
            :unelevated="a.unelevated || false"
            :color="a.color || 'primary'"
            :label="a.label || `Action ${i + 1}`"
            :class="a.class || ''"
            :loading="a.loading || false"
            :disabled="a.disabled || false"
            @click="a.action"
            style="min-width: 80px"
            no-caps
            dense
          />
        </div>
      </div>
    </QCard>
  </QDialog>
</template>

<style lang="sass">
.dialog-card
  max-width: calc(100vw - 64px * 2) !important
  max-height: calc(100vh - 64px * 2) !important
  .d-c-header
    background-color: $dark !important
  .d-c-content
    background-color: $dark-page !important
  .d-c-footer
    background-color: $dark !important
</style>
