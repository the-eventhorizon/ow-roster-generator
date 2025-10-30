<script setup lang="ts">
import { ref } from 'vue'
import SettingsPanel from './components/SettingsPanel.vue'
import HeroPool from './components/HeroPool.vue'
import RosterTable from './components/RosterTable.vue'
import ExportCanvas from './components/ExportCanvas.vue'
import { useHeroes } from './composables/useHeroes'
import { useRoster } from './composables/useRoster'
import type { Hero } from './types/hero'

const { heroes, loading, heroesByRole } = useHeroes()
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
  if (exportCanvasRef.value) {
    await exportCanvasRef.value.downloadImage()
  }
}
</script>

<template>
  <div class="min-h-screen p-8" style="background-color: #151515; color: #e5e5e5;">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-4xl mb-8" style="color: #ff6700">
        Overwatch Roster Generator
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
          class="flex items-center gap-2 px-8 py-4 rounded text-lg text-white"
          style="background-color: #ff6700"
        >
          <span>⬇</span> Grafik herunterladen
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
