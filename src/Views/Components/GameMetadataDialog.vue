<script setup>
/**
 * Game Metadata Dialog Component
 *
 * Dialog for editing game metadata.
 * Automatically shows when game_to_edit is set in GamesStore.
 * Supports searching and fetching metadata from Steam.
 *
 * @component GameMetadataDialog
 */

import AppDialog from '@/Views/Components/App/AppDialog.vue'

// Import Packages
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'

// Import Stores
import { GamesStore } from '@/Stores'

// Import Plugins
import { load as SteamSearch } from '@/Plugins/Search/SteamPluginSearch'
import { load as SteamDetails } from '@/Plugins/Metadata/SteamPluginMetadata'

// Initialize Stores
const { game_to_edit } = storeToRefs(GamesStore)
const { SaveGameMetadata } = GamesStore

// Dialog State
const main_dialog = computed({
  get: () => game_to_edit.value !== null,
  set: (val) => {
    if (val === false) {
      game_to_edit.value = null
      search_results.value = null
      details_results.value = null
    }
  },
})

// Loading States
const is_search_loading = ref(false)
const is_details_loading = ref(false)
const is_saving = ref(false)
const is_loading = computed(() => is_search_loading.value || is_details_loading.value || is_saving.value)
const game_name = computed(() => game_to_edit.value?.name || '')

// Data Results
const search_results = ref(null)
const details_results = computed({
  get: () => game_to_edit.value,
  set: (val) => val && Object.keys(val).forEach((key) => (game_to_edit.value[key] = val[key])),
})

// Initialize Plugins
const selected_plugin = ref('Steam')
const plugins = {
  Steam: { Search: SteamSearch, Details: SteamDetails },
  // Add more plugins here
}

// Search input
const search_input = ref(game_name.value)

// Load Search
const loadSearch = async (query) => {
  is_search_loading.value = true
  search_input.value = query
  const search = plugins[selected_plugin.value].Search
  try {
    search_results.value = await search({ query })
  } catch (err) {
    console.error(err)
    search_results.value = []
  } finally {
    is_search_loading.value = false
  }
}

// Load Details
const loadDetails = async (app_id) => {
  is_details_loading.value = true
  search_dialog.value = false
  const details = plugins[selected_plugin.value].Details
  try {
    details_results.value = await details({ app_id })
  } catch (err) {
    console.error(err)
    details_results.value = {}
  } finally {
    is_details_loading.value = false
  }
}

// Save Metadata
const saveMetadata = async () => {
  is_saving.value = true
  try {
    const result = await SaveGameMetadata(details_results.value)
    if (result) main_dialog.value = false
  } catch (err) {
    console.error(err)
  } finally {
    is_saving.value = false
  }
}

// Main Dialog Actions
const main_actions = computed(() => [
  {
    label: 'Search',
    color: 'teal',
    flat: true,
    class: 'q-mr-auto',
    loading: is_search_loading.value,
    disabled: is_loading.value,
    action: () => loadSearch(game_name.value),
  },
  {
    label: 'Cancel',
    color: 'red-4',
    class: 'opacity-60',
    outline: true,
    disabled: is_loading.value,
    action: () => (main_dialog.value = false),
  },
  {
    label: 'Save',
    color: 'primary',
    unelevated: true,
    loading: is_saving.value,
    disabled: is_loading.value,
    action: saveMetadata,
  },
])

// Search Dialog State
const search_dialog = computed({
  get: () => search_results.value !== null,
  set: (val) => val === false && (search_results.value = null),
})

// Search Dialog Actions
const search_actions = computed(() => [
  {
    label: 'Search Again',
    color: 'teal',
    outline: true,
    class: 'q-mr-auto q-px-lg',
    loading: is_search_loading.value,
    disabled: is_search_loading.value,
    action: () => loadSearch(search_input.value),
  },
  {
    label: 'Back',
    color: 'red-4',
    outline: true,
    class: 'q-px-md',
    disabled: is_search_loading.value,
    action: () => (search_dialog.value = false),
  },
])
</script>

