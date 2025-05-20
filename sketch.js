function setup() {
    createCanvas(800, 600);
    setupDebugConsole();
}

function draw(){
    quad(500, 250, 550, 200, 700, 300, 650, 350);
    if (gameState == "menu"){
        showMenu();
    } else if (gameState == "game"){
        playGame();
    }
}

function showMenu(){
    background(100, 150, 200);
    textAlign(CENTER, CENTER);
    textSize(50);
    fill(255);
    text("Main Menu", width / 2, height / 3);

    //start game button
    textSize(30);
    rectMode(CENTER);
    fill(50, 200, 100);
    rect(width / 2, height / 2, 200, 60);
    fill(255);
    text("Start Game", width / 2, height / 2);
}