let CANVAS = null;
const CANVAS_ID = "main-canvas";

function setup() {
    const el = document.getElementById(CANVAS_ID);
    CANVAS = createCanvas(el.clientWidth, el.clientHeight);
    CANVAS.parent(CANVAS_ID);
}

function draw() {
    background(200);
    text("put your p5.js code here",10, frameCount % height);
}

function windowResized() {
    const el = document.getElementById(CANVAS_ID);
    resizeCanvas(el.clientWidth, el.clientHeight);
}
