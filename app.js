const gameboard = (() => {
    const board = ['','','','','','','','','']
    
    let htmlBoard = document.querySelector('.gameboard')

    board.forEach((square, index) => {
        let squareElement = document.createElement('div')
        squareElement.className = 'square'
        // squareElement.textContent = `${square}`
        htmlBoard.appendChild(squareElement)
    })

    let children = htmlBoard.childNodes

    children.forEach((square, index) => {
        square.addEventListener('click', () => {
            square.textContent = game.activePlayer.symbol
            board[index] = game.activePlayer.symbol
            square.classList.add(game.activePlayer.symbol)
            square.style.pointerEvents = 'none'
            game.checkWinner()
            game.switchPlayer()
            game.openSpaces -= 1
            if(game.winner === false && game.openSpaces === 0) {
                game.drawGame()
            }
        })
    })

    document.querySelector('button').addEventListener('click', () => {
        game.restartGame()
    })

    return {
        board
    }
})();

const game = (() => {
    let player1 = player('Player 1', 'x')
    let player2 = player('Player 2', 'o')

    let activePlayer = player1
    let openSpaces = 9
    let winner = false
    
    let display = document.querySelector('.display')
    display.textContent = `${activePlayer.name}`

    function switchPlayer() {
        this.activePlayer === player1 ? this.activePlayer = player2 : this.activePlayer = player1
        display.textContent = `${this.activePlayer.name}`
    }

    const winConditions = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]

    let gameOverScreen = document.querySelector('.game-over-screen')
    let gameOverMessage = document.querySelector('#game-over-message')
    let container = document.querySelector('.container')
    
    function checkWinner(){

        winConditions.forEach((condition) => {
            if(gameboard.board[condition[0]] === this.activePlayer.symbol && gameboard.board[condition[1]] === this.activePlayer.symbol && gameboard.board[condition[2]] === this.activePlayer.symbol) {
                gameOverMessage.textContent = `${this.activePlayer.name} Wins!`
                gameOverScreen.style.display = 'flex'
                container.classList.add('blur')
                this.winner = true
            }
        })
    }

    function drawGame(){
        gameOverMessage.textContent = `Game has ended in a draw.`
        gameOverScreen.style.display = 'flex'
        container.classList.add('blur')
        this.winner = false
        this.openSpaces = 0
    }

    function restartGame(){
        let domSquares = document.querySelectorAll('.square')

        gameOverScreen.style.display = 'none'
        container.classList.remove('blur')
        this.openSpaces = 9
        this.winner = false
        this.activePlayer = player1
        display.textContent = `${activePlayer.name}`
        domSquares.forEach((square, index) => {
            square.textContent = ''
            gameboard.board[index] = ''
            square.style.pointerEvents = 'auto'
            square.classList.remove(game.activePlayer.symbol)
        })
    }

    let playGameScreen = document.querySelector('.player-select')
    let startButton = document.querySelector('#play-button')
    startButton.addEventListener('click', () => {
        container.classList.remove('blur')
        playGameScreen.style.display = 'none'
    })

    return{
        activePlayer,
        switchPlayer,
        checkWinner,
        drawGame,
        openSpaces,
        winner,
        restartGame
    }
})();

function player(name, symbol) {
    return {name, symbol}
}