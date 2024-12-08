// stores/flowStore.ts
import { defineStore } from 'pinia'
import payload from '@/lib/payload.json' assert { type: 'json' }
import edges from '@/lib/edges.json' assert { type: 'json' }
import type { Edge, Node } from '@vue-flow/core'

export const useFlowStore = defineStore('flowStore', {
  state: () => ({
    nodes: payload as Node[], // Array of nodes
    edges: edges as Edge[], // Array of edges
  }),
  actions: {
    addNode(node: any) {
      this.nodes.push(node)
    },
    addEdges(newEdges: any) {
      this.edges.push(...newEdges)
    },
    updateNode(id: string, updatedData: any) {
      const index = this.nodes.findIndex((node) => node.id === id)
      if (index !== -1) {
        this.nodes[index] = { ...this.nodes[index], ...updatedData }
      }
    },
    removeNode(id: string) {
      this.nodes = this.nodes.filter((node) => node.id !== id)
      this.edges = this.edges.filter((edge) => edge.source !== id && edge.target !== id)
    },
    removeEdge(edgeId: string) {
      this.edges = this.edges.filter((edge) => edge.id !== edgeId)
    },
  },
})
