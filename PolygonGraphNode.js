class PolygonGraphNode {
    constructor(vec, is_POI=false) {
        this.vec = vec;
        this.adj_nodes = [];
        this.visited = false;
        this.is_POI = is_POI;
        this.partition = 0;
    }
}