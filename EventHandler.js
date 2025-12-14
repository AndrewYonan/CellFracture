

function init_event_handlers(canvas) {

    canvas.addEventListener("click", (evt) => {

        if (CUT_IN_PROGRESS) {
            INTERACTIVE_CUTS.push(new InteractiveCut(CUT_START_POINT, MOUSE_LOC));
            CUT_IN_PROGRESS = false;
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
    });
}


function get_canvas_loc(evt) {
    const rect = canvas.getBoundingClientRect();
    return new Vector2(evt.clientX - rect.left, evt.clientY - rect.top);
}
