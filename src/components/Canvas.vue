<template>
  <div class="h-full">
    <VueFlow v-model:nodes="nodes" v-model:edges="edges" :node-types="nodeTypes" fit-view-on-init>
      <Background />
      <MiniMap pannable zoomable />

      <Panel position="top-right">
        <Button label="Create New Node" @click="openCreateNodeDialog()" />
      </Panel>
    </VueFlow>
  </div>

  <Dialog
    v-model:visible="createNodeDialogVisible"
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
      <InputText id="title" class="flex-auto" autocomplete="off" v-model="newNode.title" />
    </div>

    <div class="flex flex-col gap-2 mb-4">
      <label for="description" class="font-semibold w-24">Description</label>
      <Textarea
        id="description"
        rows="3"
        cols="20"
        class="flex-auto"
        autocomplete="off"
        v-model="newNode.description"
      />
    </div>

    <div class="flex flex-col gap-2 mb-8">
      <label for="type" class="font-semibold w-24">Type of Node</label>
      <Select
        v-model="newNode.type"
        :options="nodeTypesOptions"
        option-label="label"
        option-value="value"
      />
    </div>

    <div class="flex justify-end gap-2">
      <Button
        type="button"
        label="Cancel"
        severity="secondary"
        @click="createNodeDialogVisible = false"
      ></Button>
      <Button type="button" label="Confirm" @click="addNewNode()"></Button>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { VueFlow, Panel } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import { MiniMap } from '@vue-flow/minimap'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import Select from 'primevue/select'
import TriggerNode from './TriggerNode.vue'
import MessageNode from './MessageNode.vue'
import BusinessHoursNode from './BusinessHoursNode.vue'

const createNodeDialogVisible = ref(false)
const newNode = ref({
  title: '',
  description: '',
  type: '',
})

// Options for node types
const nodeTypesOptions = [
  { label: 'Trigger', value: 'trigger' },
  { label: 'Business Hours', value: 'businessHours' },
  { label: 'Message', value: 'message' },
]

// Define custom node types
const nodeTypes = {
  trigger: TriggerNode,
  businessHours: BusinessHoursNode,
  message: MessageNode,
}

// Define the initial nodes
const nodes = ref([
  {
    id: '1',
    type: 'trigger',
    data: {
      type: 'conversationOpened',
      oncePerContact: false,
    },
    position: { x: 100, y: 100 },
  },
])

const edges = ref([])

// Function to open the dialog
function openCreateNodeDialog() {
  newNode.value = { title: '', description: '', type: '' } // Reset form
  createNodeDialogVisible.value = true
}
</script>
