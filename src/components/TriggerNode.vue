<template>
  <div class="trigger-node p-4 border rounded shadow-md bg-blue-50">
    <div class="flex items-center gap-2">
      <i class="pi pi-bolt text-purple-500"></i>
      <h1 class="text-black font-bold text-lg">Trigger</h1>
    </div>

    <Divider class="!my-2" />

    <div>
      <p class="text-gray-600 font-medium">
        {{ data.type === 'conversationOpened' ? 'Conversation Opened' : 'Closed' }}
      </p>
    </div>
  </div>
</template>

<script setup>
import Divider from 'primevue/divider'

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  data: {
    type: Object,
    required: true,
  },
})
</script>

<style scoped>
.trigger-node {
  border-color: #93c5fd;
}
</style>
