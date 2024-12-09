<template>
  <Drawer
    :visible="visible"
    class="!w-[400px]"
    position="right"
    :pt="{
      header: {
        style: {
          display: 'none',
        },
      },
    }"
  >
    <div class="flex justify-between items-center py-6">
      <h2 class="font-bold text-lg">Details</h2>
      <i class="pi pi-times cursor-pointer" @click="closeDrawer"></i>
    </div>

    <div class="flex flex-col mt-5 gap-1">
      <label for="title">Title</label>
      <InputText id="title" class="w-full" v-model="nodeData.label" />
    </div>

    <div class="flex flex-col mt-4 gap-1">
      <label for="description">Description</label>
      <Textarea id="description" rows="5" class="w-full" v-model="nodeData.comment" />
    </div>

    <Button
      class="w-full mt-6"
      label="Delete Node"
      severity="danger"
      @click="flowStore.removeNode(id)"
    />
  </Drawer>
</template>

<script setup lang="ts">
import { useFlowStore } from '@/stores/flowStore'
import { Drawer, InputText, Textarea, Button } from 'primevue'

const flowStore = useFlowStore()

// Props
defineProps({
  id: {
    type: String,
    required: true,
  },
  visible: {
    type: Boolean,
    default: false,
    required: true,
  },
  nodeData: {
    type: Object as any,
  },
})

const emit = defineEmits(['update:visible'])

const closeDrawer = () => {
  emit('update:visible', false)
}
</script>
