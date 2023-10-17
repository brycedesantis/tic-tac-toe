const gameboard = (function() {
    const board = ['','','','','','','','','']
    
    let htmlBoard = document.querySelector('.gameboard')

    board.forEach((square, index) => {
        let squareElement = document.createElement('div')
        squareElement.className = 'square'
        squareElement.setAttribute('id', `square-${index}`)
        // squareElement.textContent = `${square}`
        htmlBoard.appendChild(squareElement)
    })

    let children = htmlBoard.childNodes

    children.forEach((square, index) => {
        square.addEventListener('click', () => {
            square.textContent = game.activePlayer.symbol
            alert(game.activePlayer.name)
            game.switchPlayer()
            square.style.pointerEvents = 'none'
        })
    })

    return {
        board
    }
})();

const game = (() => {
    let player1 = player('Player 1', 'x')
    let player2 = player('Player 2', 'o')

    let activePlayer = player1
    
    function switchPlayer() {
        this.activePlayer === player1 ? this.activePlayer = player2 : this.activePlayer = player1
    }
    return{
        activePlayer,
        switchPlayer
    }
})();

function player(name, symbol) {
    return {name, symbol}
}