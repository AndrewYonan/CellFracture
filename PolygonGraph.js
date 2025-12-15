
class PolygonGraph {

    constructor(polygon) {
        this.nodes = []
        this.create_nodes(polygon);
    }

    add_node(vec, is_POI=false) {
        this.nodes.push(new PolygonGraphNode(vec, is_POI));
    }

    create_nodes(polygon) {

        const vecs = polygon.point_vecs;

        for (let i = 0; i < vecs.length; ++i) {
            this.nodes.push(new PolygonGraphNode(vecs[i]));            
        }

        for (let i = 0; i < vecs.length - 1; ++i) {
            this.add_edge(vecs[i], vecs[i + 1]);
        }

        this.add_edge(vecs[0], vecs[vecs.length - 1]);

    }
    
    add_edge(vec1, vec2) {

        let node1 = this.find(vec1);
        let node2 = this.find(vec2);

        if (!node1 || !node2) return;

        node1.adj_nodes.push(node2);
        node2.adj_nodes.push(node1);
    }


    find(vec) {
        for (let i = 0; i < this.nodes.length; ++i) {
            if (this.nodes[i].vec.equals(vec)) {
                return this.nodes[i];
            }
        }
        return null;
    }

    set_all_unvisited() {
        for (let i = 0; i < this.nodes.length; ++i) {
            this.nodes[i].visited = false;
        }
    }

    partition_nodes_by_line(line) {

        for (let i = 0; i < this.nodes.length; ++i) {

            let v1 = line.p2.sub(line.p1);
            let v2 = this.nodes[i].vec.sub(line.p1);

            if (v1.cross(v2) < 0) this.nodes[i].partition = 0;
            else this.nodes[i].partition = 1;
        }
    }

    DFS_draw(start_vec) {
        
        const start_node = this.find(start_vec);
        this.set_all_unvisited();
        this.DFS_draw_helper(start_node);

    }

    DFS_draw_helper(node) {

        node.visited = true;

        if (node.is_POI) graphics_POI_node(node.vec);
        else {
            if (node.partition == 0) {
                graphics_node_black(node.vec);
            }
            else {
                graphics_node_red(node.vec);
            }
        } 

        for (const adj_node of node.adj_nodes) {

            if (!adj_node.visited) {

                graphics_line(node.vec, adj_node.vec);
                this.DFS_draw_helper(adj_node);
            }
        }
    }
}