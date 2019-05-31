import { Graph } from "./graph";

declare function readline(): string

var inputs = readline().split(' ');
const N = parseInt(inputs[0]); // the total number of nodes in the level, including the gateways

const network = new Graph(N)


const L = parseInt(inputs[1]); // the number of links
const E = parseInt(inputs[2]); // the number of exit gateways
for (let i = 0; i < L; i++) {
    var inputs = readline().split(' ');
    const N1 = parseInt(inputs[0]); // N1 and N2 defines a link between these nodes
    const N2 = parseInt(inputs[1]);
    console.error({ N1, N2 })
    network.addLink(N1, N2)
}
for (let i = 0; i < E; i++) {
    const EI = parseInt(readline()); // the index of a gateway node
}

console.error(network)

// game loop
while (true) {
    const SI = parseInt(readline()); // The index of the node on which the Skynet agent is positioned this turn

    

    // Example: 0 1 are the indices of the nodes you wish to sever the link between
    console.log('0 1');
}