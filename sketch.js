let player;
let gravity = 0.5;
let jumpForce = -10;
let platforms = [];

function setup() {
createCanvas(800, 400);
player = new Player();

// Create some platforms
platforms.push(new Platform(100, 300, 200, 20));
platforms.push(new Platform(400, 250, 150, 20));
platforms.push(new Platform(600, 350, 100, 20));
}

function draw() {
background(135, 206, 235); // Sky blue background

player.update();
player.display();

for (let plat of platforms) {
plat.display();
player.checkPlatform(plat);
}
}

function keyPressed() {
if (key === ' ' || keyCode === UP_ARROW) {
player.jump();
}
}

class Player {
constructor() {
this.x = 100;
this.y = 100;
this.w = 40;
this.h = 40;
this.xSpeed = 0;
this.ySpeed = 0;
this.onGround = false;
}

update() {
// Movement
this.xSpeed = 0;
if (keyIsDown(LEFT_ARROW)) {
this.xSpeed = -5;
}
if (keyIsDown(RIGHT_ARROW)) {
this.xSpeed = 5;
}

this.x += this.xSpeed;
this.ySpeed += gravity;
this.y += this.ySpeed;

// Ground collision
if (this.y + this.h > height) {
this.y = height - this.h;
this.ySpeed = 0;
this.onGround = true;
} else {
this.onGround = false;
}
}

jump() {
if (this.onGround) {
this.ySpeed = jumpForce;
this.onGround = false;
}
}

checkPlatform(platform) {
if (
this.x + this.w > platform.x &&
this.x < platform.x + platform.w &&
this.y + this.h <= platform.y &&
this.y + this.h + this.ySpeed >= platform.y
) {
this.y = platform.y - this.h;
this.ySpeed = 0;
this.onGround = true;
}
}

display() {
fill(255, 0, 0);
rect(this.x, this.y, this.w, this.h);
}
}

class Platform {
constructor(x, y, w, h) {
this.x = x;
this.y = y;
this.w = w;
this.h = h;
}

display() {
fill(50, 200, 50);
rect(this.x, this.y, this.w, this.h);
}
}