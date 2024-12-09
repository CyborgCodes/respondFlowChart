<template>
  <div class="message-node p-2 border rounded shadow-md bg-blue-200">
    <p class="text-blue-500 font-bold">{{ data.connectorType }}</p>
  </div>

  <Handle id="a" type="target" :position="Position.Top" />
  <Handle id="b" type="source" :position="Position.Bottom" />
</template>

<script setup lang="ts">
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
