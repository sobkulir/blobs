let CANVAS = null;
const CANVAS_ID = "main-canvas";
const NOISE = {
    div: 0.7,
    scale: 150,
}

function setup() {
    const el = document.getElementById(CANVAS_ID);
    CANVAS = createCanvas(el.clientWidth, el.clientHeight);
    CANVAS.parent(CANVAS_ID);
    background(255);

}

function draw() {
    clear();
    const NUM_PTS = 180;

    const orig = {
        x: width/2,
        y: height/2,
        r: 300,
    };
    noFill();
    beginShape();
    for (let i = 0; i < NUM_PTS; ++i) {
        const angle = map(i, 0, NUM_PTS, 0, 2*PI);
        const x_pos = map(sin(angle), -1, 1, 0, 1);
        const y_pos = map(cos(angle), -1, 1, 0, 1);
        const randed_r = orig.r + NOISE.scale*noise(frameCount/100, x_pos/NOISE.div, y_pos/NOISE.div);
        const x = orig.x + randed_r * sin(angle);
        const y = orig.y + randed_r * cos(angle);
        vertex(x, y);
    }
    endShape(CLOSE);
}

function windowResized() {
    const el = document.getElementById(CANVAS_ID);
    resizeCanvas(el.clientWidth, el.clientHeight);
}
