<template>
  <div class="comment-node p-4 border rounded shadow-md bg-blue-50 max-w-[282px]">
    <div class="flex items-center gap-2">
      <i class="pi pi-comment text-blue-500"></i>
      <h1 class="text-black font-bold text-md">Add Comment #1</h1>
    </div>

    <Divider class="!my-2" />

    <div>
      <p class="text-gray-600 font-medium">{{ data.comment }}</p>
    </div>
  </div>

  <Handle id="a" type="target" :position="Position.Top" />
  <Handle id="b" type="source" :position="Position.Bottom" />
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

<style scoped>
.comment-node {
  border-color: green;
}
</style>
