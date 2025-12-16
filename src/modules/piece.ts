let POP_SOUND = new Audio("/pop.mp3");
POP_SOUND.volume = 0.2;

class Piece {
    video: HTMLVideoElement;
    rowIndex: number;
    columnIndex: number;
    width: number;
    height: number;
    x: number;
    y: number;
    rows: number;
    columns: number;
    xCorrect: number;
    yCorrect: number;
    correct: boolean;
    bottom: any;
    right: any;
    top: any;
    left: any;
    color: string;

    constructor(rowIndex: number, columnIndex: number, 
                SIZE: { x: number, y: number, width: number, height: number, rows: number, columns: number }, 
                VIDEO: HTMLVideoElement, color: string ) {
        this.video = VIDEO
        this.rowIndex = rowIndex
        this.columnIndex = columnIndex
        this.width = SIZE.width/SIZE.columns;
        this.height = SIZE.height/SIZE.rows;
        this.rows = SIZE.rows;
        this.columns = SIZE.columns;
        this.x = SIZE.x + this.columnIndex*this.width;
        this.y = SIZE.y + this.rowIndex*this.height;
        this.xCorrect = this.x;
        this.yCorrect = this.y;
        this.correct = true;
        this.bottom = null;
        this.right = null;
        this.top = null;
        this.left = null;
        this.color = color;
    }

    draw(context: CanvasRenderingContext2D, useCam: boolean = true) {
        context.beginPath();

        const sz = Math.min(this.width, this.height);
        const neck = 0.05*sz;
        const tabWidth = 0.2*sz;
        const tabHeight = 0.3*sz;

        // Draw Top Edge
        context.moveTo(this.x, this.y);

        if (this.top) {
            context.lineTo(this.x + this.width * Math.abs(this.top) - neck, 
                           this.y)
            context.bezierCurveTo(this.x + this.width * Math.abs(this.top) - neck, 
                                  this.y - tabHeight * Math.sign(this.top) * 0.2,

                                  this.x + this.width * Math.abs(this.top) - tabWidth, 
                                  this.y - tabHeight * Math.sign(this.top),

                                  this.x + this.width * Math.abs(this.top), 
                                  this.y - tabHeight * Math.sign(this.top))

            context.bezierCurveTo(this.x + this.width * Math.abs(this.top) + tabWidth, 
                                  this.y - tabHeight * Math.sign(this.top),

                                  this.x + this.width * Math.abs(this.top) + neck, 
                                  this.y - tabHeight * Math.sign(this.top) * 0.2,

                                  this.x + this.width * Math.abs(this.top) + neck, 
                                  this.y)
        }
        context.lineTo(this.x + this.width, this.y);
        

        // Draw Right Edge
        if (this.right) {
            context.lineTo(this.x + this.width, 
                           this.y + this.height * Math.abs(this.right) - neck)
            
            context.bezierCurveTo(this.x + this.width - tabHeight * Math.sign(this.right) * 0.2, 
                                  this.y + this.height * Math.abs(this.right) - neck,

                                  this.x + this.width - tabHeight * Math.sign(this.right),
                                  this.y + this.height * Math.abs(this.right) - tabWidth,

                                  this.x + this.width - tabHeight * Math.sign(this.right), 
                                  this.y + this.height * Math.abs(this.right))

            context.bezierCurveTo(this.x + this.width - tabHeight * Math.sign(this.right),
                                  this.y + this.height * Math.abs(this.right) + tabWidth,

                                  this.x + this.width - tabHeight * Math.sign(this.right) * 0.2, 
                                  this.y + this.height * Math.abs(this.right) + neck,

                                  this.x + this.width, 
                                  this.y + this.height * Math.abs(this.right) + neck)
        }
        context.lineTo(this.x + this.width, this.y + this.height);
        
        // Draw Bottom Edge
        if (this.bottom) {
            context.lineTo(this.x + this.width * Math.abs(this.bottom) + neck, 
                           this.y + this.height)

            context.bezierCurveTo(this.x + this.width * Math.abs(this.bottom) + neck, 
                                  this.y + this.height + tabHeight*Math.sign(this.bottom)*0.2,

                                  this.x + this.width * Math.abs(this.bottom) + tabWidth, 
                                  this.y + this.height + tabHeight*Math.sign(this.bottom),

                                  this.x + this.width * Math.abs(this.bottom), 
                                  this.y + this.height + tabHeight*Math.sign(this.bottom))
       
            context.bezierCurveTo(this.x + this.width * Math.abs(this.bottom) - tabWidth, 
                                  this.y + this.height + tabHeight*Math.sign(this.bottom),

                                  this.x + this.width * Math.abs(this.bottom) - neck, 
                                  this.y + this.height + tabHeight*Math.sign(this.bottom)*0.2,

                                  this.x + this.width * Math.abs(this.bottom) - neck, 
                                  this.y + this.height)
        }
        context.lineTo(this.x, this.y + this.height);

        // Draw Left Edge
        if (this.left) {
            context.lineTo(this.x, 
                           this.y + this.height * Math.abs(this.left) + neck)
            context.bezierCurveTo(this.x + tabHeight * Math.sign(this.left) * 0.2,
                                  this.y + this.height * Math.abs(this.left) + neck,
                                  
                                  this.x + tabHeight * Math.sign(this.left),
                                  this.y + this.height * Math.abs(this.left) + tabWidth,
                                  
                                  this.x + tabHeight * Math.sign(this.left),
                                  this.y + this.height * Math.abs(this.left))

            context.bezierCurveTo(this.x + tabHeight * Math.sign(this.left),
                                  this.y + this.height * Math.abs(this.left)- tabWidth,
                                  
                                  this.x + tabHeight * Math.sign(this.left) * 0.2,
                                  this.y + this.height * Math.abs(this.left) - neck,
                                  
                                  this.x, 
                                  this.y + this.height * Math.abs(this.left) - neck)
        }
        context.lineTo(this.x, this.y);

        context.save();
        context.clip();

        const scaledTabHeight = Math.min(this.video.videoWidth/this.columns, 
                                         this.video.videoHeight/this.rows) * tabHeight/sz;

        if (useCam) {
            context.drawImage(this.video, 
                this.columnIndex * this.video.videoWidth / this.columns - scaledTabHeight, 
                this.rowIndex * this.video.videoHeight / this.rows - scaledTabHeight,
                this.video.videoWidth / this.columns + scaledTabHeight*2, 
                this.video.videoHeight / this.rows + scaledTabHeight*2,
                this.x - tabHeight,
                this.y - tabHeight,
                this.width + tabHeight*2,
                this.height + tabHeight*2);
        } else {
            context.fillStyle = this.color;
            context.fillRect(this.x - tabHeight, this.y - tabHeight, 
                this.width + tabHeight*2, this.height + tabHeight*2)
        }

        context.restore();
        context.stroke();
    }

