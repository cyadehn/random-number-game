document.addEventListener('DOMContentLoaded', () => {

    const grid = document.querySelector('.grid');
    let squares = Array.from(document.querySelectorAll('.grid div'));
    const ScoreDisplay = document.querySelector('#score');
    const StartBtn = document.querySelector('#start-button');
    const width = 10;
    let nextRandom;
    let timerId;

    //Tetrominoes
    const lTetromino = [
        [1, width+1, width*2+1, 2],
        [width, width+1, width+2, width*2+2],
        [1, width+1, width*2, width*2+1],
        [width, width*2, width*2+1, width*2+2]
    ];
    const zTetromino = [
        [0, width, width+1, width*2+1],
        [width*2, width+1, width*2+1, width+2],
        [0, width, width+1, width*2+1],
        [width*2, width+1, width*2+1, width+2]
    ];
    const tTetromino = [
        [width, 1, width+1, width+2],
        [1, width+1, width*2+1, width+2],
        [width, width+1, width*2+1, width+2],
        [width, 1, width+1, width*2+1]
    ];
    const oTetromino = [
        [0, 1, width, width+1],
        [0, 1, width, width+1],
        [0, 1, width, width+1],
        [0, 1, width, width+1]
    ];
    const iTetromino = [
        [1, width+1, width*2+1, width*3+1],
        [width, width+1, width+2, width+3],
        [1, width+1, width*2+1, width*3+1],
        [width, width+1, width+2, width+3]
    ];

    const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino];

    let currentPosition = 4;
    let currentRotation = 0;

    //random tetromino and first rotation selection
    let random = Math.floor(Math.random() * theTetrominoes.length);
    let current = theTetrominoes[random][currentRotation];


    //Draw tetrominoes on div grid
    function draw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.add('tetromino')
        })
    }

    //undraw tetromino
    function undraw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.remove('tetromino');
        })
    }

    //freeze function
    function freeze() {
        if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
            current.forEach(index => squares[currentPosition + index].classList.add('taken'));
            //start a new tetromino
            random = nextRandom;
            nextRandom = Math.floor(Math.random() * theTetrominoes.length);
            currentRotation = 0;
            current = theTetrominoes[random][currentRotation];
            currentPosition = 4;
            draw();
            displayShape();
        }
    }
    
    //moveDown function
    function moveDown() {
        undraw();
        currentPosition += width;
        draw();
        freeze();
    }

    //show up-next tetromino in mini-grid
    const displaySquares = document.querySelectorAll('.mini-grid div');
    const displayWidth = 4;
    let displayIndex = 0;

    const upNextTetrominoes = [
        [1, displayWidth+1, displayWidth*2+1, 2], //lTetromino
        [0, displayWidth, displayWidth+1, displayWidth*2+1], //zTetromino 
        [displayWidth, 1, displayWidth+1, displayWidth+2], //tTetromino
        [0, 1, displayWidth, displayWidth+1], //oTetromino
        [1, displayWidth+1, displayWidth*2+1, displayWidth*3+1] //iTetromino
    ]

    function displayShape() {
        displaySquares.forEach( square => {square.classList.remove('tetromino')});
        upNextTetrominoes[nextRandom].forEach( index => {
            displaySquares[displayIndex + index].classList.add('tetromino');
        })
    }

    //move the tetromino left, unless at the edge or blocked
    function moveLeft() {
        undraw();
        const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0);
        if(!isAtLeftEdge) currentPosition -= 1;
        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            currentPosition += 1;
        }
        draw();
    }

    //move the tetromino right, unless at the edge or blocked
    function moveRight() {
        undraw();
        const isAtRightEdge = current.some( index => ( currentPosition + index ) % width === width - 1 );
        if ( !isAtRightEdge ) currentPosition += 1;
        if ( current.some( index => squares[currentPosition + index].classList.contains('taken'))) {
            currentPosition -= 1;
        }
        draw();
    }

    //rotate tetromino
    function rotate() {
        undraw();
        currentRotation ++;
        if(currentRotation === current.length ) { //if rotation gets to 4, reset to 0
            currentRotation = 0;
        }
        current = theTetrominoes[random][currentRotation];
        if ( current.some( index => ( currentPosition + index ) % width === width -1 )) {
            do {
                currentPosition -= 1;
            } while ( current.some( index => ( currentPosition + index ) % width === width - 1))
        }
        if ( current.some( index => (currentPosition + index) % width === 0 ) ) {
            do {
                currentPosition += 1;
            } while ( current.some( index => (currentPosition + index) % width === 0 ) )
        }
        draw();
    }

    //assign keyCode functions
    document.addEventListener('keyup', control);
    function control(e) {
        if ( e.keyCode === 37 ) {
            moveLeft();
        };
        if ( e.keyCode === 38 ) {
            rotate();
        };
        if ( e.keyCode === 39 ) {
            moveRight();
        };
        if ( e.keyCode === 40 ) {
            moveDown();
        }
    }

    //add start button functionality
    StartBtn.addEventListener('click', () => {
        if (timerId) {
            clearInterval(timerId);
            timerId = null;
        } else {
            draw();
            timerId = setInterval(moveDown, 500); //make tetrominoes move down every .5 second
            nextRandom = Math.floor(Math.random() * theTetrominoes.length);
            displayShape();
        }
    });
})