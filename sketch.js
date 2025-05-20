let player;
let gravity = 0.5;
let jumpForce = -10;
let platforms = [];
let collectibles = [];
let score = 0;

function setup() {
createCanvas(800, 400);
player = new Player();

// Platforms
platforms.push(new Platform(100, 300, 200, 20));
platforms.push(new Platform(400, 250, 150, 20));
platforms.push(new Platform(600, 350, 100, 20));

// Collectibles
collectibles.push(new Collectible(150, 270));
collectibles.push(new Collectible(450, 220));
collectibles.push(new Collectible(650, 320));
}

function draw() {
background(135, 206, 235);
fill(0);
textSize(18);
text("Score: " + score, 10, 25);

player.update();
player.display();

for (let plat of platforms) {
plat.display();
player.checkPlatform(plat);
}

for (let i = collectibles.length - 1; i >= 0; i--) {
collectibles[i].display();
if (player.collect(collectibles[i])) {
collectibles.splice(i, 1);
score++;
}
}
}

function keyPressed() {
if (key === ' ' || keyCode === UP_ARROW) {
player.jump();
}
}

// Player class
class Player {
constructor() {
this.x = 100;
this.y = 100;
this.w = 40;
this.h = 40;
this.xSpeed = 0;
this.ySpeed = 0;
this.jumpCount = 0;
}

update() {
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
this.jumpCount = 0;
}
}

jump() {
if (this.jumpCount < 2) {
this.ySpeed = jumpForce;
this.jumpCount++;
}
}

checkPlatform(platform) {
let onPlatform =
this.x + this.w > platform.x &&
this.x < platform.x + platform.w &&
this.y + this.h <= platform.y &&
this.y + this.h + this.ySpeed >= platform.y;

if (onPlatform) {
this.y = platform.y - this.h;
this.ySpeed = 0;
this.jumpCount = 0;
}
}

collect(c) {
return (
this.x < c.x + c.size &&
this.x + this.w > c.x &&
this.y < c.y + c.size &&
this.y + this.h > c.y
);
}

display() {
fill(255, 0, 0);
rect(this.x, this.y, this.w, this.h);
}
}

// Platform class
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

// Collectible class
class Collectible {
constructor(x, y) {
this.x = x;
this.y = y;
this.size = 15;
}

display() {
fill(255, 215, 0); // Gold color
ellipse(this.x + this.size / 2, this.y + this.size / 2, this.size);
}
}