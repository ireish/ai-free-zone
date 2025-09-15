// Create SNAKE clone in pure JS without AI - Only Google allowed
// Time Limit: 3 hours

// create a gird (N * N)

// initialize snake (1 * 5 )

// move: up(), down(), left(), right()
// keeps movin at CURRENT_PTR;

// collision dtection with itself

// Dies if touches boundary


const gridHeight = 50
const gridWidth = 50
const squareWidth = 10

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.height = gridHeight * squareWidth
canvas.width = gridWidth * squareWidth

ctx.fillStyle = "#e3cceb"
ctx.fillRect(0, 0, canvas.height, canvas.width)




function initializeSnake() {
    
}



// main Game Loop;

initializeSnake();
