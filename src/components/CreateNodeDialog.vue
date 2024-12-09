<template>
  <Dialog
    :visible="visible"
    modal
    dismissableMask
    header="Create New Node"
    :style="{ width: '30rem' }"
    :pt="{ headerActions: { style: { display: 'none' } } }"
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
      resetLocalNode()
    }
  },
)

// Reset localNode to initial state
const resetLocalNode = () => {
  localNode.value = { title: '', description: '', type: '' }
}

// Close the dialog
const closeDialog = () => {
  emit('update:visible', false)
}

// Create a node with the given data
const createNode = (type: string, data: any) => {
  const nodeId = Math.random().toString()
  const position = { x: Math.random() * 400, y: Math.random() * 400 }
  return { id: nodeId, position, type, data }
}

// Add edges between nodes
const createEdges = (sourceId: string, targetId: string, handle: any) => ({
  id: `e${sourceId}-${targetId}`,
  source: sourceId,
  target: targetId,
  type: 'smoothstep',
  sourceHandle: handle,
})

// Confirm and save the node
const confirmNode = () => {
  const { title, description, type } = localNode.value

  if (!title || !type) {
    alert('Please fill in all required fields!')
    return
  }

  switch (type) {
    case 'dateTime': {
      const mainNode = createNode(type, { label: title, description })
      const successNode = createNode('dateTimeConnector', { connectorType: 'Success' })
      const failureNode = createNode('dateTimeConnector', { connectorType: 'Failure' })

      successNode.position.x = mainNode.position.x - 150
      successNode.position.y = mainNode.position.y + 150

      failureNode.position.x = mainNode.position.x + 150
      failureNode.position.y = mainNode.position.y + 150

      const edges = [
        createEdges(mainNode.id, successNode.id, 'success'),
        createEdges(mainNode.id, failureNode.id, 'failure'),
      ]

      flowStore.addNode(mainNode)
      flowStore.addNode(successNode)
      flowStore.addNode(failureNode)
      flowStore.addEdges(edges)
      break
    }

    case 'addComment': {
      const mainNode = createNode(type, { label: title, comment: description })
      flowStore.addNode(mainNode)
      break
    }

    default: {
      const mainNode = createNode(type, {
        label: title,
        payload: [{ type: 'text', text: description }],
      })
      flowStore.addNode(mainNode)
      break
    }
  }

  closeDialog()
}
</script>
