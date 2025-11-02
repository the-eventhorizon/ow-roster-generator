<script setup lang="ts">
import { ref } from 'vue'
import SettingsPanel from './components/SettingsPanel.vue'
import HeroPool from './components/HeroPool.vue'
import RosterTable from './components/RosterTable.vue'
import ExportCanvas from './components/ExportCanvas.vue'
import HelpButton from './components/HelpButton.vue'
import { useHeroes } from './composables/useHeroes'
import { useRoster } from './composables/useRoster'
import type { Hero } from './types/hero'

const generatingImage = ref(false)

const { loading, heroesByRole } = useHeroes()
const {
  teamName,
  date,
  roles,
  players,
  addPlayer,
  removePlayer,
  dropHero,
  removeHero
} = useRoster()

const draggedHero = ref<Hero | null>(null)
const exportCanvasRef = ref<InstanceType<typeof ExportCanvas> | null>(null)

const startDrag = (hero: Hero): void => {
  draggedHero.value = hero
}

const handleDrop = (playerIndex: number, role: string): void => {
  if (draggedHero.value) {
    dropHero(playerIndex, role, draggedHero.value)
    draggedHero.value = null
  }
}

const downloadImage = async (): Promise<void> => {
  generatingImage.value = true
  if (exportCanvasRef.value) {
    await exportCanvasRef.value.downloadImage()
  }
  generatingImage.value = false
}
</script>

<template>
  <HelpButton />
  <div class="min-h-screen p-8" style="background-color: #151515; color: #e5e5e5;">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-4xl mb-8" style="color: #ff6700">
        LES Roster Graphic Generator
      </h1>

      <SettingsPanel v-model:teamName="teamName" v-model:date="date" />

      <HeroPool
        :heroes-by-role="heroesByRole"
        :loading="loading"
        @start-drag="startDrag"
      />

      <RosterTable
        :players="players"
        :roles="roles"
        @add-player="addPlayer"
        @remove-player="removePlayer"
        @drop-hero="handleDrop"
        @remove-hero="removeHero"
      />

      <div class="flex justify-center mb-8">
        <button
          @click="downloadImage"
          class="flex items-center gap-2 px-8 py-4 rounded text-lg text-white justify-center cursor-pointer"
          style="background-color: #ff6700; min-width: 250px; min-height: 60px;"
          :disabled="generatingImage"
        >
          <span v-if="!generatingImage">Grafik herunterladen</span>
          <span v-if="generatingImage">
            <svg
              class="animate-spin h-5 w-5 mr-3 border-2 border-white border-t-transparent rounded-full"
              viewBox="0 0 24 24"
            ></svg>
          </span>
        </button>
      </div>
    </div>


    <ExportCanvas
      ref="exportCanvasRef"
      :team-name="teamName"
      :date="date"
      :roles="roles"
      :players="players"
    />
  </div>
</template>
