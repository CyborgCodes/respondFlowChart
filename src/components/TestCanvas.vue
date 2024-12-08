<template>
  <div class="w-full h-full">
    <VueFlow
      v-model:nodes="flowStore.nodes"
      :edges="flowStore.edges"
      :node-types="nodeTypes"
      @connect="onConnect"
      @nodeClick="onNodeClick"
      fit-view-on-init
    >
      <Background />
      <Panel position="top-right">
        <Button label="Create New Node" @click="dialogVisible = true" />
      </Panel>
    </VueFlow>
  </div>

  <CreateNode v-model:visible="dialogVisible" />
  <Sidebar v-model:visible="drawerVisible" :node-data="nodeData" />
</template>

<script setup lang="ts">
import { markRaw, ref } from 'vue'
import { useFlowStore } from '@/stores/flowStore'
import { VueFlow, Panel } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import { Button } from 'primevue'

// ** Components
import CreateNode from '@/components/CreateNode.vue'
import Sidebar from './Sidebar.vue'

import MessageNodeTest from './MessageNodeTest.vue'
//@ts-ignore
import TriggerNode from './TriggerNode.vue'
//@ts-ignore
import CommentNodeTest from './CommentNodeTest.vue'
//@ts-ignore
import BusinessHoursTest from './BusinessHoursTest.vue'
import StatusConnector from './StatusConnector.vue'

const nodeTypes: any = {
  trigger: markRaw(TriggerNode),
  dateTime: markRaw(BusinessHoursTest),
  addComment: markRaw(CommentNodeTest),
  sendMessage: markRaw(MessageNodeTest),
  dateTimeConnector: markRaw(StatusConnector),
}

const flowStore = useFlowStore()

const dialogVisible = ref(false)

const drawerVisible = ref(false)

const nodeData: any = ref([])

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

const onNodeClick = (event: any) => {
  console.log('event: ', event.node.type)
  switch (event.node.type) {
    case 'dateTime':
      const node = flowStore.nodes.find((node) => node.id === event.node.id)

      nodeData.value = node?.data
      console.log('node: ', node?.data)
      drawerVisible.value = true
      break
  }
}
</script>
