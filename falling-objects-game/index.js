
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



class FallingBlock {

    constructor(x, y, speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
    }

    initFall() {
        drawCanvas();
        initPlayer(CURR_X, CURR_Y);

        ctx.fillStyle = "#4335c5ff";
        ctx.fillRect(this.x, this.y, 30, 30);
        this.y = this.y + this.speed
        console.log(`x: ${this.x}; y: ${this.y}`)

        if (this.y > canvas.height) {
            return;
        }
        console.log("Falling")

        requestAnimationFrame( () => this.initFall())
    }
}




// Movement on Key press

function movePlayer(direction, speed = 5) {

    drawCanvas();
    if (direction === "left") {
        CURR_X -= speed;
        initPlayer(CURR_X, CURR_Y);
    }
    else if (direction === "right") {
        CURR_X += speed;
        initPlayer(CURR_X, CURR_Y);
    }
    else if (direction === "down") {
        CURR_Y += speed;
        initPlayer(CURR_X, CURR_Y);
    }
    else if (direction === "up") {
        CURR_Y -= speed;
        initPlayer(CURR_X, CURR_Y);
    }
}




// Util functions
function getRandomX() {
    let val = Math.random();
    return Math.floor(val * 270)
}



// =========================   Main Game Init   =========================

drawCanvas();
initPlayer(CURR_X, CURR_Y);
// initFallingBlocks(30);
blockA = new FallingBlock(30, 0, 10)
blockB = new FallingBlock(50, 0, 10)
blockA.initFall();
blockB.initFall()


// let block1 = new fallingBlocks(getRandomX(), 0);

// let block2 = new fallingBlocks(getRandomX(), 0);




// =========================   EVENT LISTNERS   =========================

document.addEventListener('keydown', function (event) {

    switch (event.key) {
        
        case "a":
        case "ArrowLeft":
            movePlayer("left")
            break;

        case "d":
        case "ArrowRight":
            movePlayer("right")
            break;

        case "w":    
        case "ArrowUp":
            movePlayer("up")
            break;

        case "s":
        case "ArrowDown":
            movePlayer("down")
            break;
    }
});