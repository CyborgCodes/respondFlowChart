<template>
  <div class="node message">
    <div class="header">
      <i class="pi pi-envelope text-green-500"></i>
      <h3>Message</h3>
    </div>
    <p>{{ data.label }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  id: { type: String, required: true },
  data: { type: Object, required: true },
})
</script>
