

function init_event_handlers(canvas, polygon) {

    canvas.addEventListener("click", (evt) => {

        if (CUTS >= MAX_CUTS) return;

        if (CUT_IN_PROGRESS) {

            const cut = new InteractiveCut(CUT_START_POINT, MOUSE_LOC);

            CUT_FRAME = new CutFrame(cut, polygon);
            INTERACTIVE_CUTS.push(cut);
            CUT_IN_PROGRESS = false;
            CUTS++;
            PAUSED = true;
            
            
        }
        else {

            CUT_START_POINT = MOUSE_LOC;
            CUT_IN_PROGRESS = true;

        }

    });

    canvas.addEventListener("mousemove", (evt) => {
        MOUSE_LOC = get_canvas_loc(evt);
    });

    document.addEventListener("keydown", (evt) => {
        if (evt.key == " ") {
            if (INTERACTIVE_CUTS.length > 0) {
                console.log("CUT!");    
            }
        }
        if (evt.key == "r") {
            CUTS = 0;
            INTERACTIVE_CUTS = [];
            CUT_FRAME = null;
            PAUSED = false;
        }
    });
}


function get_canvas_loc(evt) {
    const rect = canvas.getBoundingClientRect();
    return new Vector2(evt.clientX - rect.left, evt.clientY - rect.top);
}
