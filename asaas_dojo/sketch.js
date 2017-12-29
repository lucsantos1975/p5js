var positions = [];
var balls = [];
var colors =  [
    {rgb: [255,0,0], points: -2}, 
    {rgb: [255,125,0], points: -1},
    {rgb: [255,255,0], points: 0},
    {rgb:[0,0,255], points: 1},
    {rgb: [0,255,0], points: 2},
];
var score = 0;

function setup() {
	createCanvas(600, 640);
    frameRate(10);
    background(240);
    
    for (var i = 0; i < 6; i++) {
        positions.push({x: (i*100) + 50, y: 50, used: false});
        positions.push({x: (i*100) + 50, y: 150, used: false});
        positions.push({x: (i*100) + 50, y: 250, used: false});
        positions.push({x: (i*100) + 50, y: 350, used: false});
        positions.push({x: (i*100) + 50, y: 450, used: false});
        positions.push({x: (i*100) + 50, y: 550, used: false});
    }

    for (var i = 0; i < 6; i++) {
        balls.push({lifeTime: 0, radius: 50});
    }
}

function createBall(ball, randomPosition) {
    fill(240);
    stroke(240);
    rect(ball.x - ball.radius, ball.y - ball.radius, 100, 100);
    ball.x = randomPosition.x;
    ball.y = randomPosition.y;
    ball.lifeTime = random(1, 100);
    ball.color = random(colors);
    
    fill(ball.color.rgb[0], ball.color.rgb[1], ball.color.rgb[2]);
    stroke(ball.color.rgb[0], ball.color.rgb[1], ball.color.rgb[2]);
    ellipse(ball.x, ball.y, 50, 50);
}

function clickBall(ball) {
    ball.lifeTime = 0;
}

function mouseClicked() {
    var breakMap = false
    balls.map(function(ball) {
        if (breakMap) return;
        if (dist(ball.x, ball.y, mouseX, mouseY) <= ball.radius) {
            ball.lifeTime = 0;
            score += ball.color.points;
            
            noStroke();
            fill(240);
            rect(0,600,600, 40);
            fill(0);
            textSize(25);
            text(`Score = ${score}`, 20, 620);
            breakMap = true;
        }
    });
}

function draw() {
    positions.map(function(element, index) { element.used = false;});

    stroke(50);
    fill(100);

    balls.map(function(ball, index) {
        ball.lifeTime--;
        if (ball.lifeTime > 0) return ;
        
        var randomPosition = random(positions);        
        while (randomPosition.used) {
            randomPosition = random(positions);
        }
    
        createBall(ball, randomPosition);

        randomPosition.used = true;
    });
}