const clog = wat => {
    console.log(JSON.stringify(wat, null, 4));
    return wat;
}

class graphRunner {
    constructor(nodesSpec, uniqueNodes = false) {
        // The exercise doesn't worry about disconnected nodes, phew!
        this.edges = {}
        nodesSpec.split(/, +/).map(s => s.trim()).forEach(nodeSpec => {
            const [, from, to, cost] = nodeSpec.match(/(\w)(\w)(\d+)/);
            this.edges[from] || (this.edges[from] = {})
            this.edges[from][to] = parseInt(cost, 10);
        });
        // Cache all valid routes
        this.allRoutes = [];
        const traverser = uniqueNodes ? scanUniqueNodes : scanUniqueSteps;
        for(let startingNode in this.edges) {
            traverser(this, startingNode);
        };
        return this;
    }

    checkDirectRoute(from, to, strict = true) {
        if(!this.edges[from] || !this.edges[from][to]) {
            if(strict) throw new Error(`No Such Route ${from} - ${to}`);
            return null;
        }
        return this.edges[from][to];
    }

    followDirectRoute(routeSpec) {
        let totalCost = 0;
        let [from, ...route] = routeSpec.split('-');
        for(let i in route) {
            const nextNode = route[i];
            totalCost += this.checkDirectRoute(from, nextNode);
            from = nextNode;
        }
        return totalCost;
    }

    getIndirectRoutes(from, to, maxSteps = null) {
        const routes = this.allRoutes.filter(
            r => (r.startsWith(from) && r.endsWith(to))
        );
        if(!maxSteps) return routes;
        return routes.filter(r => r.split('-').length <= maxSteps + 1);
    }

    findCheapestRoute(routeSpec) {
        const [from, to] = routeSpec.split('-');
        let minCost = 0;
        const routes = this.getIndirectRoutes(from, to);
        // I'd map this. If I haven't just learnt about THIS.
        for(let i in routes) {
            const currentCost = this.followDirectRoute(routes[i]);
            if(minCost == 0 || minCost > currentCost) {
                minCost = currentCost;
            }
        }
        return minCost;
    }
}

const storeRoute = (graph, route) => {
    if(route.length < 2) return;
    const routeSpec = route.join('-');
    if(graph.allRoutes.includes(routeSpec)) return;
    graph.allRoutes.push(routeSpec);
}

const scanUniqueNodes = (graph, node, routeSoFar = []) => {
    const routeToStore = [...routeSoFar, node];
    storeRoute(graph, routeToStore);
    for(nextNode in graph.edges[node]) {
        if(nextNode == node) continue;
        const lastPosition = routeSoFar.indexOf(nextNode);
        // Don't store routes like A-B-E-B or F-D-E-A-D
        if(lastPosition == 0) {
            storeRoute(graph, [...routeToStore, nextNode]);
        }
        // New node found, recurse!
        if(lastPosition == -1) {
            scanUniqueNodes(graph, nextNode, [...routeSoFar, node]);
        }
    }
};

const scanUniqueSteps = (graph, node, lastNode = null, stepsSoFar = []) => {
    let stepsNow;
    if(stepsSoFar.length > 10) return;

    if(lastNode) {
        const currentStep = `${lastNode}-${node}`;
        if(stepsSoFar.includes(currentStep)) return;
        stepsNow = [...stepsSoFar, currentStep];
        storeRoute(graph, steps2RouteSpec(stepsNow));
    }

    for(nextNode in graph.edges[node]) {
        scanUniqueSteps(graph, nextNode, node, stepsNow);
    }
};

const steps2RouteSpec = steps => {
    const nodePairs = steps.map(s => s.split('-'));
    const [[ firstNode ]] = nodePairs;
    return nodePairs.reduce(
        (route, nextPair) => [...route,nextPair[1]], 
        [firstNode]
    );
};

module.exports = {
    graphRunner,
    clog,
};
