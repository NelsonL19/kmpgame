var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);


// Class used for creating Model objects
export function Game(size) {
    let gameBoard = new Array(size ** 2);
    let playerScore = 0;
    let startPlayerTime = new Date();
    let playerIsAlive = true;
    let moveListeners = new Array();

    this.getGameState = function () {
        return {
            board: gameBoard,
            score: playerScore,
            isAlive: playerIsAlive
        }
    }

    /**
     * Returns element at row r and column c
     * @param {number} r row number
     * @param {number} c column number
     */
    this.get = function (r, c) {
        return gameBoard[size * r + c];
    }

    /**
     * Sets row r, column c in the gameboard to a specified object
     * @param {number} r row number
     * @param {number} c column number
     * @param {Object} object instance of an object being added to gameBoard
     */
    this.set = function (r, c, object) {
        gameBoard[size * r + c] = object;
    }

    /**
     * Returns the row a particular instance of an object is located in
     * @param {Object} object Instance of an object
     */
    this.getRowOf = function (object) {
        return (gameBoard.indexOf(object) - this.getColumnOf(object)) / size;
    }

    /**
     * Returns the column a particular instance of an object is located in
     * @param {Object} object 
     */
    this.getColumnOf = function (object) {
        return gameBoard.indexOf(object) % size;
    }

    /**
     * 
     * @param {Object} object The object that's being moved
     * @param {String} direction String representation of the direction the object is being moved in 
     */
    this.move = function (object, direction) {
        let objectRow = this.getRowOf(object);      // row the object occupies before the move
        let objectCol = this.getColumnOf(object);   // column the object occupies before the move 
        let targetRow;  // row that the object is attempting to move into
        let targetCol;  // column that the object is attempting to move into

        //Switch to distinguish different function calls of actionSelector based on given direction
        //Left is -1 to objectCol, Right is +1 to objectCol, Up is -1 to objectRow, Down is +1 to objectRow
        switch (direction) {
            case 'up':
                targetRow = objectRow - 1;
                targetCol = objectCol;
                break;
            case 'down':
                targetRow = objectRow + 1;
                targetCol = objectCol
                break;
            case 'left':
                targetRow = objectRow;
                targetCol = objectCol - 1;
                break;
            case 'right':
                targetRow = objectRow;
                targetCol = objectCol + 1;
                break;
        }

        let actionSelectorResult = actionSelector(targetRow, targetCol); // the return value (number) of the actionSelector call

        if (actionSelectorResult == 3) {    // if the object is moving into a tile that has an Air object
            this.set(targetRow, targetRow, object); // replace the Air object with the object being moved
            this.set(objectRow, objectCol, new Air); // set the tile the object used to occupy with a new Air object
        }

        notifyMoveListeners();
    }

    /**
    * Determines what Class a given object belongs to 
    * @param {object} object instance of object being checked
    */
    let getClass = function (object) {
        switch (object.constructor.name) {
            case "Player":
                return 0
            case "Enemy":
                return 1;
            case "Sushi":
                return 2;
            case "Wall":
                return 3;
            case "Air":
                return 4;
            default:
                return -1;
        }
    }

    /**
     * Before a move has been performed, determine the correct response in the game's logic
     * Returns -1 if Exception, or values 0-3 depending on the obstacle
     * @param {number} row 
     * @param {number} col 
     */
    let actionSelector = function (object, row, col) {
        let square = this.get(row, col);
        if (square == undefined || col < 0 || row < 0 || col >= size || row >= size) {//Empty Space
            return -1
        }

        let currSquare = getClass(square);

        switch (currSquare) {
            case 0: // Player
                return 0;
            case 1://Enemy
                enemyAhead();
                return 1;
            case 2://Sushi
                if (getClass(object) == 1) { // if the object encountering the sushi is an Enemy
                    return 2;                   // then treat the sushi object as a Wall
                }
                else {                           // else the object encountering the sushi is a Player
                    collectSushi(row, col); // then call collect sushi and treat it as Air
                    return 3;
                }
            case 3://Wall
                return 2;
            case 4: //Air
                return 3;
            default:
                console.log("AN ERROR HAS OCCURED")
                return -1;
        }
    }

/**
 * CollectSushi(), enemyAhead() both take in the Row, Col and update the game engine based on if the KMP runs into an enemy or a sushi
 * 
 * 
 * @param {number} row - The Row of the Object
 * @param {number} col - The Column of the Object
 */

    let collectSushi = function (row, col) {
        //Remove Sushi
        this.set(row, col, new Air);

        //Increase Score
        this.playerScore += 1;

        //Update Player Position

        //Update Callbacks
    }

    let enemyAhead = function (row, col) {
        //Get Total Game Time
        let endPlayerTime = new Date();
        let totalTime = endPlayerTime - startPlayerTime;

        //Set Dead
        playerIsAlive = false;

        //Kickback Callbacks
    }

    /**
     * Registers move listeners with current instance of Game
     * @param {function} callback callback function of listener
     */
    let onMove = function (callback) {
        moveListeners.push(callback);
    }

    /**
     * Notifies all registered move listeners that a move has taken place
     */
    let notifyMoveListeners = function () {
        moveListeners.forEach(callback => {
            callback();
        })
    }
}