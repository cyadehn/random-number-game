document.addEventListener('DOMContentLoaded', () => {

    const grid = document.querySelector('.grid');
    let squares = Array.from(document.querySelectorAll('.grid div'));
    const ScoreDisplay = document.querySelector('#score');
    const StartBtn = document.querySelector('#start-button');
    const width = 10;

    //Tetrominoes
    const lTetromino = [
        [1, width+1, width*2+1, 2],
        [width, width+1, width+2, width*2+2],
        [1, width+1, width*2+1, width*2],
        [1, width+1, width+2, width+3]
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
            random = Math.floor(Math.random() * theTetrominoes.length);
            current = theTetrominoes[random][currentRotation];
            currentPosition = 4;
            draw();
        }
    }
    
    //moveDown function
    function moveDown() {
        undraw();
        currentPosition += width;
        draw();
        freeze();
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
        if ( current.some( index => (currentPosition + index) % width === 0 ) ) {
            do {
                currentPosition += 1;
            } while ( current.some( index => (currentPosition + index) % width === 0 ) )
        }
        if ( current.some( index => ( currentPosition + index ) % width === width -1 )) {
            do {
                currentPosition -= 1;
            } while ( current.some( index => ( currentPosition + index ) % width === width - 1))
        }
        draw();
    }

    //make tetrominoes move down every second
    timerId = setInterval(moveDown, 500);

    //assign functions to keyCodes
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

    document.addEventListener('keyup', control);
})