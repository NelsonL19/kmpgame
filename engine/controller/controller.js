/**
 * TO DO LIST
 * 1. Implement Match to Create a New Game
 *      1b.Pull current Game State from Server
 * 2. Import current HTML Page using JQuery
 * 3. Modify Game based on User Input
 * 4. Push modified Game State to Server
 * 5. 
 * 
 */

//const socket = io();

/**
 * Controller object
 * @param {Object} game an instance of the Game class to be used as the model
 */
class Controller {
    /**
     * Creates a new instance of the controller object
     * @param {Game} game Instance of the game object 
     * @param {View} view1 View object for Player 1
     * @param {View} view2 View object for Player 2
     */
    constructor (game, view1, view2) {
        this.model = game;
        this.view1 = view1; // View for player 1
        this.view2 = view2; // View for player 2
    }

    /**
     * Function that gets called every game tick. Called to execute a single round of gameplay
     */
    playRound () {
        this.game.moveAI() // Has the enemies controlled by the CPU make their moves
        this.notifyViews();
    }

    /**
     * Function called to start the game. Main game loop happens in here
     */
    startGame () {
        while(!this.game.isOver) { // Loops until either the player is killed or the player collects all the sushi
            setTimeout(this.playRound(), 1000) // game tick is 1 second
        }
    }

    /**
     * Notifies the Views of the current state of the board
     */
    notifyViews() {
        let gameState = game.getGameState();
        let board = gameState.board;
        this.view1.renderBoard(board);
        this.view2.renderBoard(board);
    }
}

