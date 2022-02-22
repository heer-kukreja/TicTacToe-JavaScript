# TicTacToe-JavaScript

Tic-tac-toe is a paper-and-pencil game for two players, X and O, who take turns marking the spaces in a 3×3 grid.

The player who succeeds in placing three of their marks in a horizontal, vertical, or diagonal row wins the game.

The game allows users to play the basic Tic-Tac-Toe game and displays the status after the end of each game without interruption.

User has an option to play against the computer, where each move by the computer is calculated using Minimax Algorithm.
> Minimax is a backtracting algorithm that considers all possible moves, to get the most optimal one.
> More about Minimax - https://www.geeksforgeeks.org/minimax-algorithm-in-game-theory-set-3-tic-tac-toe-ai-finding-optimal-move/

### The Minimax Algorithm 
Basic assumptions are:
   - Cost of winning for user is -10 (minimizer)
   - cost of winning for computer is +10 (maximizer)
   - cost of a draw for either is 0
 
The Algorithm
   - On function call, it gets all the available spots in the current grid.
   - Then as its a recursive function the base conditions checks for the win condition:
      - If User has won, -10 is returned as the cost of that move.
      - if Computer won, +10 is returned.
      - If there is a draw, 0 is returned
   - Function is called for each available spot and cost for each move is stored in an array with the position of that move.
   - The maximum of all the costs is selected as the optimal move. 
