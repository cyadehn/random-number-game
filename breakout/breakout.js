/* Initial Variables ------------------------------------ */

let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext('2d');
let x = canvas.width/2;
let y = canvas.height-30;
let dx = 1;
let dy = -1;
let ballRadius = 10;

/* Default Functions ------------------------------------ */

function drawBall() {
    ctx.beginPath();
    ctx.arc( x, y, ballRadius, 0, Math.PI*2 );
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect( 0, 0, canvas.width, canvas.height )
    drawBall();
    if ( y + dy < 0 + ballRadius || y + dy > canvas.height - ballRadius ) {
        dy = -dy;
    }
    if ( x + dx < 0 + ballRadius || x + dx > canvas.width - ballRadius ) {
        dx = -dx;
    }
    x += dx;
    y += dy;
}

let timerId = setInterval(draw, 8);

let paddleHeight = 10;
let paddleWidth = 75;
let paddleX = ( canvas.width - paddleWidth ) / 2;

function drawPaddle() {
    ctx.beginPath();
    ctx.rect( paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight )
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

/* User-Input Functions ------------------------------ */

var rightPressed = false;
var leftPressed = false;

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyDownHandler, false);

function keyDownHandler(e) {
    if ( e.key == "Right" || e.key == "ArrowRight" ) {
        rightPressed = true;
    }
    if ( e.key == "Left" || e.key == "ArrowLeft" ) {
        leftPressed == true;
    }
}

function keyUpHandler(e) {
    if ( e.key == "Right" || e.key == "ArrowRight" ) {
        rightPressed = false;
    }
    if ( e.key == "Left" || e.key == "ArrowLeft" ) {
        leftPressed = false;
    }
}


