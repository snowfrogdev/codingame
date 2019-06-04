class Node {
  private isMarked_ = false;
  private isGateway_ = false;
  private previousNode_: Node | undefined;
  private connectNodes_: Node[] = [];
  constructor(private index_: number) {}

  get index() {
    return this.index_;
  }

  get isGateway() {
    return this.isGateway_;
  }
  set isGateway(value: boolean) {
    this.isGateway_ = value;
  }

  get previousNode(): Node | undefined {
    return this.previousNode_;
  }
  set previousNode(node: Node | undefined) {
    this.previousNode_ = node;
  }

  get isMarked() {
    return this.isMarked_;
  }
  set isMarked(value: boolean) {
    this.isMarked_ = value;
  }

  getConnectedNodes() {
    return this.connectNodes_;
  }

  addConnectedNode(connectNode: Node) {
    this.connectNodes_.push(connectNode);
  }

  removeConnectedNode(node: Node) {
    const nodeIndex = this.connectNodes_.indexOf(node);
    this.connectNodes_.splice(nodeIndex, 1);
  }
}

export class Graph {
  private nodes_: Node[];
  constructor(numberOfNodes: number) {
    this.nodes_ = Array.from(
      Array(numberOfNodes),
      (_, index) => new Node(index)
    );
  }

  addLink(node1: number, node2: number) {
    this.nodes_[node1].addConnectedNode(this.nodes_[node2]);
    this.nodes_[node2].addConnectedNode(this.nodes_[node1]);
  }

  getNode(index: number) {
    return this.nodes_[index];
  }

  removeLink(node1: number, node2: number) {
    this.nodes_[node1].removeConnectedNode(this.nodes_[node2]);
    this.nodes_[node2].removeConnectedNode(this.nodes_[node1]);
  }

  findBestLinkToRemove(agentsNodeIndex: number): [number, number] {
    this.cleanGraph_();

    const startingNode = this.nodes_[agentsNodeIndex];
    const queue: Node[] = [startingNode];
    startingNode.isMarked = true;
    while (queue.length > 0) {
      const currentNode = queue.shift() as Node;
      if (currentNode.isGateway) {
        const path = this.recursePath_(currentNode);
        const secondNodeInPathIndex = path[path.length - 2];
        return [startingNode.index, secondNodeInPathIndex];
      }

      this.processConnectedNodes_(currentNode, queue);
    }
    throw new Error("Could not find a gateway");
  }

  private cleanGraph_() {
    this.nodes_.forEach(node => {
      node.isMarked = false;
      node.previousNode = undefined;
    });
  }

  private recursePath_(node: Node, path: number[] = []): number[] {
    if (!node.previousNode) {
      path.push(node.index);
      return path;
    }
    path.push(node.index);
    return this.recursePath_(node.previousNode, path);
  }

  private processConnectedNodes_(currentNode: Node, queue: Node[]) {
    for (const connectedNode of currentNode.getConnectedNodes()) {
      if (!connectedNode.isMarked) {
        connectedNode.previousNode = currentNode;
        queue.push(connectedNode);
        connectedNode.isMarked = true;
      }
    }
  }
}
