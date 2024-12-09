<template>
  <div
    class="p-4 border rounded shadow-md bg-blue-50 border-orange-500"
    @click="drawerVisible = true"
  >
    <div class="flex items-center gap-2">
      <i class="pi pi-calendar-clock text-orange-500"></i>
      <h1 class="text-black font-bold text-lg">Business Hours</h1>
    </div>

    <Divider class="!my-2" />

    <div>
      <p class="text-gray-600 font-medium">Business Hours - {{ data.timezone }}</p>
    </div>
  </div>

  <!-- Handles for incoming and outgoing edges -->
  <Handle id="incoming" type="target" :position="Position.Top" />
  <Handle id="success" type="source" :position="Position.Bottom" />
  <Handle id="failure" type="source" :position="Position.Bottom" />

  <BusinessHoursDrawer :id="id" v-model:visible="drawerVisible" :node-data="data" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Divider } from 'primevue'
import { Handle, Position } from '@vue-flow/core'
import BusinessHoursDrawer from './drawers/BusinessHoursDrawer.vue'

const drawerVisible = ref(false)

defineProps({
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
