
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");


const scoreCanvas = document.getElementById("score-canvas")
const ctx_score = scoreCanvas.getContext("2d")
ctx_score.font = '25px Arial';
ctx_score.fillStyle = '#d6045bff';
ctx_score.strokeStyle = 'black'
ctx_score.textAlign = 'center';
ctx_score.textBaseline = 'middle';

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

function renderScore() {
    ctx_score.clearRect(0, 0, scoreCanvas.width, scoreCanvas.height);
    ctx_score.fillText(`SCORE: ${Player.score}`, scoreCanvas.width / 2, scoreCanvas.height / 2);
}

function renderGameOver() {
    ctx.font = '50px Impact';
    ctx.fillStyle = '#b61500ff';
    ctx.strokeStyle = 'black'
    ctx.textBaseline = 'middle'
    ctx.textAlign = 'center';

    ctx.fillText('GAME OVER !', canvasWidth / 2, canvasHeight / 2);
    ctx.font = '25px Impact';
    ctx.fillStyle = '#0a6320ff';
    ctx.fillText('Press "R" to restart', canvasWidth / 2, canvasHeight / 2 + 100);
}


// =========================   PLAYER LOGIC   =========================

class Player {
    static x = PLAYER_START_X;
    static y = PLAYER_START_Y;
    static speed = PLAYER_SPEED;
    static score = 0
    static isAlive = true;

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

    static resetPlayer() {
        this.score = 0;
        this.x = PLAYER_START_X;
        this.y = PLAYER_START_Y;
        this.isAlive = true;
    }
}


// =========================   FALLING BLOCKS   =========================

class Block {
    // Creates a Block with random attributes;
    constructor() {
        this.x = getRandomX();
        this.y = 0;
        this.speed = getRandomSpeed();
    }
}


class FallingBlocks {

    static blocks;

    static initBlocks() {
        this.blocks = []
        for (let i = 1; i <= 5; i++) {
            this.blocks.push( new Block() )
        }
    }

    static updatePosition() {

        for (let i = 0; i < this.blocks.length; i++) {

            let x = this.blocks[i].x;
            let y = this.blocks[i].y;

            ctx.fillStyle = "#4335c5ff";
            ctx.fillRect(x, y, FALLING_OBJECT_WIDTH, FALLING_OBJECT_HEIGHT);

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
    return Math.floor(val * (canvasWidth - FALLING_OBJECT_WIDTH))
}

// Generates random speed b/w 6 to 12
function getRandomSpeed() {
    let val = Math.random();
    return Math.ceil(val * 6) + 5
}

function detectCollision() {

    for (let block of FallingBlocks.blocks) {

        let x_diff = Math.abs(Player.x - block.x)
        let y_diff = Math.abs(Player.y - block.y)

        if (x_diff < PLAYER_WIDTH && y_diff < PLAYER_HEIGHT) {
            Player.isAlive = false;
        }
    }
}

function handleRestart(event) {
    if (event.key === "r" && !Player.isAlive) { // && gameOverHandled == true was suggested as well in IF condition; but really needed ?
        for(let key in PRESSED_KEYS) {
            PRESSED_KEYS[key] = false;
        }

        Player.resetPlayer();
        FallingBlocks.initBlocks();
        gameOverHandled = false;
        gameLoop();
    }

}

// =========================   MAIN GAME LOOP   =========================

let animationId;
let gameOverHandled = false;
function gameLoop() {
    
    if (Player.isAlive) {
        drawCanvas();
        renderScore();

        Player.movePlayer();

        FallingBlocks.updatePosition();

        detectCollision();

        animationId = requestAnimationFrame(gameLoop)
    }
    else {
        cancelAnimationFrame( animationId );
        if (!gameOverHandled) {
            renderGameOver();
            gameOverHandled = true;
        }
    }
}

FallingBlocks.initBlocks();
gameLoop();


// =========================   EVENT LISTNERS   =========================

document.addEventListener('keydown', function (event) {
    const handled = ["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","a","d","w","s"," "].includes(event.key);
    if (handled) event.preventDefault();

    PRESSED_KEYS[event.key] = true;

});


document.addEventListener('keyup', function (event) {

    PRESSED_KEYS[event.key] = false;

});

document.addEventListener('keyup', handleRestart)