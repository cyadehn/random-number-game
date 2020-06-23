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
    ctx.clearRect( 0, 0, canvas.width, canvas.height );
    drawBall();
    drawPaddle();
    if ( x + dx < 0 + ballRadius || x + dx > canvas.width - ballRadius ) {
        dx = -dx;
    }
    if ( y + dy < 0 + ballRadius ) {
        dy = -dy;
    } else if ( y + dy > canvas.height - ballRadius ) {
        if ( x > paddleX && x < paddleX + paddleWidth ) {
            dy = -dy;
        } else {
            clearInterval(timerId);
            setTimeout( () => {
                ctx.clearRect( 0, 0, canvas.width, canvas.height );
                ctx.textAlign = "center";
                ctx.fillText( "GAME OVER", canvas.width/2, canvas.height/2);
                setTimeout( () => {
                    ctx.clearRect( 0, 0, canvas.width, canvas.height);
                    document.location.reload();
                }, 3000);}
                , 500 );
        }
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
    if (rightPressed) {
        paddleX += 5;
        if ( paddleX + paddleWidth > canvas.width ) {
            paddleX = canvas.width - paddleWidth;
        }
    } else if (leftPressed) {
        paddleX -= 5;
        if ( paddleX < 0 ) {
            paddleX = 0;
        }
    }
}

/* User-Input Functions ------------------------------ */

var rightPressed = false;
var leftPressed = false;

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

function keyDownHandler(e) {
    if ( e.key == "Right" || e.key == "ArrowRight" ) {
        rightPressed = true;
    } else if ( e.key == "Left" || e.key == "ArrowLeft" ) {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if ( e.key == "Right" || e.key == "ArrowRight" ) {
        rightPressed = false;
    } else if ( e.key == "Left" || e.key == "ArrowLeft" ) {
        leftPressed = false;
    }
}