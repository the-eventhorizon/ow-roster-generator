<script setup lang="ts">
import { ref } from 'vue'
import * as domtoimage from 'dom-to-image-more'
import type { Player, Hero } from '../types/hero'

const props = defineProps<{
  teamName: string
  date: string
  roles: string[]
  players: Player[]
}>()

const canvasRef = ref<HTMLDivElement | null>(null)

const generateImagePath = (heroName: string): string => {
  return `/src/assets/portraits/${heroName}.png`
}

const downloadImage = async (): Promise<void> => {
  if (!canvasRef.value) {
    alert('Canvas nicht gefunden')
    return
  }

  try {
    // Clone the element and remove the scale transform for clean rendering
    const clone = canvasRef.value.cloneNode(true) as HTMLElement
    clone.style.transform = 'scale(1)'
    clone.style.transformOrigin = 'top left'
    clone.style.position = 'absolute'
    clone.style.left = '-9999px'

    // Remove all borders from all elements
    const allElements = clone.querySelectorAll('*')
    allElements.forEach(el => {
      const htmlEl = el as HTMLElement
      if (htmlEl.classList.contains('important-border')) return
      htmlEl.style.border = 'none'
      htmlEl.style.outline = 'none'
      htmlEl.style.boxShadow = 'none'
      htmlEl.style.textWrap = 'nowrap'
    })

    document.body.appendChild(clone)

    const dataUrl = await domtoimage.toPng(clone, {
      width: 1920,
      height: 1080,
    })

    document.body.removeChild(clone)

    const link = document.createElement('a')
    link.download = `${props.teamName.replace(/\s/g, '_')}_roster.png`
    link.href = dataUrl
    link.click()
  } catch (error) {
    console.error('Error generating image:', error)
    alert('Fehler beim Erstellen der Grafik. Bitte versuche es erneut.')
  }
}

defineExpose({
  downloadImage
})
</script>

<template>
  <div
    ref="canvasRef"
    class="mx-auto"
    style="width: 1920px; height: 1080px; background: linear-gradient(180deg, #151515, #ff6700); transform: scale(0.5); transform-origin: top center; margin-bottom: -540px; border: none; outline: none;"
  >
    <!-- Header -->
    <div class="pt-16 px-12" style="border: none;">
      <div class="flex justify-between items-start">
        <div class="flex items-center">
          <img src="../assets/icons/LES_ICON-ORANGE.png" alt="logo" class="w-44 h-44 mr-4" />
          <div class="border-r h-32 ml-10 mr-12 important-border" style="border-color: #ff6700"></div>
          <h2 class="text-6xl bold wr" style="color: #e5e5e5;">
            {{ teamName.toUpperCase() }}
          </h2>
        </div>
        <div class="text-3xl" style="color: #e5e5e5;">
          Stand: {{ date }}
        </div>
      </div>
    </div>

    <!-- Table -->
    <div class="px-12 pt-12 h-[800px] flex flex-col gap-7" style="border: none;">
      <!-- Column Headers -->
      <div class="flex mb-8" style="padding-left: 200px; border: none;">
        <div v-for="role in roles" :key="role" class="text-center flex items-end justify-center" style="width: 340px; color: #e5e5e5;">
          <div class="font-bold text-4xl flex justify-center gap-1 text-wrap flex-nowrap items-center">
            <img v-if="role.includes('TANK')" src="../assets/icons/roles/TankIcon.png" alt="Tank" class="w-20 h-18">
            <img v-if="role.includes('SUPPORT')" src="../assets/icons/roles/SupportIcon.png" alt="Support" class="w-20 h-18">
            <img v-if="role.includes('DPS')" src="../assets/icons/roles/OffenseIcon.png" alt="DPS" class="w-20 h-18">
            <div class="flex flex-col items-start">
              <div v-for="line in role.split(' ')" :key="line" style="font-family: 'Geom Graphic W03 Regular Italic', sans-serif">{{ line }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Player Rows -->
      <div v-for="(player, pIndex) in players" :key="pIndex" class="flex items-center mb-8">
        <div class="italic text-3xl font-bold" style="width: 200px; color: #e5e5e5;">
          {{ player.name.toUpperCase() }}
        </div>
        <div v-for="role in roles" :key="role" class="flex justify-end gap-2 items-center" style="width: 340px;">
          <img
            v-for="(hero, hIndex) in player.heroes[role] || []"
            :key="hIndex"
            :src="generateImagePath(hero.key)"
            :alt="hero.name"
            class="important-border"
            style="width: 50px; height: 50px; margin-right: 5px; border-radius: 10px; border: 1px solid #e5e5e5"
          />
        </div>
      </div>
    </div>
  </div>
</template>
