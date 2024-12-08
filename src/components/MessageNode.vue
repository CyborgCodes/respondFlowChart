<template>
  <div class="p-4 border rounded shadow-md bg-blue-50 max-w-[282px]">
    <div class="flex items-center gap-2">
      <i class="pi pi-send text-green-500"></i>
      <h1 class="text-black font-bold text-lg">{{ message }}</h1>
    </div>

    <Divider class="!my-2" />

    <div v-for="item in data.payload" :key="item.text" class="mb-2">
      <p class="text-gray-600 font-medium">{{ item.text }}</p>
    </div>

    <div class="nodrag">
      <button @click="showDrawer = true" class="text-blue-500 underline">View Details</button>
    </div>

    <!-- Drawer for attachments -->
    <Drawer v-model:visible="showDrawer" :width="400">
      <template #header>
        <div class="flex items-center justify-between">
          <h2 class="font-bold text-lg">Details</h2>
        </div>
      </template>

      <div class="p-4 flex flex-wrap gap-4">
        <div
          v-for="(attachment, index) in attachments"
          :key="index"
          class="w-24 h-24 border rounded flex items-center justify-center bg-gray-100 text-sm font-medium text-gray-700"
        >
          <i class="pi pi-image"></i>
          <!-- <Image
            v-if="isImage(attachment)"
            :src="attachment"
            alt="Preview"
            class="w-full h-full object-cover rounded"
          />
          <!-- <span v-else>{{ getFileName(attachment) }}</span> -->
        </div>

        <!-- Add attachment button -->
        <div
          class="w-24 h-24 border rounded flex items-center justify-center bg-white text-blue-500 cursor-pointer"
          @click="addAttachment"
        >
          <i class="pi pi-plus text-xl"></i>
        </div>
      </div>
    </Drawer>
  </div>

  <Handle id="a" type="target" :position="Position.Top" />
  <Handle id="b" type="source" :position="Position.Bottom" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Handle, Position } from '@vue-flow/core'
import { Drawer, Divider } from 'primevue'

const message = 'Send Message'

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

// const data:any = {
//   payload: [
//     {
//       text: 'Hello there 👋',
//       attachment: 'https://fastly.picsum.photos/id/396/536/354.jpg',
//     },
//   ],
// }

const showDrawer = ref(false)
const attachments = ref(props.data.payload.map((item: any) => item.attachment).filter(Boolean))

const isImage = (file: string) => /\.(jpeg|jpg|gif|png)$/.test(file)
const getFileName = (file: string) => file.split('/').pop()

const addAttachment = () => {
  const newAttachment = prompt('Enter attachment URL:')
  if (newAttachment) {
    attachments.value.push(newAttachment)
  }
}
</script>
