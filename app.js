const gameBoard = document.querySelector("#gameBoard")
const playerDisplay = document.querySelector("#player")
const infoDisplay = document.querySelector("#info-display")
const width = 8
let playerGo = 'white'
playerDisplay.textContent = 'white'

const startPieces = [
    rook, knight, bishop, queen, king, bishop, knight, rook,
    pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,
    rook, knight, bishop, queen, king, bishop, knight, rook
]

function createBoard() {
    // looping through all the pieces in the array created above
    startPieces.forEach((startPiece, i) => {
        const square = document.createElement('div')
        square.classList.add('square')
        square.innerHTML = startPiece
        // this next line makes the chess pieces draggable
        square.firstChild && square.firstChild.setAttribute('draggable', true)
        square.setAttribute('square-id', i)

        // coloring the background of the chess board
        const row = Math.floor((63 - i) / 8) + 1
        if (row % 2 === 0) {
            square.classList.add(i % 2 === 0 ? 'beige' : 'brown')
        }
        else {
            square.classList.add(i % 2 === 0 ? 'brown' : 'beige')
        }

        // now coloring the chess pieces for both sides
        if (i <= 15) {
            square.firstChild.firstChild.classList.add('black')
        }
        if (i >= 48) {
            square.firstChild.firstChild.classList.add('white')
        }

        gameBoard.append(square)
    })
}
createBoard()


const allSquares = document.querySelectorAll('.square')

allSquares.forEach(square => {
    square.addEventListener('dragstart', dragStart)
    square.addEventListener('dragover', dragOver)
    square.addEventListener('drop', dragDrop)

})

let startPositionId, draggedElement

function dragStart(e) {
    startPositionId = e.target.parentNode.getAttribute('square-id')
    draggedElement = e.target
}

function dragOver(e) {
    e.preventDefault()
}

function dragDrop(e) {
    e.stopPropagation()

    const taken = e.target.classList.contains('piece')


    // e.target.parentNode.append(draggedElement)
    // e.target.remove()
    // e.target.append(draggedElement)

    changePlayer()
}

function changePlayer() {
    if (playerGo == "black") {
        revertIds()
        playerGo = "white"
        playerDisplay.textContent = "white"
    }
    else {
        reverseIds()
        playerGo = "black"
        playerDisplay.textContent = "black"
    }
}

function reverseIds() {
    const allSquares = document.querySelectorAll('.square')
    allSquares.forEach((square, i) => square.setAttribute('square-id', ((width * width - 1) - i)))
}

function revertIds() {
    const allSquares = document.querySelectorAll('.square')
    allSquares.forEach((square, i) => square.setAttribute('square-id', i))
}