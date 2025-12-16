import { initializePieces, randomizePieces } from './piece'
import { updateTime } from './time';
import { playMelody } from './audio';
import { setDifficulty } from './uiManager';
import { addEventListeners } from './eventManager';

export default class Game {
    public canvas: HTMLCanvasElement;
    public context: CanvasRenderingContext2D;
    public helperCanvas: HTMLCanvasElement;
    public helperContext: CanvasRenderingContext2D;
    public startButton: HTMLButtonElement;
    public menuItemsElement: HTMLDivElement;
    public videoHasLoaded: boolean;
    public video: HTMLVideoElement;
    public SIZE: { x: number, y: number, width: number, height: number, rows: number, columns: number };
    public SCALAR: number;
    public PIECES: any;
    public START_TIME: any;
    public END_TIME: any;

    constructor() {
        this.canvas = <HTMLCanvasElement> document.getElementById("myCanvas")
        this.context= <CanvasRenderingContext2D> this.canvas.getContext("2d")
        this.helperCanvas = <HTMLCanvasElement> document.getElementById("helperCanvas")
        this.helperContext= <CanvasRenderingContext2D> this.helperCanvas.getContext("2d")
        this.video = <HTMLVideoElement> document.createElement("video")
        this.startButton = <HTMLButtonElement> document.getElementById("start");
        this.menuItemsElement = <HTMLDivElement> document.getElementById("menuItems");
        this.SIZE = { x:0, y:0, width:0, height:0, rows:3, columns:3 }
        this.videoHasLoaded = false
        this.SCALAR = 0.8
        this.PIECES = []
        this.START_TIME = null
        this.END_TIME = null
    }

    start() {
        let promise = navigator.mediaDevices.getUserMedia({ video: true })
        promise.then(signal => {
            this.video.srcObject = signal
            this.video.play()
            this.video.onloadeddata = () => {
                this.handleResize()
                window.addEventListener("resize", () => {
                    this.handleResize()
                })
                this.startButton.addEventListener("click", () => {
                    let grid = setDifficulty();
                    this.SIZE.rows = grid.rowNumber;
                    this.SIZE.columns = grid.columnNumber;
                    this.PIECES = initializePieces(this.SIZE, this.video);
                    this.START_TIME = new Date().getTime();
                    this.END_TIME = null;
                    randomizePieces(this.PIECES, this.canvas);
                    addEventListeners(this);
                    this.menuItemsElement.style.display = "none";
                });
                
                this.update();
            }
        }).catch(error => {
            console.log("Camera Error" + error)
        })
    }

    update() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.helperContext.clearRect(0, 0, this.helperCanvas.width, this.helperCanvas.height);
        this.context.globalAlpha = 0.5;
        this.context.drawImage(this.video, this.SIZE.x, this.SIZE.y, this.SIZE.width, this.SIZE.height)
        this.context.globalAlpha = 1;
        for (let i=0; i<this.PIECES.length; i++) {
            this.PIECES[i].draw(this.context);
            this.PIECES[i].draw(this.helperContext, false);
        }
        updateTime(this.START_TIME, this.END_TIME);
        window.requestAnimationFrame(() => {this.update()});
    }

    end() {
        let now = new Date().getTime();
        this.END_TIME = now;
        setTimeout(playMelody, 500);
        // const game = new Game();
        // game.start();
    }

    handleResize() {
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight

        this.helperCanvas.width = window.innerWidth
        this.helperCanvas.height = window.innerHeight

        let resizer: number = (this.SCALAR * Math.min(
            window.innerWidth/this.video.videoWidth, window.innerHeight/this.video.videoHeight
        ));
        this.SIZE.width = resizer * this.video.videoWidth
        this.SIZE.height = resizer * this.video.videoHeight
        this.SIZE.x = (window.innerWidth/2) - (this.SIZE.width/2)
        this.SIZE.y = (window.innerHeight/2) - (this.SIZE.height/2)
    }
}