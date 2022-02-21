window.addEventListener('DOMContentLoaded', () => {

    //Current player 
    // O : Player O
    // X : Player X
    let activePlayer, computer, huPlayer;

    // Current game state
    // "" : initial state
    //  O : Player O
    //  X : Player X
    let state = Array.from(Array(9).keys());

    // Current game session
    let gameStatusActive = false;

    const winCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [6, 4, 2]
    ];

    setMessage("SELECTOP");

    //Initializations
    function handleTwoPlayer() {
        handleGameReset();
        setMessage("STATUSMSG");
        document.getElementById("dual").style.backgroundColor = "green";
        gameStatusActive = true;
    }

    function handleSinglePlayer() {
        handleGameReset();
        setMessage("SELECTOP");
        document.getElementById("choice").style.display = 'block';
        document.getElementById("single").style.backgroundColor = "green";
    } 

    function selectHuPlayer(choiceSelected) {
        
        activePlayer = (choiceSelected.target).getAttribute("id");
        computer = (activePlayer === "O") ? "X" : "O";
        document.getElementById("choice").style.display = 'none';
        gameStatusActive = true;    
    } 


    //Moves played
    function handleTileClick(tileClicked) {
        let position = parseInt((tileClicked.target).getAttribute("index"));

        if(gameStatusActive && isValidPosition(position)) {
            
            (tileClicked.target).innerText = activePlayer;
            state[position] = activePlayer;
            gameOver()? gameStatusActive = false : playerSwitch();
        } else if (!gameStatusActive) {
            setMessage("SELECTOP");
        }
    }

    function handleComputerAction() {
        huPlayer =  activePlayer;
        let idx = bestSpot(state, computer, winCombinations);
        state[idx] = computer;
        document.querySelector('[index="' + idx + '"]').innerText = computer;
        activePlayer = computer;
        if (gameOver()) 
            gameStatusActive = false
    }

    //Computer selects the best position to win according to the current game board
    function bestSpot(state, computer) {
        huPlayer = activePlayer;
        origBoard = JSON.parse(JSON.stringify(state));
        return minimax(origBoard, computer).index;
    }

    //Minimax algorithm to get the best position
    function minimax(newBoard, player) {
        var availSpots = emptySquares(newBoard);
    
        if (checkWin(newBoard, huPlayer)) {
            return {score: -10};
        } else if (checkWin(newBoard, computer)) {
            return {score: 10};
        } else if (availSpots.length === 0) {
            return {score: 0};
        }
        var moves = [];
        for (var i = 0; i < availSpots.length; i++) {
            var move = {};
            move.index = newBoard[availSpots[i]];
            newBoard[availSpots[i]] = player;
    
            if (player == computer) {
                var result = minimax(newBoard, huPlayer);
                move.score = result.score;
            } else {
                var result = minimax(newBoard, computer);
                move.score = result.score;
            }
    
            newBoard[availSpots[i]] = move.index;
    
            moves.push(move);
        }
    
        var bestMove;
        if(player === computer) {
            var bestScore = -10000;
            for(var i = 0; i < moves.length; i++) {
                if (moves[i].score > bestScore) {
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        } else {
            var bestScore = 10000;
            for(var i = 0; i < moves.length; i++) {
                if (moves[i].score < bestScore) {
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        }
    
        return moves[bestMove];
    }
    
    //Checking game conditions on each move
    //Win
    function checkWin(board, player) {
        let plays = board.reduce((a, e, i) =>
            (e === player) ? a.concat(i) : a, []);
        let gameWon = null;
        for (let [index, win] of winCombinations.entries()) {
            if (win.every(elem => plays.indexOf(elem) > -1)) {
                gameWon = {index: index, player: player};
                break;
            }
        }
        return gameWon;
    }

    //Tie
    function emptySquares(origBoard) {
        return origBoard.filter(s => typeof s == 'number');
    }  

    function checkDraw(state){
        allTilesFilled = emptySquares(state).length;

        if(allTilesFilled === 0 && gameStatusActive){
            gameStatusActive = false;
            setMessage("DRAWMSG")
            return true;
        }

        return false;
    }

    //Change Player
    function playerSwitch(){
        if(activePlayer !== computer && computer!== null) {
            handleComputerAction();
        } 
        if(gameStatusActive) {
            activePlayer = (activePlayer === "O") ? "X" : "O";
            setMessage("STATUSMSG");
        } 
    }

    //Validation of player moves
    function isValidPosition(position) {
        if(typeof state[position] !== 'number') {
            setMessage("WARNMSG");
            return false;
        }
        return true;
    }

    //Set status messages for the game
    function setMessage(messageType) {
        let message = "";
        switch(messageType) {
            case "STATUSMSG":
                message = computer? "Your Turn" : "Player " + activePlayer + "'s Turn!"
                break;
            case "WINNERMSG":
                message = computer? (activePlayer === computer ? "Computer Wins" : "You Won!!") : "Player " + activePlayer + " Won!"
                break;
            case "DRAWMSG":
                message = `It's a draw!`
                break;
            case "WARNMSG":
                message = 'The tile is already filled. Try another tile.'
                break;
            case "SELECTOP":
                message = 'Please Select an option';
                break;
            default:
                message = messageType            
        }

        document.getElementById("status").innerHTML = message;

        return (messageType === "WINNERMSG")  || ( messageType === "DRAWMSG")
    }

    //Terminating the game 
    function gameOver() {
        return checkWin(state, activePlayer) ? setMessage("WINNERMSG") : (checkDraw(state) ? setMessage("DRAWMSG") : false ); 
    }  

    //Reset for new game
    function handleGameReset() {
        if(!gameStatusActive) {
            document.getElementById("choice").style.display = 'none';
        }
        state = Array.from(Array(9).keys());
        activePlayer = "O";
        computer = null;
        setMessage("SELECTOP");
        gameStatusActive = false;
        document.getElementById("single").style.backgroundColor = "#ebe9e9";
        document.getElementById("dual").style.backgroundColor = "#ebe9e9";
        document.querySelectorAll('.tiles').forEach(tile => tile.innerHTML = "");

    }


    document.querySelectorAll('.tiles').forEach(tile => tile.addEventListener('click', handleTileClick ));  
    document.querySelector('#reset').addEventListener('click', handleGameReset);
    document.querySelector('#single').addEventListener('click', handleSinglePlayer);
    document.querySelector('#dual').addEventListener('click', handleTwoPlayer);
    document.querySelector('#X').addEventListener('click', selectHuPlayer);
    document.querySelector('#O').addEventListener('click', selectHuPlayer);

});