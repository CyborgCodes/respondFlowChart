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
import { useVueFlow } from '@vue-flow/core'

const flowStore = useFlowStore()
const { addNodes } = useVueFlow()

// Props
const props = defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
})

// Emits
const emit = defineEmits(['update:visible'])

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

const confirmNode = () => {
  if (!localNode.value.title || !localNode.value.type) {
    alert('Please fill in all required fields!')
    return
  }

  const mainNodeId = Math.random().toString()
  const successNodeId = Math.random().toString()
  const failureNodeId = Math.random().toString()

  // Add the main "Business Hours" node
  const mainNode = {
    id: mainNodeId,
    position: { x: Math.random() * 400, y: Math.random() * 400 },
    type: localNode.value.type,
    data: {
      label: localNode.value.title,
      description: localNode.value.description,
    },
  }

  // Add "Success" and "Failure" nodes
  const successNode = {
    id: successNodeId,
    position: { x: mainNode.position.x - 150, y: mainNode.position.y + 150 },
    type: 'dateTimeConnector', // Or use a custom node type if needed
    data: {
      connectorType: 'Success',
    },
  }

  const failureNode = {
    id: failureNodeId,
    position: { x: mainNode.position.x + 150, y: mainNode.position.y + 150 },
    type: 'dateTimeConnector', // Or use a custom node type if needed
    data: {
      connectorType: 'Failure',
    },
  }

  // Add edges to connect "Business Hours" node to "Success" and "Failure" nodes
  const edges = [
    {
      id: `e${mainNodeId}-success`,
      source: mainNodeId,
      target: successNodeId,
      type: 'smoothstep',
      sourceHandle: 'success',
    },
    {
      id: `e${mainNodeId}-failure`,
      source: mainNodeId,
      type: 'smoothstep',
      target: failureNodeId,
      sourceHandle: 'failure',
    },
  ]

  // Update the store with new nodes and edges
  flowStore.addNode(mainNode)

  if (localNode.value.type == 'dateTime') {
    flowStore.addNode(successNode)
    flowStore.addNode(failureNode)
    flowStore.addEdges(edges)
  }

  closeDialog()
}

// Confirm and emit the new node
// const confirmNode = () => {
//   if (!localNode.value.title || !localNode.value.type) {
//     // Validate required fields
//     alert('Please fill in all required fields!')
//     return
//   }

//   console.log('localNode: ', localNode.value)

//   flowStore.addNode({
//     id: Math.random().toString(),
//     position: { x: Math.random() * 400, y: Math.random() * 400 },
//     type: localNode.value.type,
//     data: {
//       label: localNode.value.title,
//       description: localNode.value.description,
//     },
//   })

//   console.log('flowStore: ', flowStore)

//   closeDialog()
// }
</script>
