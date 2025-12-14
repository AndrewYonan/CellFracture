class CutFrame {

    constructor(cut, polygon) {
        
        this.cut_line = cut;
        this.polygon = polygon;    
        this.POIs = [];
        this.generate_POIs();

    }

    generate_POIs() {

        const poly_segs = this.polygon.get_line_segs();

        for (const seg of poly_segs) {
            const POI = this.get_POI(seg, this.cut_line);
            if (POI) {
                this.POIs.push(POI);
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

        if (D == 0) return null;
        
        const t1 = (dy2*d0 - dx2*d1) / D;

        if (t1 <= 0 || t1 >= 1) return null;

        const x = L1.p1.x + dx1 * t1;
        const y = L1.p1.y + dy1 * t1;

        return new Vector2(x, y);
    }

    show_POIs() {

        for (const POI of this.POIs) {
            ctx.lineWidth = 3;
            ctx.strokeStyle = "#50f";
            circle(POI.x, POI.y, 10);
        }

    }
    
}