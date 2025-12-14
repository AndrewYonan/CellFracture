class CutFrame {

    constructor(cut, polygon) {
        
        this.cut_line = cut;
        this.polygon = polygon;    
        this.POIs = [];

    }

    generate_POIs() {

    }

    get_POI(line_1, line_2) {
        const m1 = line_1.slope();
        const m2 = line_2.slope();
    }

    show_POIs() {

        for (const POI of this.POIs) {
            ctx.strokeStyle = "#50f";
            circle(POI.x, POI.y, 10);
        }

    }
    
}