window.addEventListener('DOMContentLoaded', () => {

    //Current player 
    // O : Player O
    // X : Player X
    let activePlayer = "O";

    // Current game state
    // "" : initial state
    //  O : Player O
    //  X : Player X
    let state = ["", "", "", "", "", "", "", "", ""];

    // Current game session
    let gameStatusActive = true;

    //
    const winCombinations = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ];

    setMessage("STATUSMSG");

    function handleTileClick(tileClicked) {
        let position = parseInt((tileClicked.target).getAttribute("index"));

        if(gameStatusActive && isValidPosition(position)) {
            
            (tileClicked.target).innerText = activePlayer;
            state[position] = activePlayer;

            checkForWinner(state) ? setMessage("WINNERMSG"): 
                ( checkForDraw(state) ? setMessage("DRAWMSG") : playerSwitch()); 

        }
    }

    function playerSwitch(){
        activePlayer = (activePlayer === "O") ? "X" : "O";
        setMessage("STATUSMSG");
    }

    function isValidPosition(position) {
        if(state[position] !== "") {
            setMessage("WARNMSG");
            return false;
        }
        return true;
    }

    function setMessage(messageType) {
        switch(messageType) {
            case "STATUSMSG":
                message = 'Player ' + activePlayer + '\'s turn'
                break;
            case "WINNERMSG":
                message = 'Congratulations! Player ' + activePlayer + ' has won!'
                break;
            case "DRAWMSG":
                message = `It's a draw!`
                break;
            case "WARNMSG":
                message = `The tile is already filled. Try another tile.`
                break;            
        }

        document.getElementById("status").innerHTML = message;
    }

    function checkForWinner(state){
        winCombinations.forEach((combo) => {
            if((state[combo[0]] === state[combo[1]] && state[combo[1]] === state[combo[2]]) && (state[combo[0]] !== "")){
                gameStatusActive = false;
            }
        }); 
        return !gameStatusActive;
    }

    function checkForDraw(state){
        allTilesFilled = !state.includes("");

        if(allTilesFilled && gameStatusActive){
            gameStatusActive = false;
            return true;
        }

        return false;
    }

    function handleGameReset() {
        state = ["", "", "", "", "", "", "", "", ""];
        activePlayer = "O";
        gameStatusActive = true;
        setMessage("STATUSMSG");
        document.querySelectorAll('.tiles').forEach(tile => tile.innerHTML = "");

    }

    document.querySelectorAll('.tiles').forEach(tile => tile.addEventListener('click', handleTileClick ));
    document.querySelector('#reset').addEventListener('click', handleGameReset);

});