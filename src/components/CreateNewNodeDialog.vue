<template>
  <Dialog
    :visible="visible"
    modal
    dismissableMask
    header="Create New Node"
    :style="{ width: '30rem' }"
    :pt="{
      headerActions: {
        style: {
          display: 'none',
        },
      },
    }"
  >
    <div class="flex flex-col gap-2 mb-4">
      <label for="Title" class="font-semibold w-24">Title</label>
      <InputText id="title" class="flex-auto" autocomplete="off" v-model="localNode.title" />
    </div>

    <div class="flex flex-col gap-2 mb-4">
      <label for="description" class="font-semibold w-24">Description</label>
      <Textarea
        id="description"
        rows="3"
        cols="20"
        class="flex-auto"
        autocomplete="off"
        v-model="localNode.description"
      />
    </div>

    <div class="flex flex-col gap-2 mb-8">
      <label for="type" class="font-semibold w-24">Type of Node</label>
      <Select
        v-model="localNode.type"
        :options="nodeTypesOptions"
        option-label="label"
        option-value="value"
        placeholder="Select Node Type"
      />
    </div>

    <div class="flex justify-end gap-2">
      <Button type="button" label="Cancel" severity="secondary" @click="closeDialog"></Button>
      <Button type="button" label="Confirm" @click="confirmNode"></Button>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { InputText, Select, Button, Textarea, Dialog } from 'primevue'
import { useFlowStore } from '@/stores/flowStore'

const flowStore = useFlowStore()

// Props
const props = defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
})

// Emits
const emit = defineEmits(['update:visible', 'add-node'])

// Reactive node data
const localNode = ref({
  title: '',
  description: '',
  type: '',
})

// Options for node types
const nodeTypesOptions = [
  { label: 'Send Message', value: 'sendMessage' },
  { label: 'Business Hours', value: 'dateTime' },
  { label: 'Add Comments', value: 'addComment' },
]

// Watch the visibility and reset localNode when dialog closes
watch(
  () => props.visible,
  (newVal) => {
    if (!newVal) {
      localNode.value = { title: '', description: '', type: '' }
    }
  },
)

// Close the dialog
const closeDialog = () => {
  emit('update:visible', false)
}

// Confirm and emit the new node
const confirmNode = () => {
  if (!localNode.value.title || !localNode.value.type) {
    // Validate required fields
    alert('Please fill in all required fields!')
    return
  }

  flowStore.addNode({
    id: Date.now().toString(), // Generate unique ID
    title: localNode.value.title,
    description: localNode.value.description,
    type: localNode.value.type,
    position: { x: 200, y: 0 }, // Default position
    data: { title: localNode.value.title, description: localNode.value.description },
  })

  // Emit new node data to the parent
  // emit('add-node', {
  //   id: Date.now().toString(), // Generate unique ID
  //   title: localNode.value.title,
  //   description: localNode.value.description,
  //   type: localNode.value.type,
  //   position: { x: 200, y: 0 }, // Default position
  //   data: { title: localNode.value.title, description: localNode.value.description },
  // })

  // Close dialog
  closeDialog()
}
</script>
