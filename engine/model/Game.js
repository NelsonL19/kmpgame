import { Element } from "./elements/Element.js";
import { Air } from "./elements/Air.js";
import { Enemy } from "./elements/Enemy.js";
import { Player } from "./elements/Player.js";
import { Sushi } from "./elements/Sushi.js";
import { Wall } from "./elements/Wall.js";
import { board0, board1 } from "./Boards.js";

// Class used for creating Model objects
export class Game {

    /**
     * Creates a new instance of the Game object
     */
    constructor() {
        this.player; // reference to Player object
        this.enemies = new Array(); // array who's elements are references to the Enemy objects
        let randomBoard = this.getRandomPremadeBoard();
        this.gameBoard = { // object containing 2 arrays. Both contain identical information, just one has it in object representation and the other has it in string representation
            stringRepresentation: randomBoard,
            objectRepresentation: this.convertFromStringToObjectRepresentation(randomBoard)
        }

        this.gameBoard.objectRepresentation.forEach(element => {
           // console.log(JSON.stringify(element));
        });

        this.playerScore = 0;
        this.startPlayerTime = new Date();
        this.playerIsAlive = true;
        this.moveListeners = new Array();

    }

    getRandomPremadeBoard() {
        let random = Math.floor(Math.random() * 2);
        switch (random) {
            case 0: return board0;
            case 1: return board1;
        }
    }

    /**
     * Takes a string representation of a given board and converts it to the object representation using the subclasses of Element
     * @param {Array} board 
     * @returns {Array} Array containing the object representation of the board
     */
    convertFromStringToObjectRepresentation(board) {
        let objectRepresentation = new Array(board.length); // Array to be returned
        let boardSize = Math.sqrt(board) // gets dimension of board
        let elementObj;
        for (let i = 0; i < board.length; i++) {
            switch (board[i]) {
                case "w": elementObj = new Wall(); break; // Wall object
                case "a": elementObj = new Air(); break; // Air object
                case "p": elementObj = new Player(); this.player = elementObj; break; // Player object
                case "n": elementObj = new Sushi("nigiri"); break; // Sushi object with type "nigiri"
                case "sa": elementObj = new Sushi("sashimi"); break; // Sushi object with type "sashimi"
                case "su": elementObj = new Sushi("sushi"); break; // Sushi object with type "sushi"
                case "me": // Enemy object with type "munsell"
                    switch (this.enemies.length) {
                        case 0: elementObj = new Enemy("munsell", false); break;
                        default: elementObj = new Enemy("munsell", true);
                    }
                    this.enemies.push(elementObj);
                    break;
                case "je": // Enemy object with type "jordan"
                    switch (this.enemies.length) {
                        case 0: elementObj = new Enemy("jordan", false); break;
                        default: elementObj = new Enemy("jordan", true);
                    }
                    this.enemies.push(elementObj);
                    break;
                case "se": // Enemy object with type "stotts"
                    switch (this.enemies.length) {
                        case 0: elementObj = new Enemy("munsell", false); break;
                        default: elementObj = new Enemy("munsell", true);
                    }
                    this.enemies.push(elementObj);
                    break;
                case "mje": // Enemy object with type "majikes"
                    switch (this.enemies.length) {
                        case 0: elementObj = new Enemy("majikes", false); break;
                        default: elementObj = new Enemy("majikes", true);
                    }
                    this.enemies.push(elementObj);
                    break;
                case "sne": // Enemy object with type "snoeyink"
                    switch (this.enemies.length) {
                        case 0: elementObj = new Enemy("snoeyink", false); break;
                        default: elementObj = new Enemy("snoeyink", true);
                    }
                    this.enemies.push(elementObj);
                    break;
                case "pe": elementObj = new Enemy("plaisted"); this.enemies.push(elementObj); break; // Enemy object with type "plaisted"
                default: throw `convertFromStringToObjectRepresentation Error: ${board[i]} not recognized as a string representation of an Element`;
            }
            objectRepresentation[i] = elementObj;
        }
        return objectRepresentation;
    }

    getGameState() {
        return {
            board: this.gameBoard.stringRepresentation,
            score: this.playerScore,
            isAlive: this.playerIsAlive
        }
    }

    /**
     * Returns element at row r and column c
     * @param {number} r row number
     * @param {number} c column number
     */
    get(r, c) {
        return this.gameBoard.objectRepresentation[15 * r + c]; // Only care about the Elements when getting so no need to return the string representation
    }

    /**
     * Sets row r, column c in the gameboard to a specified object
     * @param {number} r row number
     * @param {number} c column number
     * @param {Element} object instance of an object being added to gameBoard
     */
    set(r, c, object) {
        this.gameBoard.objectRepresentation[15 * r + c] = object; // Updates data in the Array of objects
        this.gameBoard.stringRepresentation[15 * r + c] = object.stringRepresentation; // Updates the Array of strings to keep the two arrays identical
    }

