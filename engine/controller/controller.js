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

const socket = io();


/**
 * Controller object
 * @param {Object} game an instance of the Game class to be used as the model
 */
export function Controller (game, view1, view2) {
    this.model = game;
    this.view1 = view1; // View for player 1
    this.view2 = view2; // View for player 2

    game.onMove(function () {
        this.updateViews();
    });

    this.updateViews = function () {
        let gameState = game.getGameState();

    }


    
    
}

