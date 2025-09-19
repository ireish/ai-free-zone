
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const canvasHeight = canvas.height
const canvasWidth = canvas.width

let PLAYER_X = 150, PLAYER_Y = 580;
const PLAYER_SPEED = 10

const pressedKeys = {}


function drawCanvas() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)
    ctx.fillStyle = "#c3cdd6";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
}


function initPlayer(PLAYER_X, PLAYER_Y) {
    ctx.fillStyle = "#bb333fff";
    ctx.fillRect(PLAYER_X, PLAYER_Y, 20, 20);
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
        initPlayer(PLAYER_X, PLAYER_Y);

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


// }

function movePlayer() {

    if(pressedKeys["ArrowLeft"] || pressedKeys["a"]) {
        PLAYER_X -= PLAYER_SPEED;
    }
    if(pressedKeys["ArrowRight"] || pressedKeys["d"]) {
        PLAYER_X += PLAYER_SPEED;
    }
    if(pressedKeys["ArrowUp"] || pressedKeys["w"]) {
        PLAYER_Y -= PLAYER_SPEED;
    }
    if(pressedKeys["ArrowDown"] || pressedKeys["s"]) {
        PLAYER_Y += PLAYER_SPEED;
    }

    // stay inside canvas boundary
    PLAYER_X = Math.min( Math.max(1, PLAYER_X), canvasWidth - 21);
    PLAYER_Y = Math.min( Math.max(1, PLAYER_Y), canvasHeight - 21);

    requestAnimationFrame(movePlayer);
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
initPlayer(PLAYER_X, PLAYER_Y);
// initFallingBlocks(30);
let fallingBlocksObj = new FallingBlocks();
fallingBlocksObj.initFall();

movePlayer();




// =========================   EVENT LISTNERS   =========================




document.addEventListener('keydown', function (event) {

    pressedKeys[event.key] = true;

});


document.addEventListener('keyup', function (event) {

    pressedKeys[event.key] = false;

});