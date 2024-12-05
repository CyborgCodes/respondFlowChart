<template>
  <main class="grid grid-cols-4 lg:grid-cols-5 h-screen">
    <!-- Canvas -->
    <div class="col-span-2 lg:col-span-3">
      <Canvas />
    </div>

    <div class="col-span-2 lg:col-span-2 h-screen">
      <Sidebar />
    </div>
  </main>
</template>

<script setup lang="ts">
import Sidebar from '@/components/Sidebar.vue'
import Canvas from '@/components/Canvas.vue'
</script>
