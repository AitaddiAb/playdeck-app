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

import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'

import { searchSteam, getSteamMetadata } from '@/Utils/SteamMetadata'
import { GamesStore } from '@/App/Store.js'

const { game_to_edit } = storeToRefs(GamesStore)

const showDialog = computed({
  get: () => game_to_edit.value !== null,
  set: (v) => !v && (game_to_edit.value = null),
})

const loading = ref(false)
const search_results = ref([])
const metadata = ref(null)

const search = async () => {
  loading.value = true
  search_results.value = await searchSteam(game_to_edit.value.name)
  loading.value = false
}

const getMetadata = async (id) => {
  loading.value = true
  metadata.value = await getSteamMetadata(id)
  loading.value = false

  console.log(metadata.value)
}
</script>

<template>
  <QDialog v-model="showDialog">
    <QCard style="min-width: 600px; max-width: 800px">
      <QCardSection>
        <div class="text-h6">Edit Metadata</div>
        <div v-if="game_to_edit" class="text-caption text-grey-6 q-mt-sm">
          {{ game_to_edit.name }}
        </div>
      </QCardSection>

      <QCardSection>
        <!-- Search Section -->
        <div class="q-mb-md">
          <QBtn
            label="Search Steam"
            color="primary"
            @click="search"
            :disabled="!game_to_edit || !game_to_edit.name"
            :loading="loading"
          />
        </div>

        <QList bordered separator dense class="rounded-xs">
          <QItem dense v-for="r in search_results" :key="r.id" clickable @click="getMetadata(r.id)">
            <QItemSection thumbnail>
              <img :src="r.thumbnail" style="height: 40px" class="rounded-xs" />
            </QItemSection>
            <QItemSection>
              <QItemLabel>{{ r.name }}</QItemLabel>
              <QItemLabel caption>
                {{ r.release }}
              </QItemLabel>
            </QItemSection>
          </QItem>
        </QList>
      </QCardSection>
      <QCardActions align="right">
        <QBtn flat label="Cancel" v-close-popup />
      </QCardActions>
    </QCard>
  </QDialog>
</template>
