<template>
  <div class="business-node p-4 border rounded shadow-md bg-blue-50">
    <div class="flex items-center gap-2">
      <i class="pi pi-calendar-clock text-orange-500"></i>
      <h1 class="text-black font-bold text-lg">Business Hours</h1>
    </div>

    <Divider class="!my-2" />

    <div>
      <p class="text-gray-600 font-medium">Business Hours - UTC</p>

      <div class="nodrag">
        <button @click="showBusinessDrawer = true" class="text-blue-500 underline">
          View Details
        </button>
      </div>
    </div>
  </div>

  <Handle id="a" type="target" :position="Position.Top" />
  <Handle id="b" type="source" :position="Position.Bottom" />
</template>

<script setup>
import { ref } from 'vue'
import Divider from 'primevue/divider'
import { Handle, Position } from '@vue-flow/core'

const showBusinessDrawer = ref(false)

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
.business-node {
  border-color: orange;
}
</style>
