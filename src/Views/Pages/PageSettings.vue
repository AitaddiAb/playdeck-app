<script setup>
/**
 * Settings Page Component
 *
 * Application settings and configuration page.
 *
 * @component PageSettings
 */

import { SettingsStore, GamesStore } from '@/Stores'
import { open } from '@tauri-apps/plugin-dialog'
import { storeToRefs } from 'pinia'

const { games_path, games_extensions, games_exclusions, ui_card_width } = storeToRefs(SettingsStore)
const { SaveSettings } = SettingsStore
const { LoadGames } = GamesStore

const handleSaveSettings = () => SaveSettings(LoadGames)

/**
 * Select games path using OS-native folder picker
 */
const SelectGamesPath = async () => {
  try {
    const selected = await open({
      multiple: false,
      directory: true,
    })

    if (selected) games_path.value = selected
  } catch (error) {
    console.error('Error selecting games path:', error)
  }
}
</script>

<template>
  <QPage class="settings q-pa-md">
    <QCard>
      <QCardSection>
        <div class="text-h5">Settings</div>
      </QCardSection>

      <QCardSection>
        <div class="text-h6">Games Path</div>
        <div class="row q-gutter-sm items-center">
          <QInput v-model="games_path" label="Games Folder Path" readonly outlined dense class="col-grow" />
          <QBtn color="primary" label="Select Folder" @click="SelectGamesPath()" />
        </div>

        <div class="text-h6 q-mt-md">Games Extensions</div>
        <div class="row q-gutter-sm items-center">
          <QInput v-model="games_extensions" label="Games Extensions" outlined dense class="col-grow" />
        </div>

        <div class="text-h6 q-mt-md">Games Exclusion Patterns</div>
        <div class="row q-gutter-sm items-center">
          <QInput v-model="games_exclusions" label="Games Exclusion Patterns" outlined dense class="col-grow" />
        </div>

        <div class="text-h6 q-mt-md">Card Width</div>
        <div class="row q-gutter-sm items-center">
          <QSlider v-model="ui_card_width" :min="160" :max="320" :step="10" label :label-value="`${ui_card_width}px`" />
        </div>
      </QCardSection>
      <QCardSection>
        <QBtn color="primary" label="Save" @click="handleSaveSettings()" />
      </QCardSection>
    </QCard>
  </QPage>
</template>

<style lang="sass" scoped>
.settings
  max-width: 800px
  margin: 0 auto
</style>
