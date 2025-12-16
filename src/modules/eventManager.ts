import Game from "./game";

let SELECTED_PIECE: any = null;

export function addEventListeners(game: Game) {

    let CANVAS = game.canvas
    let HELPER_CONTEXT = game.helperContext
    let PIECES = game.PIECES
    let END_TIME = game.END_TIME
    
    CANVAS.addEventListener("mousedown", onMouseDown);
    CANVAS.addEventListener("touchstart", onTouchStart);
    CANVAS.addEventListener("mousemove", onMouseMove);
    CANVAS.addEventListener("touchmove", onTouchMove);
    CANVAS.addEventListener("mouseup", onMouseUp);
    CANVAS.addEventListener("touchend", onMouseUp);

    // Mouse Down Event
    function onMouseDown (event: any) {
        const imgData = HELPER_CONTEXT.getImageData(event.x, event.y, 1, 1);
        if (imgData.data[3] == 0) {
            return
        }
        const clickedColor = "rgb(" + imgData.data[0] + "," + imgData.data[1] + "," + imgData.data[2] + ")";
        SELECTED_PIECE = getPressedPieceByColor(PIECES, clickedColor);

        // SELECTED_PIECE = getPressedPiece(event, PIECES);
        if (SELECTED_PIECE != null) {
            const index = PIECES.indexOf(SELECTED_PIECE);
            if (index > -1) {
                PIECES.splice(index, 1);
                PIECES.push(SELECTED_PIECE);
            }
            SELECTED_PIECE.offset = {
                x: event.x - SELECTED_PIECE.x,
                y: event.y - SELECTED_PIECE.y
            }
            SELECTED_PIECE.correct = false;
        }
    }

    // Mouse Move Event
    function onMouseMove(event: any) {
        if (SELECTED_PIECE != null) {
            SELECTED_PIECE.x = event.x - SELECTED_PIECE.offset.x;
            SELECTED_PIECE.y = event.y - SELECTED_PIECE.offset.y;
        }
    }

    // Touch Start Event
    function onTouchStart(event: any) {
        let loc = {x: event.touches[0].clientX,
                   y: event.touches[0].clientY};
        onMouseDown(loc);
    }

    // Touch Move Event
    function onTouchMove(event: any) {
        let loc = {x: event.touches[0].clientX,
                   y: event.touches[0].clientY};
        onMouseMove(loc);
    }

    // Mouse Up Event and Touch End Event
    function onMouseUp() {
        if (SELECTED_PIECE && SELECTED_PIECE.isClose()) {
            SELECTED_PIECE.snap();
            if (isComplete(PIECES) && END_TIME == null) {
                game.end();
                setTimeout(() => location.reload(), 5000);
            }
        }
        SELECTED_PIECE = null;
    }
}


// function getPressedPiece(loc: { x: number; y: number; }, PIECES: any[]) {
//     for (let i=PIECES.length-1; i>=0; i--) {
//         if (loc.x > PIECES[i].x && loc.x < PIECES[i].x + PIECES[i].width &&
//             loc.y > PIECES[i].y && loc.y < PIECES[i].y + PIECES[i].height) {
//                 return PIECES[i];
//             }
//     }
//     return null;
// }

function getPressedPieceByColor(PIECES: any[], color: string) {
    for (let i=PIECES.length-1; i>=0; i--) {
        if (PIECES[i].color == color) {
                return PIECES[i];
            }
    }
    return null;
}

function isComplete(PIECES: any[]) {
    for (let i=0; i<PIECES.length; i++) {
        if (PIECES[i].correct == false) {
            return false;
        }
    }
    return true;
}