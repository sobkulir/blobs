let CANVAS = null;
const CANVAS_ID = "main-canvas";
const NOISE = {
    div: 1.5,
    scale: 300,
}
const OTHER_NOISE = {
    div: 50,
    scale: 1,
}
const COLORS = [
    '#A13939',
    '#E75151',
    '#FCC88A',
    '#C2C57F',
];

function setup() {
    const el = document.getElementById(CANVAS_ID);
    CANVAS = createCanvas(el.clientWidth, el.clientHeight);
    CANVAS.parent(CANVAS_ID);
    background(255);
}

function blob_points(num_pts, x, y, r) {
    pts = [];
    for (let i = 0; i < num_pts; ++i) {
        const angle = map(i, 0, num_pts, 0, 2*PI);
        const x_pos = map(sin(angle), -1, 1, 0, 1);
        const y_pos = map(cos(angle), -1, 1, 0, 1);
        const randed_r = r + map(noise(frameCount/500, x_pos/NOISE.div, y_pos/NOISE.div), 0, 1, -NOISE.scale, NOISE.scale);
        const x_fin = x + randed_r * (sin(angle));
        const y_fin = y + randed_r * (cos(angle));
        pts.push({x: x_fin, y: y_fin});
    }
    return pts;
}

function blob_fill(pts, col) {
    let c = color(col);
    c.setAlpha(100);
    fill(c);
    noStroke();
    beginShape();
    for (let i = 0; i < pts.length; ++i) {
        vertex(pts[i].x, pts[i].y);
    }
    endShape(CLOSE);
}

function blob_stroke(pts) {
    stroke(59);
    strokeWeight(8);
    noFill();
    beginShape(POINTS);
    for (let i = 0; i < pts.length; ++i) {
        let noisify = (x) => map(noise(frameCount/1000, x/1000), 0, 1, -100, 100);
        vertex(pts[i].x + noisify(pts[i].x), pts[i].y + noisify(pts[i].y + 1000));
    }
    endShape();
}

function draw() {
    clear();
    const pts = blob_points(400, width/2, height/2, 200);
    blob_stroke(pts);
    blob_fill(pts, COLORS[1]);
}

function windowResized() {
    const el = document.getElementById(CANVAS_ID);
    resizeCanvas(el.clientWidth, el.clientHeight);
}
