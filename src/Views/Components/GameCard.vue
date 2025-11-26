<script setup>
/**
 * Game Card Component
 *
 * Reusable game card component with context menu support.
 * Displays game information and handles launching games.
 *
 * @component GameCard
 */

import { computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'

import { ContextMenu } from '@/Utils/ContextMenu'
import { OpenFile } from '@/Utils/FileManager'

import { SettingsStore } from '@/App/Store.js'
import { GamesStore } from '@/App/Store.js'

const { ui_card_width } = storeToRefs(SettingsStore)
const { SaveGameMetadata } = GamesStore
/**
 * Props
 */
const props = defineProps({ game: { type: Object, required: true } })

const PlayDefaultAction = () => {
  if (props.game.actions.default === null) return
  OpenFile({ path: `${props.game.path}/${props.game.actions.default}` })
}

const ChangeDefaultAction = async (file_path) => {
  const game = { ...props.game }
  game.actions.default = file_path
  const result = await SaveGameMetadata(game)
  if (result) {
    const play = { id: `play-${props.game.id}`, enabled: true }
    ContextMenu.update(`#game-card-${props.game.id}`, [play])
  }
}

// Create menu items as computed property to ensure each component instance
// gets its own array with correct closures
// All items must have unique IDs
const cardContextMenuItems = computed(() => [
  {
    id: `play-${props.game.id}`,
    label: `Play`,
    action: () => OpenFile({ path: `${props.game.path}/${props.game.actions.default}` }),
    enabled: props.game.actions.default !== null,
  },
  {
    id: `item-3-${props.game.id}`,
    label: `Context Menu Item 3`,
    action: () => console.log('Context Menu Item 2'),
    enabled: false,
  },
  {
    id: `item-4-${props.game.id}`,
    label: `Context Menu Item 4`,
    action: () => console.log('Context Menu Item 3'),
    enabled: false,
  },
  {
    id: `item-5-${props.game.id}`,
    label: `Context Menu Item 5`,
    action: () => console.log('Context Menu Item 3'),
    enabled: false,
  },
  {
    id: `item-6-${props.game.id}`,
    label: `Context Menu Item 6`,
    action: () => console.log('Context Menu Item 3'),
    enabled: false,
  },
  {
    type: 'Separator',
  },
  {
    id: `edit-metadata-${props.game.id}`,
    label: `Edit Metadata`,
    action: () => (GamesStore.game_to_edit = props.game),
  },
  {
    type: 'Submenu',
    text: `All Actions`,
    items: props.game.actions.others.map((file_path, index) => ({
      type: 'Submenu',
      text: file_path,
      items: [
        {
          id: `play-${props.game.id}-${index}`,
          label: 'Play',
          action: () => OpenFile({ path: `${props.game.path}/${file_path}` }),
        },
        {
          id: `default-${props.game.id}-${index}`,
          label: 'Set as Default',
          action: () => ChangeDefaultAction(file_path),
        },
      ],
    })),
  },
])

onMounted(async () => {
  try {
    await ContextMenu.create(`#game-card-${props.game.id}`, cardContextMenuItems.value)
  } catch (error) {
    console.error(`Failed to setup context menu for game ${props.game.id}:`, error)
  }
})
</script>

<template>
  <div class="game-card-wrapper" :style="{ width: `${ui_card_width}px` }">
    <QCard :id="`game-card-${props.game.id}`" class="game-card" flat bordered @click="PlayDefaultAction">
      <QCardSection>
        <div class="text-h6">{{ props.game.name }}</div>
        <div class="text-caption text-grey-4 q-mt-sm">
          <QBadge color="red-4" label="No Default Action" v-if="props.game.actions.default === null" />
          <div v-show="props.game.developer">Developer: {{ props.game.developer }}</div>
          <div v-show="props.game.publisher">Publisher: {{ props.game.publisher }}</div>
          <div v-show="props.game.release_date">Release Date: {{ props.game.release_date }}</div>
          <div v-show="props.game.genre">Genre: {{ props.game.genre }}</div>
          <div v-show="props.game.platform">Platform: {{ props.game.platform }}</div>
          <div v-show="props.game.version">Version: {{ props.game.version }}</div>
        </div>
      </QCardSection>
    </QCard>
  </div>
</template>

<style lang="sass">
.game-card-wrapper
  flex-shrink: 0



.game-card
  width: 100%
  height: 100%
  display: flex
  flex-direction: column
  aspect-ratio: 21 / 30
  cursor: pointer
  opacity: 0.7
  transition: all 0.2s ease-in-out

  &:hover
    opacity: 1
    scale: 1.02

  & *
    cursor: pointer
</style>
