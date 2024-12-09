<template>
  <div class="w-full h-full">
    <VueFlow
      v-model:nodes="flowStore.nodes"
      :edges="flowStore.edges"
      :node-types="nodeTypes"
      @connect="onConnect"
      fit-view-on-init
    >
      <Background />
      <MiniMap pannable zoomable />
      <Panel position="top-right">
        <Button label="Create New Node" @click="dialogVisible = true" />
      </Panel>
    </VueFlow>
  </div>

  <CreateNode v-model:visible="dialogVisible" />
</template>

<script setup lang="ts">
import { markRaw, ref } from 'vue'
import { useFlowStore } from '@/stores/flowStore'
import { VueFlow, Panel } from '@vue-flow/core'
import { MiniMap } from '@vue-flow/minimap'
import { Background } from '@vue-flow/background'
import { Button } from 'primevue'

//@ts-ignore
import TriggerNode from '@/components/TriggerNode.vue'

import StatusConnector from '@/components/StatusConnector.vue'
import CreateNode from '@/components/CreateNodeDialog.vue'
import MessageNode from '@/components/MessageNode.vue'
import CommentNode from '@/components/CommentNode.vue'
import BusinessHoursNode from '@/components/BusinessHoursNode.vue'

const nodeTypes: any = {
  trigger: markRaw(TriggerNode),
  dateTime: markRaw(BusinessHoursNode),
  addComment: markRaw(CommentNode),
  sendMessage: markRaw(MessageNode),
  dateTimeConnector: markRaw(StatusConnector),
}

const flowStore = useFlowStore()

const dialogVisible = ref(false)

const onConnect = (params: any) => {
  flowStore.edges.push({
    id: `e${params.source}-${params.sourceHandle}-${params.target}`,
    source: params.source,
    target: params.target,
    sourceHandle: params.sourceHandle,
    targetHandle: params.targetHandle,
    type: 'default',
  })
}
</script>
