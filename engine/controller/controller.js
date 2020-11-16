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
        this.game = game;
        this.view1 = view1; // View for player 1
        this.view2 = view2; // View for player 2
    }

    /**
     * Moves either the Player or Enemy controlled by Player 2 in a given direction
     * @param {boolean} isEnemy false if is Player, true if is Enemy 
     * @param {*} direction "up", "down", "left", or "right"
     */
    move (isEnemy, direction) {
        console.log(`Move ${direction}`);
        let element // To be defined. The Element object being moved
        if (isEnemy) { // if moving the enemy controlled by Player 2
            element = this.game.enemies.filter(function (value, index) {return value.isCPU == false})[0]; // gets enemy controlled by Player 2
        }
        else {
            element = this.game.player;
        }
        this.game.move(element, direction);
        this.notifyViews();
    }

    /**
     * Function that gets called every game tick. Called to execute a single round of gameplay
     */
    playRound () {
        //this.game.moveAI() // Has the enemies controlled by the CPU make their moves
    }

    /**
     * Function called to start the game. Main game loop happens in here
     */


    /**
     * Notifies the Views of the current state of the board
     */
    notifyViews() {
        let gameState = this.game.getGameState();
        let board = gameState.board;
        this.view1.renderBoard(board);
        this.view2.renderBoard(board);
    }
    

    startGame () {
        this.gameClock(this.game, this);
    }

    /**
     * Returns True if the game is over, False if not
     */
    isOver () {
        return this.game.isOver;
    }

    /**
     * Main clock that drives game refresh
     * @param {Game} game instance of the Game class
     * @param {Controller} controller instance of the Controller object 
     */
    gameClock (game, controller) {
        game.moveAI();
        controller.notifyViews();
        if (!game.isOver) { // if the game isn't over yet
            setTimeout(controller.gameClock, 500, game, controller);
        }
    }



}

module.exports = {
    controllerClass: Controller
}
