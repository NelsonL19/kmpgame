const Element = require('./elements/Element').elementClass;
const Air = require('./elements/Air').airClass;
const Enemy = require('./elements/Enemy').enemyClass;
const Player = require('./elements/Player').playerClass;
const Sushi = require('./elements/Sushi').sushiClass;
const Wall = require('./elements/Wall').wallClass;
const boards = require('./Boards');

// Class used for creating Model objects
class Game {

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
        });

        this.playerScore = 0;
        this.startPlayerTime = new Date();
        this.isWin = false;
        this.isOver = false;
        this.moveListeners = new Array();
        this.deathListeners = new Array();
        this.winListeners = new Array();
    }

    getRandomPremadeBoard() {
        let random = Math.floor(Math.random() * 4);
        switch (random) {
            case 0: return boards.board0;
            case 1: return boards.board1;
            case 2: return boards.board2;
            case 3: return boards.board3;
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
                case "pe": // Enemy object with type "plaisted"
                    switch (this.enemies.length) {
                        case 0: elementObj = new Enemy("plaisted", false); break;
                        default: elementObj = new Enemy("plaisted", true);
                    }
                    this.enemies.push(elementObj);
                    break;
                case "ce": // Enemy object with type "cynthia"
                    switch (this.enemies.length) {
                        case 0: elementObj = new Enemy("cynthia", false); break;
                        default: elementObj = new Enemy("cynthia", true);
                    }
                    this.enemies.push(elementObj);
                    break;
                case "poe": // Enemy object with type "porter"
                    switch (this.enemies.length) {
                        case 0: elementObj = new Enemy("porter", false); break;
                        default: elementObj = new Enemy("porter", true);
                    }
                    this.enemies.push(elementObj);
                    break;
                case "te": // Enemy object with type "terrell"
                    switch (this.enemies.length) {
                        case 0: elementObj = new Enemy("terrell", false); break;
                        default: elementObj = new Enemy("terrell", true);
                    }
                    this.enemies.push(elementObj);
                    break;
                case "de": // Enemy object with type "diane"
                    switch (this.enemies.length) {
                        case 0: elementObj = new Enemy("diane", false); break;
                        default: elementObj = new Enemy("diane", true);
                    }
                    this.enemies.push(elementObj);
                    break;
                case "ke": // Enemy object with type "kevin"
                    switch (this.enemies.length) {
                        case 0: elementObj = new Enemy("kevin", false); break;
                        default: elementObj = new Enemy("kevin", true);
                    }
                    this.enemies.push(elementObj);
                    break;
                case "fe": // Enemy object with type "folt"
                    switch (this.enemies.length) {
                        case 0: elementObj = new Enemy("folt", false); break;
                        default: elementObj = new Enemy("folt", true);
                    }
                    this.enemies.push(elementObj);
                    break;
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
            isOver: this.isOver,
            startTime: this.startPlayerTime
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
        let currentSquare = object.constructor.name;
        let targetSquare = this.get(targetRow, targetCol).constructor.name;
        let moveValid = true;

        switch (targetSquare) {
            case "Player": this.killPlayer(); break; // The only way the targetSquare can encounter a Player is if it is an Enemy
            case "Enemy": //Enemy
                if (currentSquare == "Enemy") {
                    moveValid = false; // Can't move an Enemy into an Enemy
                } else {
                    this.killPlayer();
                }
                break;
            case "Sushi"://Sushi
                if (currentSquare == "Enemy") { 
                    moveValid = false; // An Enemy shouldn't be able to move into a Suhsi             
                } else { // A Player should collect Sushi
                    this.collectSushi(targetRow, targetCol); // then call collect sushi and treat it as Air
                }
                break;
            case "Wall": moveValid = false; break;
            case "Air": break;
        }
        if (moveValid) {
            this.set(targetRow, targetCol, object); // replace the Air object with the object being moved
            this.set(objectRow, objectCol, new Air()); // set the tile the object used to occupy with a new Air object
            this.countPowerups(this.gameBoard.objectRepresentation);
        }
        this.notifyMoveListeners();
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

    moveAI() {
        for (let enemy of this.enemies) {
            if (enemy.isCPU) {
                let playerDirection = this.findPlayer(enemy);
                if (playerDirection == false) {
                    let row = this.getRowOf(enemy); // Row Enemy occupies
                    let col = this.getColumnOf(enemy); // Column Enemy occupies
                    let validDirections = new Array(); // Array storing all the possible directions the Enemy could move in 
                    switch (this.get(row-1, col).constructor.name) {
                        case "Air": validDirections.push("up"); break;
                        case "Player": this.move(enemy, "up"); continue;
                    }
                    switch (this.get(row+1, col).constructor.name) {
                        case "Air": validDirections.push("down"); break;
                        case "Player": this.move(enemy, "down"); continue;
                    }
                    switch (this.get(row, col-1).constructor.name) {
                        case "Air": validDirections.push("left"); break;
                        case "Player": this.move(enemy, "left"); continue;
                    }
                    switch (this.get(row, col+1).constructor.name) {
                        case "Air": validDirections.push("right"); break;
                        case "Player": this.move(enemy, "right"); continue;
                    }
                    if (validDirections.length > 0) { // if there's at least 1 direction the Enemy can move in
                        let switcharoo = Math.floor(Math.random() * 4);
                        if ((validDirections.indexOf(enemy.direction) == -1) || switcharoo == 0) { // If it can't keep going in the current direction or randomy decides to switch directions
                            let randomIndex = Math.floor(Math.random() * validDirections.length); // Chooses a random index from validDirections
                            enemy.direction = validDirections[randomIndex]; // picks a new direction to move in
                        } 
                        this.move(enemy, enemy.direction);
                    }
                }
                else { // Else, playerDirection is known
                    enemy.direction = playerDirection;
                    this.move(enemy, enemy.direction);
                }
            }
        }
    }
    /**
     * Returns direction Player is in
     * If Player not in line of sight, returns False
     */
    findPlayer(enemy) {
        let currentRow = this.getRowOf(enemy);
        let currentCol = this.getColumnOf(enemy);
        // Look up
        for (let row = currentRow - 1; row >= 0; row--) {
            let target = this.get(row, currentCol).constructor.name;
            if (target == "Player") { // Found Player
                return "up";
            } else if (target == "Sushi" || target == "Wall" || target == "enemy") { // Cant see any further, stop looking
                break;
            }
        }
        // Look down
        for (let row = currentRow + 1; row <= 15; row++) {
            let target = this.get(row, currentCol).constructor.name;
            if (target == "Player") { // Found Player
                return "down";
            } else if (target == "Sushi" || target == "Wall" || target == "enemy") { // Cant see any further, stop looking
                break;
            }
        }
        // Look left
        for (let col = currentCol - 1; col >= 0; col--) {
            let target = this.get(currentRow, col).constructor.name;
            if (target == "Player") { // Found Player
                return "left";
            } else if (target == "Sushi" || target == "Wall" || target == "enemy") { // Cant see any further, stop looking
                break;
            }
        }
        // Look right
        for (let col = currentCol + 1; col <= 15; col++) {
            let target = this.get(currentRow, col).constructor.name;
            if (target == "Player") { // Found Player
                return "right";
            } else if (target == "Sushi" || target == "Wall" || target == "enemy") { // Cant see any further, stop looking
                break;
            }
        }
        return false // Didn't see the Player
    }

    /**
     * Function that is called whenever a player runs into an enemy, which ends the game with a victory for the opponent
     */

    killPlayer() {
        //Get Total Game Time
        let endPlayerTime = new Date();
        let totalTime = endPlayerTime - this.startPlayerTime;
        this.totalTime = totalTime;
        //Set Dead//
        this.isOver = true;

        //Kickback Callbacks
        this.deathListeners.forEach(callback => {
            callback();
        })
    }

    /**
* Registers move listeners with current instance of Game
* @param {function} callback callback function of listener
*/
    onDeath(callback) {
        this.deathListeners.push(callback);
    }

    /**
 * Registers move listeners with current instance of Game
 * @param {function} callback callback function of listener
 */
    onWin(callback) {
        this.winListeners.push(callback);
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


    countPowerups(objboard) {
        let currPowerups = 0;
        for (let i = 0; i < 225; i++) {
            if (objboard[i].constructor.name == 'Sushi') {
                currPowerups++;
            }
        }

        if (currPowerups == 0) {
            let totalTime = endPlayerTime - this.startPlayerTime;
            this.totalTime = totalTime;
            this.isWin = true;

            this.winListeners.forEach(callback => {
                callback();
            })
        }
    }
}

module.exports = {
    gameClass: Game
}