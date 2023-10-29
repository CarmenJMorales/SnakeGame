// HTML Elements
const board = document.getElementById('board');
const scoreBoard = document.getElementById('scoreBoard');
const startButton = document.getElementById('start');
const gameOverSign = document.getElementById('gameOver');

// Game Settings
const boardSize = 10;
const gameSpeed = 100;
const squareTypes = 
    {
        emptySquare: 0,
        snakeSquare: 1,
        foodSquare: 2
    };

const directions =
    {
        arrowUp: -10,
        arrowDown: 10,
        arrowRight: 1,
        arrowLeft: -1,
    };

//Game Variables
let snake; //Array para la serpiente
let score;
let direction;
let boardSquares; 
let emptySquares; 
let moveInterval;

const startGame = () =>
{
    setGame();
}

const setGame = () => 
{
    snake = ['00', '01', '02', '03'];
    score = snake.length;
    direction = 'ArrowRight';
    boardSquares = Array.from(Array(boardSize), () => new Array(boardSize).fill(squareTypes.emptySquare));
    console.log(boardSquares);
    board.innerHTML = '';
    emptySquares = [];
    createBoard();
}

const createBoard = () =>
{
    boardSquares.forEach( (row, rowIndex) => 
    {
        row.forEach( (column, columnIndex) => 
        {
            const squareValue = '${rowIndex}${columnIndex}';
            const squareElement = document.createElement('div');
            squareElement.setAttribute('class', 'square emptySquare');
            squareElement.setAttribute('id', squareValue);
            board.appendChild(squareElement);
            emptySquares.push(squareValue);
        })
    })
}

startButton.addEventListener('click', startGame);