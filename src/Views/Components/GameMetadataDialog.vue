<script setup>
/**
 * Game Metadata Dialog Component
 *
 * Dialog for editing game metadata.
 * Automatically shows when game_to_edit is set in GamesStore.
 *
 * @component GameMetadataDialog
 */

import { computed, watch } from 'vue'
import { storeToRefs } from 'pinia'

import { LoadMetadata } from '@/Utils/GameMetadata'
import { GamesStore } from '@/App/Store.js'

const { game_to_edit } = storeToRefs(GamesStore)

const showDialog = computed({
  get: () => game_to_edit.value !== null,
  set: (v) => !v && (game_to_edit.value = null),
})

watch(game_to_edit, async (newVal, oldVal) => {
  if (oldVal === null && newVal !== null) {
    const metadata = await LoadMetadata(newVal)
    console.log(metadata)
  }
})
</script>

<template>
  <QDialog v-model="showDialog">
    <QCard>
      <QCardSection>
        <div class="text-h6">Edit Metadata</div>
        <div v-if="game_to_edit" class="text-caption text-grey-6 q-mt-sm">
          {{ game_to_edit.name }}
        </div>
      </QCardSection>

      <QCardSection>
        <div class="text-body2">Metadata editing will be implemented here.</div>
      </QCardSection>

      <QCardActions align="right">
        <QBtn flat label="Close" color="primary" @click="showDialog = false" />
      </QCardActions>
    </QCard>
  </QDialog>
</template>
