<template>
  <div>
    <button @click="showHelp = true" class="help-btn">Help</button>
    <div v-if="showHelp" class="help-modal">
      <div class="help-content">
        <h2>How to Use the Roster Generator</h2>
        <ul>
          <li>Drag and drop hero portraits into the role slots for each player.</li>
          <li>Each role can have a maximum of <strong>3 heroes</strong>.</li>
          <li>The hybrid roles can have a maximum of <strong>2 heroes</strong>.</li>
          <li>Click the hero icon in the table to remove it.</li>
          <li>Use the "+" button to add a new player.</li>
          <li>Use the trash icon next to a player to remove them.</li>
        </ul>
        <button @click="showHelp = false" class="close-btn">Close</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const showHelp = ref(false)
</script>

<style scoped>

</style>

