
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let canvasHeight = canvas.height
let canvasWidth = canvas.width
let CURR_X = 150, CURR_Y = 580;


function drawCanvas() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)
    ctx.fillStyle = "#c3cdd6";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
}


function initPlayer(CURR_X, CURR_Y) {
    ctx.fillStyle = "#bb333fff";
    ctx.fillRect(CURR_X, CURR_Y, 20, 20);
}


class Block {
    constructor() {
        this.x = getRandomX();
        this.y = 0;
        this.speed = getRandomSpeed();
    }
}

class FallingBlocks {

    constructor() {
        this.initBlocks();
    }

    initBlocks() {
        this.blocks = []

        for (let i = 1; i <= 4; i++) {
            let b = new Block()
            this.blocks.push(b)
        }
    }


    initFall() {
        drawCanvas();
        initPlayer(CURR_X, CURR_Y);

        for (let i = 0; i < this.blocks.length; i++) {

            let x = this.blocks[i].x;
            let y = this.blocks[i].y;

            ctx.fillStyle = "#4335c5ff";
            ctx.fillRect(x, y, 30, 30);

            this.blocks[i].y = y + this.blocks[i].speed

            // Block Out-of-bounds
            if (this.blocks[i].y > canvas.height) {
                this.blocks[i].y = 0;
                this.blocks[i].x = getRandomX();
                this.blocks[i].speed = getRandomSpeed();
            }
        }

        requestAnimationFrame(() => this.initFall())
    }
}




// Movement on Key press

// function movePlayer(direction, speed = 10) {

//     drawCanvas();
//     if (direction === "left" && pressedKeys["ArrowL"]) {
//         CURR_X -= speed;
//         initPlayer(CURR_X, CURR_Y);
//     }
//     else if (direction === "right") {
//         CURR_X += speed;
//         initPlayer(CURR_X, CURR_Y);
//     }
//     else if (direction === "down") {
//         CURR_Y += speed;
//         initPlayer(CURR_X, CURR_Y);
//     }
//     else if (direction === "up") {
//         CURR_Y -= speed;
//         initPlayer(CURR_X, CURR_Y);
//     }

//     requestAnimationFrame( () => movePlayer(direction, speed) );
// }

const speed = 10

function moveLeft(key) {
    if(pressedKeys[key] == true) {
        CURR_X -= speed;
        requestAnimationFrame( () => moveLeft(key) )
    }
}

function moveRight(key) {
    if(pressedKeys[key] == true) {
        CURR_X += speed;
        requestAnimationFrame( () => moveRight(key) )
    }
}

function moveUp(key) {
    if(pressedKeys[key] == true) {
        CURR_Y -= speed;
        requestAnimationFrame( () => moveUp(key) )
    }
}

function moveDown(key) {
    if(pressedKeys[key] == true) {
        CURR_Y += speed;
        requestAnimationFrame( () => moveDown(key) )
    }
}




// =========================   UTIL FUNCTIONS   =========================

function getRandomX() {
    let val = Math.random();
    return Math.floor(val * 270)
}

function getRandomSpeed() {
    let val = Math.random();
    return Math.ceil(val * 4) + 4
}



// =========================   MAIN GAME INIT   =========================

drawCanvas();
initPlayer(CURR_X, CURR_Y);
// initFallingBlocks(30);
let fallingBlocksObj = new FallingBlocks();
fallingBlocksObj.initFall();




// =========================   EVENT LISTNERS   =========================


const pressedKeys = {}

document.addEventListener('keydown', function (event) {

    let key = event.key
    pressedKeys[key] = true;

    switch (event.key) {

        case "a":
        case "ArrowLeft":
            moveLeft(key);
            break;

        case "d":
        case "ArrowRight":
            moveRight(key)
            break;

        case "w":
        case "ArrowUp":
            moveUp(key)
            break;

        case "s":
        case "ArrowDown":
            moveDown(key)
            break;
    }
});


document.addEventListener('keyup', function (event) {

    pressedKeys[event.key] = false;

});