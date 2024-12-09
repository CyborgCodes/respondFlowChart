<template>
  <div class="p-4 border rounded shadow-md bg-blue-50 border-[#93c5fd]">
    <div class="flex items-center gap-2">
      <i class="pi pi-bolt text-purple-500"></i>
      <h1 class="text-black font-bold text-lg">Trigger</h1>
    </div>

    <Divider class="!my-2" />

    <div>
      <p class="text-gray-600 font-medium">Conversation Opened</p>
    </div>
  </div>

  <Handle id="a" type="source" :position="Position.Bottom" />
</template>

<script setup>
import Divider from 'primevue/divider'
import { Handle, Position } from '@vue-flow/core'

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
