const canvas = document.getElementById("canvas");
const BG_MAIN_COLOR = "rgb(233, 233, 233)";
const W = 1600;
const H = 1000;
const PI = 3.1415;
const ctx = build_canvas(canvas, adaptive_res=true);
const frame_rate = 60;
const iterator = setInterval(frame, 1000 / frame_rate);
const MAX_CUTS = 1;
const poly1 = Polygon.generate_hard_polygon();

let CUTS = 0;
let CUT_START_POINT = null;
let CUT_IN_PROGRESS = false;
let INTERACTIVE_CUTS = [];
let MOUSE_LOC = null;
let CUT_FRAME = null;
let PAUSED = false;


init_event_handlers(canvas, poly1);


function frame() {

    if (!PAUSED) ctx.clearRect(0, 0, W, H);
    if (!PAUSED) poly1.draw(ctx);

    if (CUT_IN_PROGRESS) {
        draw_in_progress_cut(ctx);
    }

    for (const IC of INTERACTIVE_CUTS) {
        IC.draw(ctx);
    }


    if (CUT_FRAME) {
        CUT_FRAME.polygon_graph.DFS_draw(poly1.point_vecs[poly1.point_vecs.length - 1]);
    }

}



function create_cut_frame(polygon, cut) {
    return new CutFrame(polygon, cut);
}



function graphics_line(vec1, vec2) {
    ctx.strokeStyle = "blue";
    ctx.beginPath();
    ctx.moveTo(vec1.x, vec1.y);
    ctx.lineTo(vec2.x, vec2.y);
    ctx.stroke();
}

function graphics_node_black(vec) {
    ctx.strokeStyle = "black";
    ctx.lineWidth = 4;
    circle(vec.x, vec.y, 15);
}

function graphics_node_red(vec) {
    ctx.strokeStyle = "red";
    ctx.lineWidth = 4;
    circle(vec.x, vec.y, 15);   
}

function graphics_POI_node(vec) {
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 2;
    circle(vec.x, vec.y, 15);
}

function circle(x, y, r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, PI*2);
    ctx.stroke();
}


function draw_in_progress_cut(ctx) {
    ctx.strokeStyle = "red";
    ctx.beginPath();
    ctx.moveTo(CUT_START_POINT.x, CUT_START_POINT.y);
    ctx.lineTo(MOUSE_LOC.x, MOUSE_LOC.y);
    ctx.stroke();
}


function build_canvas(canvas, adaptive_res) {

    const dpr = window.devicePixelRatio || 1; 

    if (adaptive_res) {
        canvas.width = W * dpr;
        canvas.height = H * dpr;
    }
    else {
        canvas.width = W;
        canvas.height = H;
    }
    
    canvas.style.width = W + "px";
    canvas.style.height = H + "px";
    
    canvas.style.position = "absolute";
    canvas.style.left = "50%";
    canvas.style.transform = "translateX(-50%)"
    canvas.style.backgroundColor = BG_MAIN_COLOR;;

    const ctx = canvas.getContext('2d');
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    if (adaptive_res) {
        ctx.scale(dpr, dpr);
    }

    return ctx;
}