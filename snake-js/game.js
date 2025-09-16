// Create SNAKE clone in pure JS without AI - Only Google allowed
// Time Limit: 3 hours

// create a gird (N * N)

// initialize snake (1 * 5 )

// move: up(), down(), left(), right()
// keeps movin at CURRENT_PTR;

// collision dtection with itself

// Dies if touches boundary of grid

const gridWidth = 50
const gridHeight = 50
const squareWidth = 10

let grid = []
// let CUR_X =

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = gridWidth * squareWidth
canvas.height = gridHeight * squareWidth


function drawCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#f8eaffff"
    ctx.fillRect(0, 0, canvas.height, canvas.width)
}


function initializeSnake() {   
    requestAnimationFrame(initializeSnake) 
        drawCanvas();
        ctx.fillStyle = "#33333dff"
        ctx.fillRect(i, 250, 10, 10)
        i += 1
}

function moveRight() {
    drawCanvas();
    ctx.fillStyle = "#33333dff"
    ctx.fillRect(0, 5, 10, 10)
}

class Move {
    constructor(speed) {
        this.dx = speed
    }

    // moveRight() {
    //     for(int i = )
    // }


}


// main Game Loop;
drawCanvas();
initializeSnake();


setTimeout(() => {
    moveRight();
}, 1000)
