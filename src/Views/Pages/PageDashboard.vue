<script setup>
/**
 * Dashboard Page Component
 *
 * Main dashboard view displaying game library overview and statistics.
 *
 * @component PageDashboard
 */
import GameCard from '@/Views/Components/GameCard.vue'

import { computed } from 'vue'
import { storeToRefs } from 'pinia'

import { SettingsStore, GamesStore } from '@/App/Store.js'

const { games_path } = storeToRefs(SettingsStore)
const { games_sorted } = storeToRefs(GamesStore)

/**
 * Check if games folder is set
 */
const hasGamesFolder = computed(() => games_path.value !== null && games_path.value !== '')
</script>

<template>
  <QPage class="dashboard" :style-fn="(offset) => `height: calc(100vh - ${offset}px); width: 100%`">
    <QScrollArea class="fit">
      <!-- No folder selected -->
      <QCard v-if="!hasGamesFolder" class="text-center q-pa-lg">
        <QCardSection>
          <div class="text-h6 q-mt-md">No Games Folder Selected</div>
          <div class="text-body2 text-grey-6 q-mt-sm">Please select a games folder in Settings</div>
          <QBtn color="primary" label="Go to Settings" class="q-mt-md" to="/settings" />
        </QCardSection>
      </QCard>

      <!-- No games found -->
      <QCard v-else-if="games_sorted.length === 0" class="text-center q-pa-lg">
        <QCardSection>
          <div class="text-h6 q-mt-md">No Games Found</div>
          <div class="text-body2 text-grey-6 q-mt-sm">No games were found in the selected folder</div>
        </QCardSection>
      </QCard>

      <!-- Games grid -->
      <div v-else class="flex justify-center q-gutter-sm q-pa-sm">
        <GameCard v-for="game in games_sorted" :key="game.id" :game="game" />
      </div>
    </QScrollArea>
  </QPage>
</template>
