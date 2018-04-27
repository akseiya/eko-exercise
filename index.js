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

    checkDirectRoute(from, to, strict = true) {
        if(!this.edges[from] || !this.edges[from][to]) {
            if(strict) throw new Error('No Such Route');
            return null;
        }
        return this.edges[from][to];
    }

    followDirectRoute(routeSpec) {
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