    isClose() {
        let dist = distance({x: this.x, y: this.y}, 
            {x: this.xCorrect, y: this.yCorrect})
        if (dist < this.width/3) {
            return true;
        }
        return false;
    }

    snap() {
        this.x = this.xCorrect;
        this.y = this.yCorrect;
        this.correct = true;
        POP_SOUND.play();
    }
}

function distance(p1: { x: number; y: number; }, p2: { x: number; y: number; }) {
    let xlen = p1.x - p2.x;
    let ylen = p1.y - p2.y;
    let dist = Math.sqrt(xlen*xlen + ylen*ylen);
    return dist;
}

function generateRandomColor() {
    const red = Math.floor(Math.random() * 255);
    const green = Math.floor(Math.random() * 255);
    const blue = Math.floor(Math.random() * 255);
    return "rgb(" + red + "," + green + "," + blue + ")"
}

export function initializePieces(SIZE: { x: number, y: number, width: number, height: number, rows: number, columns: number },
                                 VIDEO: HTMLVideoElement) {

    let PIECES = [];
    let uniqueRandomColors: any = [];

    for (let i=0; i < SIZE.rows; i++) {
        for (let j=0; j < SIZE.columns; j++) {
            let color = generateRandomColor();
            while (uniqueRandomColors.includes(color)) {
                color = generateRandomColor();
            }
            uniqueRandomColors.push(color);
            PIECES.push(new Piece(i, j, SIZE, VIDEO, color));
        }
    }

    let count = 0;
    for (let i=0; i < SIZE.rows; i++) {
        for (let j=0; j < SIZE.columns; j++) {
            const piece = PIECES[count];

            if (i == SIZE.rows-1) {
                piece.bottom = null;
            }  
            else {
                let sign = (Math.random() - 0.5) < 0 ? -1 : 1;
                piece.bottom = sign * (0.3 + Math.random()*0.4);
            }

            if (j == SIZE.columns-1) {
                piece.right = null;
            } 
            else {
                let sign = (Math.random() - 0.5) < 0 ? -1 : 1;
                piece.right = sign * (0.3 + Math.random()*0.4);
            }

            if (j == 0) {
                piece.left = null;
            } 
            else {
                piece.left = -PIECES[count - 1].right;
            }

            if (i == 0) {
                piece.top = null;
            } 
            else {
                piece.top = -PIECES[count - SIZE.columns].bottom;
            }

            count++;
        }
    }
    return PIECES;
}

export function randomizePieces(PIECES: any, CANVAS: HTMLCanvasElement) {
    for (let i=0; i < PIECES.length; i++) {
        let loc = {
            x: Math.random() * (CANVAS.width - PIECES[i].width),
            y: Math.random() * (CANVAS.height - PIECES[i].height)
        };
        PIECES[i].x = loc.x;
        PIECES[i].y = loc.y;
        PIECES[i].correct = false;
    }
}