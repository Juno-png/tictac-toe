// player factory 

let createPlayer = () => {

    // loop through two times to capture the players first name, and auto assign player name/number
    for (let i = 0; i < 4; i++) {

        if (gameBoard.playerArray.length >= 6) {
            gameBoard.makePlayerMove();
            break;

        } else if (gameBoard.playerArray.length == 0) {
            let playerName = prompt('What is your name player 1?');

            if (playerName == '' || playerName == null) {
                alert('Sorry, name cannot be blank!');
                continue;
            }
            let playerNumber = '1';
            let playerSymbol = 'X';
            alert(`${playerName} is player 1, and is assigned symbol X!`);
            gameBoard.playerArray.push(playerName, playerNumber, playerSymbol);
            console.log('Show me the contents of playerArray', gameBoard.playerArray);
            // return {playerName, playerSymbol};

        } else if (gameBoard.playerArray.length !== 0) {
            let playerName = prompt('What is your name player 2?');

            if (playerName == '' || playerName == null) {
                alert('Sorry, name cannot be blank!');
                continue;
            }
            let playerNumber = '2'
            let playerSymbol = 'O';
            alert(`${playerName} is player 2, and is assigned symbol O!`);
            gameBoard.playerArray.push(playerName, playerNumber, playerSymbol);
            console.log('Show me the contents of the playerArray', gameBoard.playerArray);
            // return {playerName, playerSymbol}
        }
    }
}

// gameBoard module

let gameBoard = (function () {
    let board = [];
    let playerArray = [];

    // expose function publicly to envoke next player move
    let makePlayerMove = () => {

        // check for two player submission and gameBoard array doesn't spill over gridboxes
        if (playerArray.length == 6 && board.length < 9) {

            // controls for player moves
            if (board.length == 0) {
                alert('player 1, please make your move');
                board.push(playerArray[2]);
                console.log('current gameBoard array', board);

            } else if (board[board.length - 1] == 'X') {
                alert('player 2, please make your move');
                board.push(playerArray[5]);
                console.log('current gameBoard array', board);

            } else if (board[board.length - 1] == 'O') {
                alert('player 1, please make your move');
                board.push(playerArray[2]);
                console.log('current gameBoard array', board);
            }
        };
    }
    return { board, playerArray, makePlayerMove };
})();

// Setting up displayController module to control who's turn it is

let displayController = (function () {
    const makeMove = document.querySelectorAll('.game-board-button');

    // start indexing and looping through each button node
    let index = 0;
    makeMove.forEach(makeMoves => {
        makeMoves.dataset.linkedButton = index;
        makeMoves.addEventListener('click', renderArray);

        function renderArray() {
            const gridBoxes = document.querySelectorAll('.grid-box');

            // start indexing and looping through each grid box node
            let index = 0;
            gridBoxes.forEach(gridBox => {
                gridBox.dataset.linkedButton = index;

                // render clicked play on the correct grid box and display
                if (gridBox.getAttribute('data-linked-button') == makeMoves.getAttribute('data-linked-button')) {
                    gridBox.textContent = gameBoard.board[gameBoard.board.length - 1];
                    console.log('show me makeMoves', makeMoves.dataset.linkedButton)
                    console.log('show me my gridBox', gridBox.dataset.linkedButton);
                }
                index++;
            })

            // Run local function to check for win/disable gameboard
            function checkWin(player) {
                const vertical = [0, 3, 6].map(i => { return [i, i + 1, i + 2] });
                const horizontal = [0, 1, 2].map(i => { return [i, i + 3, i + 6] });
                const diagonal = [[0, 4, 8], [2, 4, 6]];

                let allWins = [].concat(horizontal).concat(vertical).concat(diagonal);

                let results = allWins.some(indices => {
                    return gridBoxes[indices[0]].textContent == player && gridBoxes[indices[1]].textContent == player && gridBoxes[indices[2]].textContent == player
                })
                return results;
            }

            if (checkWin('X') == true) {
                console.log(gameBoard.playerArray[0], ' Wins!');
                const body = document.querySelector('body');
                const playerWinMessage = document.createElement('h1');
                playerWinMessage.textContent = (gameBoard.playerArray[0] + ' Wins!');
                body.appendChild(playerWinMessage);
                makeMove.forEach(makeMoves => {
                    makeMoves.remove();
                });
                startGameButton.remove();
                return;

            } else if (checkWin('O') == true) {
                console.log(gameBoard.playerArray[3], ' Wins!');
                const body = document.querySelector('body');
                const playerWinMessage = document.createElement('h1');
                playerWinMessage.textContent = (gameBoard.playerArray[3] + ' Wins!');
                body.appendChild(playerWinMessage);
                makeMove.forEach(makeMoves => {
                    makeMoves.remove();
                });
                startGameButton.remove();
                return;

            } else if (gameBoard.board.length == 9) {
                console.log('tie');
                const body = document.querySelector('body');
                const playerWinMessage = document.createElement('h1');
                playerWinMessage.textContent = ('TIE!');
                body.appendChild(playerWinMessage);
                makeMove.forEach(makeMoves => {
                    makeMoves.remove();
                });
                startGameButton.remove();
                return;
                
            }
            
            gameBoard.makePlayerMove();
        }
        index++;
    })

    // listen for click to start the game
    const startGameButton = document.querySelector('.start-game-button');
    startGameButton.addEventListener('click', createPlayer);

    // listen for click to restart the game
    const resetButton = document.querySelector('.reset-button');
    resetButton.addEventListener('click', resetBoard);

    function resetBoard() {
        location.reload();
    }
})();