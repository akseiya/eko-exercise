const clog = (wat) => {
    console.log(JSON.stringify(wat, null, 4));
    return wat;
}

class graphRunner {
    constructor(nodesSpec) {
        // The exercise doesn't worry about disconnected nodes, phew!
        this.edges = {}
        nodesSpec.split(/, +/).map(s => s.trim()).forEach(nodeSpec => {
            const [, from, to, cost] = nodeSpec.match(/(\w)(\w)(\d+)/);
            this.edges[from] || (this.edges[from] = {})
            this.edges[from][to] = parseInt(cost, 10);
        });
    }

    checkDirectRoute(from, to) {
        if(!this.edges[from] || !this.edges[from][to]) {
            throw new Error('No Such Route');
        }
        return this.edges[from][to];
    }

    followRoute(routeSpec) {
        let totalCost = 0;
        let [from, ...route] = routeSpec.split('-');
        route.forEach(nextNode => {
            totalCost += this.checkDirectRoute(from, nextNode);
            from = nextNode;
        })
        return totalCost;
    }
}

module.exports = {
    graphRunner,
    clog,
};
