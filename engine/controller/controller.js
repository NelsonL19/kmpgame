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

const { stringify } = require("querystring");

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
        console.log("Constructing new Controller");
        this.game = game;
        this.view1 = view1; // View for player 1
        this.view2 = view2; // View for player 2

        this.game.onWin(function (winner, totalTime, score) {
            let playerIsWinner;
            let enemyIsWinner;
            console.log(score);
            switch(winner) {
                case "enemy": playerIsWinner = true; enemyIsWinner = false;
                case "player": playerIsWinner = false; enemyIsWinner = true;
            }

            view1.gameWon(playerIsWinner, totalTime, score);
            view2.gameWon(enemyIsWinner, totalTime, score);
        });
        console.log("New Controller constructed!");
    };

    /**
     * Moves either the Player or Enemy controlled by Player 2 in a given direction
     * @param {boolean} isEnemy false if is Player, true if is Enemy 
     * @param {*} direction "up", "down", "left", or "right"
     */
    move (isEnemy, direction) {
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
        let score = gameState.score;
        let elapsedTime = new Date() - gameState.startTime;
        let elapsedSeconds = Math.floor(elapsedTime / 1000);
        let elapsedTenthsOfSeconds = Math.floor(elapsedTime / 100);
        let minutes = Math.floor(elapsedSeconds / 60);
        if (minutes.toString().length == 1) {
            minutes = '0' + minutes;
        }
        let seconds = elapsedSeconds % 60;
        if (seconds.toString().length == 1) {
            seconds = '0' + seconds;
        }
        let tenthsOfSeconds = elapsedTenthsOfSeconds - elapsedSeconds*10;

        let time = `${minutes}:${seconds}.${tenthsOfSeconds}`;
        this.view1.renderBoard(board, time, score);
        this.view2.renderBoard(board, time, score);
    }
    

    startGame () {
        this.gameClock(this.game, this, 0);
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
    gameClock (game, controller, totalTicks) {
        if (totalTicks%4 == 0) { // Only call move AI every 4 ticks
            game.moveAI();
        }
        controller.view1.socket.emit('unlock controls');
        controller.view2.socket.emit('unlock controls');


        controller.notifyViews();
        totalTicks++;
        
        if (!game.isOver) { // if the game isn't over yet
            setTimeout(controller.gameClock, 125, game, controller, totalTicks);
        }
    }




}

module.exports = {
    controllerClass: Controller
}
