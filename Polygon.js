class Polygon {

    constructor(point_vecs) {
        
        this.point_vecs = point_vecs;

        if (this.point_vecs.length < 3) {
            console.log("WARNING - degenerate polygon with < 3 vertices");
        }

    }

    get_line_segs() {

        let segs = [];

        for (let i = 0; i < this.point_vecs.length - 1; ++i) {

            const p1 = this.point_vecs[i];
            const p2 = this.point_vecs[i + 1];

            segs.push(new Line(p1, p2));
        }

        const first = this.point_vecs[0];
        const last = this.point_vecs[this.point_vecs.length - 1];

        segs.push(new Line(last, first));

        return segs;
    }

    draw(ctx) {

        ctx.lineWidth = 1;
        ctx.strokeStyle = "black";
        ctx.beginPath();

        for (let i = 0; i < this.point_vecs.length - 1; ++i) {

            const p1 = this.point_vecs[i];
            const p2 = this.point_vecs[i + 1];

            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.arc(p2.x, p2.y, 5, 0, PI*2);

        }

        const first = this.point_vecs[0];
        const last = this.point_vecs[this.point_vecs.length - 1];

        ctx.moveTo(last.x, last.y);
        ctx.lineTo(first.x, first.y);
        ctx.arc(first.x, first.y, 5, 0, PI*2);

        ctx.stroke();
    }

    static generate_hard_polygon() {

        let N = 10;
        let offset_x = 300;
        let offset_y = 500;
        let d_x = 50;
        let d_y = 200;
        let vecs = [];
        let i = 0;

        while (i < N) {
            vecs.push(new Vector2(offset_x + i*d_x, offset_y - d_y*(i % 2)));
            vecs.push(new Vector2(offset_x + (i + 1)*d_x, offset_y - d_y*(i % 2)));
            i++;
        }

        vecs.push(new Vector2(offset_x + i*d_x, offset_y + d_y/2));
        vecs.push(new Vector2(offset_x, offset_y + d_y/2));

        return new Polygon(vecs);
    }
}