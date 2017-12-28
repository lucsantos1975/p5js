/****************************************** 
 *  Asaas dev team Coding Dojo 2
 *  Challenge: "Hit 'em Balls" game
 *  Date: 28/12/2017
 ******************************************/

const gameFrameRate = 10; // FPS

const ballConfigs = [
    {color: {r: 255, g:   0, b:   0}, points: -2}, // red
    {color: {r: 255, g: 125, b:   0}, points: -1}, // orange
    {color: {r: 255, g: 255, b:   0}, points:  0}, // yellow
    {color: {r:   0, g: 255, b:   0}, points:  1}, // green
    {color: {r:   0, g:   0, b: 255}, points:  2}  // blue
];

// 6x6 points matrix for balls centers
const pins = [
    new Pin(50,  50), new Pin(150,  50), new Pin(250,  50), new Pin(350,  50), new Pin(450,  50), new Pin(550,  50), 
    new Pin(50, 150), new Pin(150, 150), new Pin(250, 150), new Pin(350, 150), new Pin(450, 150), new Pin(550, 150), 
    new Pin(50, 250), new Pin(150, 250), new Pin(250, 250), new Pin(350, 250), new Pin(450, 250), new Pin(550, 250), 
    new Pin(50, 350), new Pin(150, 350), new Pin(250, 350), new Pin(350, 350), new Pin(450, 350), new Pin(550, 350), 
    new Pin(50, 450), new Pin(150, 450), new Pin(250, 450), new Pin(350, 450), new Pin(450, 450), new Pin(550, 450), 
    new Pin(50, 550), new Pin(150, 550), new Pin(250, 550), new Pin(350, 550), new Pin(450, 550), new Pin(550, 550), 
];

// ball life in seconds = ballLife / (gameFrameRate ^ 2)
const ballLifes = [50, 100, 200, 300, 400];

const ballMinDiameter = 40;
const ballMaxDiameter = 80;

const ballCount = 2;

var balls = [];
var points = 0;

function setup() {
    createCanvas(600, 650);
    frameRate(gameFrameRate);

    for (var i = 0; i < ballCount; i++) {
        balls[i] = new Ball();
    }
}

function draw() { 
    background(50);
    
    for (var i = 0; i < balls.length; i++) {
        balls[i].show();
    }

    drawInfoBar();
    drawScore();
}

function mousePressed() {
    for (var i = 0; i < balls.length; i++) {
        if (balls[i].hit(mouseX, mouseY)) {
            points += balls[i].points;
        }
    }
}

function drawInfoBar() {
    fill(80);
    rect(0, 600, 600, 650);
}

function drawScore() {
    textSize(20);
    fill(255);
    text("Score: " + points, 10, 630);
}

function Pin(x, y) {
    this.x = x;
    this.y = y;
    this.used = false;
}

function Ball() {
    this.pin = null;
    this.diameter = 0;
    this.color = null;   
    this.points = 0;
    this.life = 0;
    this.wasHit = false;

    this.show = function() {
        if (this.life > 0) {
            this.life -= gameFrameRate;
        } 
        
        if (this.life == 0) {
            if (this.pin != null) {
                this.pin.used = false;
            }

            var pickedPin = random(pins);
            while (pickedPin.used) {
                pickedPin = random(pins);
            }
            this.pin = pickedPin;
            this.pin.used = true;
            
            this.diameter = random(ballMinDiameter, ballMaxDiameter);

            var ballConfig = random(ballConfigs);
            this.color = ballConfig.color;
            this.points = ballConfig.points;

            this.life = random(ballLifes);

            this.wasHit = false;            
        }
        
        if (this.wasHit) {
            fill(0);
        } else {
            fill(this.color.r, this.color.g, this.color.b);
        }

        noStroke();
        ellipse(this.pin.x, this.pin.y, this.diameter, this.diameter);
    }

    this.hit = function(mouseXPos, mouseYPos) {
        var distance = dist(this.pin.x, this.pin.y, mouseXPos, mouseYPos);
        if (distance <= (this.diameter / 2) && !this.wasHit) {
            this.wasHit = true;
        }

        return this.wasHit;
    }
}
