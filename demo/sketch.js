function setup() {
	createCanvas(640, 480);
	background(200);
}

function draw() {
    stroke(0);
    if (mouseIsPressed) {
        fill(random(255), random(255), random(255));
    } else {
        fill(255);
    }
    ellipse(mouseX, mouseY, 50, 50);
}