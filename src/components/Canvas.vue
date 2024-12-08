<template>
  <div class="h-full">
    <VueFlow
      v-model:nodes="flowStore.nodes"
      :edges="flowStore.edges"
      :node-types="nodeTypes"
      fit-view-on-init
      @onConnect="onConnect"
    >
      <Background />
      <Panel position="top-right">
        <Button label="Create New Node" @click="dialogVisible = true" />
      </Panel>
    </VueFlow>
  </div>

  <CreateNewNodeDialog v-model:visible="dialogVisible" :add-node="addNode" />
</template>

<script setup lang="ts">
import { markRaw, ref } from 'vue'
import { useFlowStore } from '@/stores/flowStore'
import { VueFlow, Panel } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import Button from 'primevue/button'
import CreateNewNodeDialog from '@/components/CreateNewNodeDialog.vue'
import StatusConnector from '@/components/StatusConnector.vue'
import TriggerNode from '@/components/TriggerNode.vue'
import BusinessHoursNode from '@/components/BusinessHoursNode.vue'
import MessageNode from '@/components/MessageNode.vue'
import CommentNode from '@/components/CommentNode.vue'

const nodeTypes: any = {
  trigger: markRaw(TriggerNode),
  dateTime: markRaw(BusinessHoursNode),
  sendMessage: markRaw(MessageNode),
  dateTimeConnector: markRaw(StatusConnector),
  addComment: markRaw(CommentNode),
}

const flowStore = useFlowStore()

const dialogVisible = ref(false)

// Handle adding a new node
const addNode = (newNode: any) => {
  console.log('newNode: ', newNode)
  flowStore.addNode(newNode)
}

// Handle adding a new edge (optional, for manual edge creation)
const addEdge = (newEdge: any) => {
  flowStore.addEdge(newEdge)
}

// Handle connection event from VueFlow
const onConnect = (connection: any) => {
  addEdge({
    id: `e${connection.source}->${connection.target}`,
    source: connection.source,
    target: connection.target,
  })
}
</script>
