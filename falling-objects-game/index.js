
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const canvasHeight = canvas.height
const canvasWidth = canvas.width

const PLAYER_WIDTH = 25;
const PLAYER_HEIGHT = 25;
const PLAYER_SPEED = 8;

const PLAYER_START_X = (canvasWidth / 2) - (PLAYER_WIDTH / 2);
const PLAYER_START_Y = canvasHeight - PLAYER_HEIGHT;

const FALLING_OBJECT_HEIGHT = 35;
const FALLING_OBJECT_WIDTH = 35;

const PRESSED_KEYS = {}


function drawCanvas() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.fillStyle = "#c3cdd6";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
}


// =========================   PLAYER LOGIC   =========================

class Player {
    static x = PLAYER_START_X;
    static y = PLAYER_START_Y;
    static speed = PLAYER_SPEED;
    static score = 0 

    static incrementScore() {
        this.score += 1;
    }

    static movePlayer() {
        if (PRESSED_KEYS["ArrowLeft"] || PRESSED_KEYS["a"]) {
            this.x -= this.speed;
        }
        if (PRESSED_KEYS["ArrowRight"] || PRESSED_KEYS["d"]) {
            this.x += this.speed;
        }
        if (PRESSED_KEYS["ArrowUp"] || PRESSED_KEYS["w"]) {
            this.y -= this.speed;
        }
        if (PRESSED_KEYS["ArrowDown"] || PRESSED_KEYS["s"]) {
            this.y += this.speed;
        }

        // stay inside canvas boundary
        this.x = Math.min(Math.max(0, this.x), canvasWidth - PLAYER_WIDTH);
        this.y = Math.min(Math.max(0, this.y), canvasHeight - PLAYER_HEIGHT);

        // update position
        ctx.fillStyle = "#bb333fff";
        ctx.fillRect(this.x, this.y, PLAYER_WIDTH, PLAYER_HEIGHT);
    }
}


// =========================   FALLING BLOCKS   =========================

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

        for (let i = 1; i <= 5; i++) {
            let b = new Block()
            this.blocks.push(b)
        }
    }

    updatePosition() {

        for (let i = 0; i < this.blocks.length; i++) {

            let x = this.blocks[i].x;
            let y = this.blocks[i].y;

            ctx.fillStyle = "#4335c5ff";
            ctx.fillRect(x, y, FALLING_OBJECT_HEIGHT, FALLING_OBJECT_WIDTH);

            this.blocks[i].y = y + this.blocks[i].speed

            // Block Out-of-bounds
            if (this.blocks[i].y > canvas.height) {
                this.blocks[i].y = 0;
                this.blocks[i].x = getRandomX();
                this.blocks[i].speed = getRandomSpeed();

                Player.incrementScore(); // increment score when each blocks passes by
            }
        }
    }
}


// =========================   UTIL FUNCTIONS   =========================

function getRandomX() {
    let val = Math.random();
    return Math.floor(val * (canvasWidth - PLAYER_WIDTH))
}

// Generates random speed b/w 6 to 12
function getRandomSpeed() {
    let val = Math.random();
    return Math.ceil(val * 6) + 5
}

function detectCollision(fallingBlocksObj) {

    for(let block of fallingBlocksObj.blocks) {

        let x_diff = Math.abs(Player.x - block.x)
        let y_diff = Math.abs(Player.y - block.y)

        if (x_diff < PLAYER_WIDTH && y_diff < PLAYER_HEIGHT) {
            console.log("COLLISION!")
        }
    }
}


// =========================   MAIN GAME LOOP   =========================

function gameLoop() {

    drawCanvas();

    Player.movePlayer();

    fallingBlocks.updatePosition();

    detectCollision(fallingBlocks);

    requestAnimationFrame(gameLoop)

}

// const player = new Player(PLAYER_START_X, PLAYER_START_Y, PLAYER_SPEED);
const fallingBlocks = new FallingBlocks();

gameLoop();


// =========================   EVENT LISTNERS   =========================

document.addEventListener('keydown', function (event) {
    event.preventDefault();
    PRESSED_KEYS[event.key] = true;

});


document.addEventListener('keyup', function (event) {
    
    PRESSED_KEYS[event.key] = false;

});