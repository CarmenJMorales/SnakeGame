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

const drawSnake = () =>
{
    snake.forEach(square => drawSquare(square, 'snakeSquare'));
}

const drawSquare = (square, type) => 
{
    const [row, column] = square.split('');
    boardSquares[row][column] = squareTypes[type];
    const squareElement = document.getElementById(square);
    squareElement.setAttribute('class', `square ${type}`);

    if(type === 'emptySquare') 
    {
        emptySquares.push(square);
    } 
    else if(emptySquares.indexOf(square) !== -1)
    {
        emptySquares.splice(emptySquares.indexOf(square), 1);
    }

}

const createBoard = () => 
{
    boardSquares.forEach((row, rowIndex) => 
    {
        row.forEach( (column, columnIndex) => 
        {
            const squareValue = `${rowIndex}${columnIndex}`;
            const squareElement = document.createElement('div');
            squareElement.setAttribute('class', 'square emptySquare');
            squareElement.setAttribute('id', squareValue);
            board.appendChild(squareElement);
            emptySquares.push(squareValue);
        })
    })
}

const setGame = () => 
{
    snake = ['00']; //Serpiente inicial
    score = snake.length;
    direction = 'arrowRight';
    boardSquares = Array.from(Array(boardSize), () => new Array(boardSize).fill(squareTypes.emptySquare));
    console.log(boardSquares);
    board.innerHTML = '';
    emptySquares = [];
    createBoard();
}

const updateScore = () =>
{
    scoreBoard.innerText = score;
}

const createRandomFood = () =>
{
    const randomEmptySquare = emptySquares[Math.floor(Math.random() * emptySquares.length)];
    drawSquare(randomEmptySquare, 'foodSquare');
}

const directionEvent = () =>
{
    switch(Key.code)
    {
        case 'arrowUp':
            direction != 'arrowDown' && setDirection(key.code)
            break;
        
        case 'arrowDown':
            direction != 'arrowUp' && setDirection(key.code);
            break;

        case 'arrowRight':
            direction != 'arrowLeft' && setDirection(key.code);
            break;

        case 'arrowLeft':
            direction != 'arrowRight' && setDirection(key.code);
            break;
    }
}

const startGame = () =>
{
    setGame();
    gameOverSign.style.display = 'none';
    startButton.disabled = true;
    drawSnake();
    updateScore();
    createRandomFood();
    document.addEventListener('keyDown', directionEvent);
}

startButton.addEventListener('click', startGame);