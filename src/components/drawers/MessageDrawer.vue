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
      <h2 class="font-bold text-lg">Attachments</h2>
      <i class="pi pi-times cursor-pointer" @click="closeDrawer"></i>
    </div>

    <div class="p-4 flex flex-wrap gap-4">
      <div
        v-for="(attachment, index) in attachments"
        :key="index"
        class="w-24 h-24 border rounded flex items-center justify-center bg-gray-100 text-sm font-medium text-gray-700"
      >
        <Image :src="attachment" alt="Preview" class="w-full h-full object-contain rounded" />
      </div>

      <!-- Add attachment button -->
      <div
        class="w-24 h-24 border rounded flex items-center justify-center bg-white text-blue-500 cursor-pointer"
        @click="addAttachment"
      >
        <i class="pi pi-plus text-xl"></i>
      </div>
    </div>

    <div class="flex flex-col mt-5 gap-1">
      <label for="title">Title</label>
      <InputText id="title" class="w-full" v-model="nodeData.label" />
    </div>

    <div class="flex flex-col mt-4 gap-1">
      <label for="description">Description</label>
      <Textarea id="description" rows="5" class="w-full" v-model="nodeData.payload[0].text" />
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
import { ref } from 'vue'
import { Drawer, Image, InputText, Textarea, Button } from 'primevue'
import { useFlowStore } from '@/stores/flowStore'

const flowStore = useFlowStore()

// Props
const props = defineProps({
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

const attachments = ref(props.nodeData.payload.map((item: any) => item.attachment).filter(Boolean))

const addAttachment = () => {
  const newAttachment = prompt('Enter attachment URL:')
  if (newAttachment) {
    attachments.value.push(newAttachment)
  }
}

const emit = defineEmits(['update:visible'])

const closeDrawer = () => {
  emit('update:visible', false)
}
</script>