    /**
     * Returns the row a particular instance of an object is located in
     * @param {Element} object Instance of an object
     */
    getRowOf(object) {
        return (Math.floor((this.gameBoard.objectRepresentation.indexOf(object) - this.getColumnOf(object)) / 15));
    }

    /**
     * Returns the column a particular instance of an object is located in
     * @param {Object} object 
     */
    getColumnOf = function (object) {
        return this.gameBoard.objectRepresentation.indexOf(object) % 15;
    }

    /**
     * 
     * @param {Object} object The object that's being moved
     * @param {String} direction String representation of the direction the object is being moved in 
     */
    move(object, direction) {
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

        console.log(`Row: ${targetRow}`);
        console.log(`Column: ${targetCol}`);

        let actionSelectorResult = this.actionSelector(targetRow, targetCol); // the return value (number) of the actionSelector call
        if (actionSelectorResult == 'Air') {    // if the object is moving into a tile that has an Air object
            this.set(targetRow, targetCol, object); // replace the Air object with the object being moved
            this.set(objectRow, objectCol, new Air()); // set the tile the object used to occupy with a new Air object
        }

        this.notifyMoveListeners();
    }

    /**
     * Before a move has been performed, determine the correct response in the game's logic
     * Returns -1 if Exception, or values 0-3 depending on the obstacle
     * @param {number} row 
     * @param {number} col 
     */
    actionSelector(row, col) {
       //console.log(`Row: ${row}`);
        //console.log(`Column: ${col}`);
        let square = this.get(row, col);
        //console.log(square)
        if (square == undefined || col < 0 || row < 0 || col >= 15 || row >= 15) {//Empty Space
            return -1
        }

        let currSquare = square.constructor.name;

        switch (currSquare) {
            case "Player": // Player
                return 0;
            case "Enemy"://Enemy
                this.enemyAhead();
                return 1;
            case "Sushi"://Sushi
                if (currSquare == "Enemy") { // if the object encountering the sushi is an Enemy
                    return "Wall";                   // then treat the sushi object as a Wall
                }
                else {                           // else the object encountering the sushi is a Player
                    this.collectSushi(row, col); // then call collect sushi and treat it as Air
                    return "Air";
                }
            case "Wall"://Wall
                return "Wall";
            case "Air": //Air
                return "Air";
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
    collectSushi(row, col) {
        //Remove Sushi
        let sushiToBeRemoved = this.get(row, col);
        let newAir = new Air();

        this.set(row, col, newAir);

        //Increase Score
        this.playerScore += 1;

        //Update Player Position

        //Update Callbacks
    }

    /**
 * Moves the Ai after the Enemy Player has selected one to move manually
 * 
 * 
 * 
 */

    moveAi() {
        this.enemies.forEach(enemy => {
            if (this.enemy.isCPU) {
                //CHECK NEARBY BOARD
                let row = this.getRowOf(enemy);
                let col = this.getColumnOf(enemy);

                let neighbors = new Array();
                //GET STUFF AROUND IT
                if (row != 0) { // if not in the first row, it'll have a neighbor above it
                    let above = this.get(row - 1, col);
                    if (!above.isWall && !above.isSushi) { // if the above neighbor isn't a Wall or Sushi
                        neighbors.push(above);
                    }
                }
                if (row != 14) { // if not in the last row, it'll have a neighbor below it
                    let below = this.get(row + 1, col);
                    if (!below.isWall && !below.isSushi) { // if the below neighbor isn't a Wall or Sushi
                        neighbors.push(below);
                    }
                }
                if (col != 0) { // if not in the first column, it'll have a neighbor to its left
                    let left = this.get(row, col - 1);
                    if (!left.isWall && !left.isSushi) { // if the neighbor to the left isn't a Wall or Sushi
                        neighbors.push(left);
                    }
                }
                if (col != 14) { // if not in the last column, it'll have a neighbor to its right
                    let right = this.get(row, col + 1);
                    if (!right.isWall && !right.isSushi) { // if the neighbor to the right isn't a Wall or Sushi
                        neighbors.push(right);
                    }
                }

                let randomNeighbor = neighbors[Math.floor(Math.random(neighbors.length))]; // selects random neighbor
                if (neighbors.indexOf(this.player) != -1) {
                    randomNeighbor = neighbors[neighbors.indexOf(this.player)]; // if right next to a Player, will chose to move to it
                }

                let direction;
                switch (randomNeighbor) { // Given the random choice of neighbor, this switch determines which direction the enemy should move in
                    case above: direction = "up"; break;
                    case below: direction = "down"; break;
                    case left: direction = "left"; break;
                    case right: direction = "right"; break;
                }

                this.move(enemy, direction);
            }
        });
    }

    enemyAhead(row, col) {
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
    onMove(callback) {
        this.moveListeners.push(callback);
    }

    /**
     * Notifies all registered move listeners that a move has taken place
     */
    notifyMoveListeners() {
        this.moveListeners.forEach(callback => {
            callback();
        })
    }
}