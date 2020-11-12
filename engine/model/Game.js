import {Element} from "./elements/Element";
import {Air} from "./elements/Air";
import {Enemy} from "./elements/Enemy";
import {Player} from "./elements/Player";
import {Sushi} from "./elements/Sushi";
import {Wall} from "./elements/Wall";
import {board0, board1} from "./Boards";

// Class used for creating Model objects
export class Game {
    
    /**
     * Creates a new instance of the Game object
     * @param {number} size The size of the gameboard. For example, a 15x15 board has size 15
     */
    constructor (size) {
        this.gameBoard = new Array(size ** 2);
        this.playerScore = 0;
        this.startPlayerTime = new Date();
        this.playerIsAlive = true;
        this.moveListeners = new Array();
    }

    /**
     * Takes a string representation of a given board and converts it to the object representation using the subclasses of Element
     * @param {Array} board 
     * @returns {Array} Array containing the object representation of the board
     */
    convertFromStringToObjectRepresentation (board) {
        let objectRepresentation = new Array(board.length); // Array to be returned
        let boardSize = Math.sqrt(board) // gets dimension of board
        for (let i = 0; i < board.length; i++) {
            let leftNeighbor;
            let upNeighbor;
            let row = Math.floor(i / boardSize) // gets the row of the string representation being converted to an object
            let col = (i % boardSize) // gets the column of the string representation being converted to an object
            if (row > 0) { // if the string representation isn't located in the first row, then it will have an upNeighbor
                upNeighbor = objectRepresentation[(row - 1) * boardSize + col]; // Element located above the string representation 
            }
            if (col > 0) { // if the string representation isn't located in the first column, then it will have a leftNeighbor
                leftNeighbor = objectRepresentation[row * boardSize + (col - 1)] // Element located to the left of the string representation
            }
            switch(board[i]){
                case "w": objectRepresentation[i] = new Wall(leftNeighbor, upNeighbor); break; // Wall object
                case "a": objectRepresentation[i] = new Air(leftNeighbor, upNeighbor); break; // Air object
                case "p": objectRepresentation[i] = new Player(leftNeighbor, upNeighbor); break; // Player object
                case "n": objectRepresentation[i] = new Sushi(leftNeighbor, upNeighbor, undefined, undefined, "nigiri"); break; // Sushi object with type "nigiri"
                case "sa": objectRepresentation[i] = new Sushi(leftNeighbor, upNeighbor, undefined, undefined, "sashimi"); break; // Sushi object with type "sashimi"
                case "su": objectRepresentation[i] = new Sushi(leftNeighbor, upNeighbor, undefined, undefined, "sushi"); break; // Sushi object with type "sushi"
                case "me": objectRepresentation[i] = new Enemy(leftNeighbor, upNeighbor, undefined, undefined, "munsell"); break; // Enemy object with type "munsell"
                case "je": objectRepresentation[i] = new Enemy(leftNeighbor, upNeighbor, undefined, undefined, "jordan"); break; // Enemy object with type "jordan"
                case "se": objectRepresentation[i] = new Enemy(leftNeighbor, upNeighbor, undefined, undefined, "stotts"); break; // Enemy object with type "stotts"
                case "mje": objectRepresentation[i] = new Enemy(leftNeighbor, upNeighbor, undefined, undefined, "majikes"); break; // Enemy object with type "majikes"
                case "sne": objectRepresentation[i] = new Enemy(leftNeighbor, upNeighbor, undefined, undefined, "snoeyink");break; // Enemy object with type "snoeyink"
                case "pe": objectRepresentation[i] = new Enemy(leftNeighbor, upNeighbor, undefined, undefined, "plaisted"); break; // Enemy object with type "plaisted"
                default: throw `convertFromStringToObjectRepresentation Error: ${board[i]} not recognized as a string representation of an Element`;
            }
        }
        return objectRepresentation;
    }

    getGameState () {
        return {
            board: this.gameBoard,
            score: this.playerScore,
            isAlive: this.playerIsAlive
        }
    }

    /**
     * Returns element at row r and column c
     * @param {number} r row number
     * @param {number} c column number
     */
    get (r, c) {
        return this.gameBoard[size * r + c];
    }

    /**
     * Sets row r, column c in the gameboard to a specified object
     * @param {number} r row number
     * @param {number} c column number
     * @param {Object} object instance of an object being added to gameBoard
     */
    set (r, c, object) {
        this.gameBoard[size * r + c] = object;
    }

    /**
     * Returns the row a particular instance of an object is located in
     * @param {Object} object Instance of an object
     */
    getRowOf (object) {
        return (this.gameBoard.indexOf(object) - this.getColumnOf(object) / size);
    }

    /**
     * Returns the column a particular instance of an object is located in
     * @param {Object} object 
     */
    getColumnOf = function (object) {
        return this.gameBoard.indexOf(object) % size;
    }

    /**
     * 
     * @param {Object} object The object that's being moved
     * @param {String} direction String representation of the direction the object is being moved in 
     */
    move (object, direction) {
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

        let actionSelectorResult = this.actionSelector(targetRow, targetCol); // the return value (number) of the actionSelector call

        if (actionSelectorResult == 3) {    // if the object is moving into a tile that has an Air object
            this.set(targetRow, targetRow, object); // replace the Air object with the object being moved
            this.set(objectRow, objectCol, new Air); // set the tile the object used to occupy with a new Air object
        }

        this.notifyMoveListeners();
    }

    /**
    * Determines what Class a given object belongs to 
    * @param {object} object instance of object being checked
    */
    getClass (object) {
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
    actionSelector (object, row, col) {
        let square = this.get(row, col);
        if (square == undefined || col < 0 || row < 0 || col >= size || row >= size) {//Empty Space
            return -1
        }

        let currSquare = this.getClass(square);

        switch (currSquare) {
            case 0: // Player
                return 0;
            case 1://Enemy
                this.enemyAhead();
                return 1;
            case 2://Sushi
                if (this.getClass(object) == 1) { // if the object encountering the sushi is an Enemy
                    return 2;                   // then treat the sushi object as a Wall
                }
                else {                           // else the object encountering the sushi is a Player
                    this.collectSushi(row, col); // then call collect sushi and treat it as Air
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
    collectSushi (row, col) {
        //Remove Sushi
        let sushiToBeRemoved = this.get(row, col);
        let newAir = new Air(sushiToBeRemoved.neighborLeft, sushiToBeRemoved.neighborUp, sushiToBeRemoved.neighborRight, sushiToBeRemoved.neighborDown);

        this.set(row, col, newAir);

        //Increase Score
        this.playerScore += 1;

        //Update Player Position

        //Update Callbacks
    }

    enemyAhead (row, col) {
        //Get Total Game Time
        let endPlayerTime = new Date();
        let totalTime = endPlayerTime - this.startPlayerTime;

        //Set Dead
        this.playerIsAlive = false;

        //Kickback Callbacks
    }

    /**
     * Registers move listeners with current instance of Game
     * @param {function} callback callback function of listener
     */
    onMove (callback) {
        this.moveListeners.push(callback);
    }

    /**
     * Notifies all registered move listeners that a move has taken place
     */
    notifyMoveListeners () {
        this.moveListeners.forEach(callback => {
            callback();
        })
    }
}