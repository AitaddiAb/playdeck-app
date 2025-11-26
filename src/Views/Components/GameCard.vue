<script setup>
/**
 * Game Card Component
 *
 * Reusable game card component with context menu support.
 * Displays game information and handles launching games.
 *
 * @component GameCard
 */

import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'

import { ContextMenu } from '@/Utils/ContextMenu'
import { OpenFile } from '@/Utils/FileManager'

import { SettingsStore } from '@/App/Store.js'

const { ui_card_width } = storeToRefs(SettingsStore)

/**
 * Props
 */
const props = defineProps({ game: { type: Object, required: true } })

const dblclickAction = () => {
  const { executables, path } = props.game
  if (!(executables.length > 1)) OpenFile({ path: `${path}/${executables[0]}` })
  // If there are multiple executables, show a Dialog
  // TODO: Implement menu for multiple executables
  else OpenFile({ path: `${path}/${executables[0]}` }) // For now, just open the first executable
}

const cardContextMenuItems = [
  {
    label: `Play`,
    action: () => OpenFile({ path: `${props.game.path}/${props.game.executables[0]}` }),
  },
  {
    type: 'PredefinedMenuItem',
    options: { text: 'separator-text', item: 'Separator' },
  },

  {
    type: 'Submenu',
    text: `All Actions`,
    items: [...props.game.executables, ...props.game.sub_executables].map((file_path) => ({
      label: file_path.split(/[/\\]/).pop(),
      action: () => OpenFile({ path: `${props.game.path}/${file_path}` }),
    })),
  },
  {
    type: 'PredefinedMenuItem',
    options: { text: 'separator-text', item: 'Separator' },
  },
  {
    label: `Context Menu Item 3`,
    action: () => console.log('Context Menu Item 2'),
  },
  {
    label: `Context Menu Item 4`,
    action: () => console.log('Context Menu Item 3'),
  },
  {
    label: `Context Menu Item 5`,
    action: () => console.log('Context Menu Item 3'),
  },
  {
    label: `Context Menu Item 6`,
    action: () => console.log('Context Menu Item 3'),
  },
]

onMounted(async () => {
  try {
    await ContextMenu.add(`#game-card-${props.game.id}`, cardContextMenuItems)
  } catch (error) {
    console.error(`Failed to setup context menu for game ${props.game.id}:`, error)
  }
})
</script>

<template>
  <div class="game-card-wrapper" :style="{ width: `${ui_card_width}px` }">
    <QCard :id="`game-card-${game.id}`" class="game-card" flat bordered @dblclick="dblclickAction">
      <QCardSection>
        <div class="text-h6">{{ game.name }}</div>
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
