<template>
  <div
    class="p-4 border rounded shadow-md bg-blue-50 max-w-[282px] border-blue-500"
    @click="drawerVisible = true"
  >
    <div class="flex items-center gap-2">
      <i class="pi pi-comment text-blue-500"></i>
      <h1 class="text-black font-bold text-md">{{ data.label }}</h1>
    </div>

    <Divider class="!my-2" />

    <div>
      <p class="text-gray-600 font-medium">{{ data.comment }}</p>
    </div>
  </div>

  <Handle id="a" type="target" :position="Position.Top" />
  <Handle id="b" type="source" :position="Position.Bottom" />

  <CommentDrawer :id="id" v-model:visible="drawerVisible" :node-data="data" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Divider from 'primevue/divider'
import { Handle, Position } from '@vue-flow/core'
import CommentDrawer from './drawers/CommentDrawer.vue'

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
