class CutFrame {

    constructor(cut, polygon) {
        
        this.cut_line = cut;
        this.polygon = polygon;  
        this.polygon_graph = new PolygonGraph(polygon);
        this.adjoin_POIs();
        this.polygon_graph.partition_nodes_by_line(cut);
        this.result_frags = [];
        this.generate_result_frags();

    }

    generate_result_frags() {

        const start = this.polygon_graph.nodes[0];
        this.result_frags = this.polygon_graph.generate_frags(start);

        const idx = 1;
        console.log(this.result_frags[idx])
        this.draw_result_frag(this.result_frags[idx]);

    }


    draw_result_frag(frag) {
        
        ctx.lineWidth = 10;

        for (let i = 0; i < frag.length - 1; ++i) {
            graphics_line(frag[i].vec, frag[i + 1].vec);
        }

        graphics_line(frag[frag.length - 1].vec, frag[0].vec);
    }

    adjoin_POIs() {

        const poly_segs = this.polygon.get_line_segs();

        for (const seg of poly_segs) {

            const POI = this.get_POI(seg, this.cut_line);

            if (POI) {

                this.polygon_graph.add_node(POI, true);
                this.polygon_graph.add_edge(POI, seg.p1);
                this.polygon_graph.add_edge(POI, seg.p2);
            }
        }
    }

    get_POI(L1, L2) {

        const dx1 = L1.p2.x - L1.p1.x;
        const dx2 = -(L2.p2.x - L2.p1.x);
        const dy1 = L1.p2.y - L1.p1.y;
        const dy2 = -(L2.p2.y - L2.p1.y);

        const d0 = L2.p1.x - L1.p1.x;
        const d1 = L2.p1.y - L1.p1.y;
        const D = dx1*dy2 - dx2*dy1;

        if (D == 0) return null; // same slope
        
        const t1 = (dy2*d0 - dx2*d1) / D;

        if (t1 <= 0 || t1 >= 1) return null; 

        const x = L1.p1.x + dx1 * t1;
        const y = L1.p1.y + dy1 * t1;

        return new Vector2(x, y);
    }
    
}