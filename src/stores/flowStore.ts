import { defineStore } from 'pinia'
// Use Default json first
import payload from '@/lib/payload.json' assert { type: 'json' }
import edges from '@/lib/edges.json' assert { type: 'json' }
import type { Edge, Node } from '@vue-flow/core'

export const useFlowStore = defineStore('flowStore', {
  state: () => ({
    nodes: payload as Node[],
    edges: edges as Edge[],
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
      const nodeExists = this.nodes.some((node) => node.id === id)
      if (!nodeExists) {
        console.warn(`Node with ID ${id} does not exist.`)
        return
      }

      // Remove the node
      this.nodes = this.nodes.filter((node) => node.id !== id)

      // Remove all edges connected to the node
      this.edges = this.edges.filter((edge) => edge.source !== id && edge.target !== id)
    },
  },
})
