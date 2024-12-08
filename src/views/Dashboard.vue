<template>
  <main class="h-screen w-screen">
    <!-- Canvas -->
    <TestCanvas />

    <!-- <div class="col-span-2 lg:col-span-2 h-screen">
      <Sidebar />
    </div> -->
  </main>
</template>

<script setup lang="ts">
import Sidebar from '@/components/Sidebar.vue'
import Canvas from '@/components/Canvas.vue'
import TestCanvas from '@/components/TestCanvas.vue'
</script>
