
function Player(playerNum, char) {
    const cells = [];
    const getCells = () => cells;
    const setCell = (cellNum) => {
        cells.push(cellNum);
    }
    return {
        playerNum,
        getCells,
        setCell,
        char
    }
}

const gameBoard = (() => {
    const grid = document.querySelectorAll(".cell");
    const numCells = Array.from(grid);

    let gb = [];
    for (let i = 0; i < 9; i++) {
        gb.push("");
    }
    const getGB = () => gb;
    const setCell = (cellNum, playerNum) => {
        gb[cellNum] = playerNum;
    }
    const setListeners = () => {
        for (let i = 0; i < numCells.length; i++) {
            numCells[i].addEventListener ("click", modifyCell);

            function modifyCell() {
                const cell = document.getElementById(i.toString());
                cell.textContent = game.active.char;
                gb[i] = game.active.char;
                numCells[i].style.pointerEvents = "none";
                game.active.setCell(i);
                game.alertPlayer();
                game.checkWinner();
                game.changePlayer();
            }
        } 
    }

    const removeListeners = () => {
        for (let i = 0; i < numCells.length; i++) {
            numCells[i].style.pointerEvents = "none";
        } 
    }

    return {
        setCell,
        getGB,
        setListeners,
        removeListeners
    }
})();


const game = (() => {
    const text = document.querySelector(".text");
    const playerOne = Player(1, "X");
    const playerTwo = Player(2, "O");
    const winningCells = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ];
    let gameActive = true;
    let active = playerOne;
    gameBoard.setListeners();

    function changePlayer() {
        this.active == playerOne? this.active = playerTwo : this.active = playerOne;
    }

    function alertPlayer() {
        this.active == playerOne ? text.textContent = "Player 2, make your move" : text.textContent = "Player 1, make your move";
    }

    function checkWinner() {
        winningCells.forEach((item) => {
            if (gameBoard.getGB()[item[0]] == this.active.char && gameBoard.getGB()[item[1]] == this.active.char && gameBoard.getGB()[item[2]] == this.active.char) {
                gameBoard.removeListeners();
                text.textContent = "Player " + this.active.playerNum + " wins!";
            }
            
        })

    }

    function endGame() {

    }
    return {
        active,
        changePlayer,
        alertPlayer,
        checkWinner
    }

})();

