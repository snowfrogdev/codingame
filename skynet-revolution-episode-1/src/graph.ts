import { booleanLiteral } from "@babel/types";

class Node {
    private marked_ = false
    private connectNodes_: number[] = []
    constructor() {}
    
    mark() {
        this.marked_ = true
    }

    isMarked() {
        return this.marked_
    }

    getConnectNodes() {
        return this.connectNodes_.values()
    }

    addConnectedNode(connectNode: number) {
        this.connectNodes_.push(connectNode)
    }

    removeConnectedNode(connectNode: number) {
        const nodeIndex = this.connectNodes_.indexOf(connectNode)
        this.connectNodes_.splice(nodeIndex, 1)
    }
}

export class Graph {
    private nodes_: Node[]
    constructor(numberOfNodes: number) {
        this.nodes_ = new Array(numberOfNodes)
        for (let i = 0; i < numberOfNodes; i++) {
            this.nodes_[i] = new Node()
        }
    }

    addLink(node1: number, node2: number) {
        this.nodes_[node1].addConnectedNode(node2)
        this.nodes_[node2].addConnectedNode(node1)
        
    }

    removeLink(node1: number, node2: number) {
        this.nodes_[1].removeConnectedNode(node2)
        this.nodes_[2].removeConnectedNode(node1)
    }

    findBestLinkToRemove(agentsNode: number): [number, number] {
        const queue: Node[] = [this.nodes_[agentsNode]]
        this.nodes_[agentsNode].mark()
        while(queue.length > 0) {
            // Process node at index 0 in the queue
            
            for (const nodeIndex of queue[0].getConnectNodes()) {
                const connectedNode = this.nodes_[nodeIndex]
                if (connectedNode.isMarked()) {
                    queue.push(connectedNode)
                    connectedNode.mark()
                }
            }
            
            queue.shift()
        }
    }
}

const graph = new Graph(10)

graph.addLink(0,1)

graph.addLink(0,2)

graph.findBestLinkToRemove(0)
