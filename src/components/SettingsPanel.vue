<script setup lang="ts">
defineProps<{
  teamName: string
  date: string
}>()

defineEmits<{
  'update:teamName': [value: string]
  'update:date': [value: string]
}>()
</script>

<template>
  <div class="bg-gray-800 p-6 rounded-lg mb-8">
    <div class="grid grid-cols-2 gap-4">
      <div>
        <label class="block mb-2 text-4">Team Name</label>
        <input
          :value="teamName"
          @input="$emit('update:teamName', ($event.target as HTMLInputElement).value)"
          type="text"
          class="w-full bg-gray-700 px-4 py-2 rounded text-white"
        />
      </div>
      <div>
        <label class="block mb-2">Datum</label>
        <input
          :value="date"
          @input="$emit('update:date', ($event.target as HTMLInputElement).value)"
          type="text"
          class="w-full bg-gray-700 px-4 py-2 rounded text-white"
        />
      </div>
    </div>
  </div>
</template>
