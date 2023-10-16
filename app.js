const gameboard = (function() {
    const board = ['','','','','','','','','']
    
    let htmlBoard = document.querySelector('.gameboard')

    board.forEach((square, index) => {
        let squareElement = document.createElement('div')
        squareElement.className = 'square'
        htmlBoard.appendChild(squareElement)
    })

    return {
        board
    }
})();

function player() {
    
}