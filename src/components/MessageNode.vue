<template>
  <div
    class="p-4 border rounded shadow-md bg-blue-50 max-w-[282px] border-green-500"
    @click="drawerVisible = true"
  >
    <div class="flex items-center gap-2">
      <i class="pi pi-send text-green-500"></i>
      <h1 class="text-black font-bold text-lg">{{ data.label }}</h1>
    </div>

    <Divider class="!my-2" />

    <div v-for="item in data.payload" :key="item.text" class="mb-2">
      <p class="text-gray-600 font-medium">{{ item.text }}</p>
    </div>
  </div>

  <Handle id="a" type="target" :position="Position.Top" />
  <Handle id="b" type="source" :position="Position.Bottom" />

  <MessageDrawer :id="id" v-model:visible="drawerVisible" :node-data="data" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Handle, Position } from '@vue-flow/core'
import { Divider } from 'primevue'
import MessageDrawer from '@/components/drawers/MessageDrawer.vue'

const drawerVisible = ref(false)

defineProps({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  data: {
    type: Object,
    required: true,
  },
})
</script>