<template>
  <!-- Dialog for editing game metadata -->
  <AppDialog v-model="main_dialog" title="Edit Game Metadata" height="100%" width="800px" :actions="main_actions">
    <!--  -->
    <div class="row q-col-gutter-sm" v-if="details_results !== null">
      <div class="col-6">
        <div class="q-gutter-y-sm">
          <QInput dense outlined label="Name" v-model="details_results.name" />
          <QInput dense outlined label="Path" v-model="details_results.path" />
          <QInput dense outlined label="Release Date" v-model="details_results.release" />

          <QSelect
            dense
            outlined
            use-input
            multiple
            label="Platforms"
            v-model="details_results.platforms"
            :options="details_results.platforms"
            dropdown-icon=""
            disable
          />

          <QSelect
            dense
            outlined
            use-input
            multiple
            label="Developers"
            v-model="details_results.developers"
            :options="details_results.developers"
            dropdown-icon=""
            use-chips
            disable
          />

          <QSelect
            dense
            outlined
            use-input
            multiple
            label="Publishers"
            v-model="details_results.publishers"
            :options="details_results.publishers"
            dropdown-icon=""
            use-chips
            disable
          />

          <QSelect
            dense
            outlined
            use-input
            multiple
            label="Tags"
            v-model="details_results.tags"
            :options="details_results.tags"
            dropdown-icon=""
            use-chips
            disable
          />

          <QSelect
            dense
            outlined
            use-input
            multiple
            label="Genres"
            v-model="details_results.genres"
            :options="details_results.genres"
            dropdown-icon=""
            use-chips
            disable
          />

          <QSelect
            dense
            outlined
            use-input
            multiple
            label="Categories"
            v-model="details_results.categories"
            :options="details_results.categories"
            dropdown-icon=""
            use-chips
            disable
          />
        </div>
      </div>
      <div class="col-6">
        <div class="q-gutter-y-sm">
          <QInput dense outlined label="Description" v-model="details_results.description" type="textarea" rows="3" />
          <QInput
            dense
            outlined
            label="Detailed Description"
            v-model="details_results.description_detailed"
            type="textarea"
            rows="6"
          />
        </div>
        <div class="q-mt-sm"></div>
        <div class="row justify-center q-col-gutter-sm">
          <div class="col-6 q-gutter-y-sm">
            <QImg :src="details_results.images?.vertical_cover" class="border-xs rounded-sm" no-spinner />
            <QImg :src="details_results.images?.library_hero" class="border-xs rounded-sm" no-spinner />
            <QImg :src="details_results.images?.capsule" class="border-xs rounded-sm" no-spinner />
          </div>
          <div class="col-6 q-gutter-y-sm">
            <QImg :src="details_results.images?.header" class="border-xs rounded-sm" no-spinner />
            <QImg :src="details_results.images?.logo" class="border-xs rounded-sm" no-spinner />
            <QImg :src="details_results.images?.background" class="border-xs rounded-sm" no-spinner />
            <QImg :src="details_results.images?.icon" class="border-xs rounded-sm" no-spinner />
          </div>
        </div>
      </div>
    </div>
  </AppDialog>

  <!-- Dialog for search results -->
  <!--
  # Height Calculation:
  - 45px per item
  - 3px for QList extra space
  - 48px : QInput and margin bottom
  - 28px : AppDialog header/title
  - 40px : AppDialog footer/actions
  - 16px : AppDialog padding inside
   -->
  <AppDialog
    v-model="search_dialog"
    :title="`Search results for &quot;${search_input}&quot;`"
    :height="`${+search_results?.length * 45 + 3 + 48 + (28 + 40 + 16)}px`"
    :width="'auto'"
    :actions="search_actions"
  >
    <QInput dense outlined v-model="search_input" label="Search By Name" color="teal" class="q-mb-sm" />
    <QList dense bordered separator class="rounded-xs" v-if="search_results?.length > 0">
      <QItem v-for="result in search_results" :key="result.id" dense clickable @click="loadDetails(result.id)">
        <QItemSection thumbnail>
          <img :src="result.thumbnail" class="rounded-xs" style="height: 40px" />
        </QItemSection>
        <QItemSection>
          <QItemLabel>{{ result.name }}</QItemLabel>
        </QItemSection>
      </QItem>
    </QList>
    <QList dense bordered separator class="rounded-xs" v-else>
      <QItem dense>
        <QItemSection style="height: 40px">
          <QItemLabel class="opacity-40">No results found</QItemLabel>
        </QItemSection>
      </QItem>
    </QList>
  </AppDialog>
</template>

<style lang="sass">
.dialog-card
  min-height: 200px
  min-width: 400px
  max-width: calc(100vw - 64px * 2) !important
  max-height: calc(100vh - 64px * 2) !important
  .d-c-header
    background-color: $dark !important
  .d-c-content
    background-color: $dark-page !important
  .d-c-footer
    background-color: $dark !important
</style>
