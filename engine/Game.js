var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);



export function Game(size) {
    let gameBoard = new Array(size**2);
    let playerScore = 0;
    let startPlayerTime = new Date();
    let alive = true;
    /**
     * Returns element at row r and column c
     * @param {number} r row number
     * @param {number} c column number
     */
    this.get = function(r, c) {
        return gameBoard[size*r+c];
    }

    /**
     * Sets row r, column c in the gameboard to a specified object
     * @param {number} r row number
     * @param {number} c column number
     * @param {Object} object instance of an object being added to gameBoard
     */
    this.set = function(r, c, object) {
        gameBoard[size*r+c] = object;
    }

    /**
     * Returns the row a particular instance of an object is located in
     * @param {Object} object Instance of an object
     */
    this.getRowOf = function(object) {
        return (gameBoard.indexOf(object) - this.getColumnOf(object)) / size;
    }

    /**
     * Returns the column a particular instance of an object is located in
     * @param {Object} object 
     */
    this.getColumnOf = function(object) {
        return gameBoard.indexOf(object) % size;
    }

    this.move = function(object, direction) { 
        let objectRow = this.getRowOf(object);
        let objectCol = this.getColumnOf(object);
        switch (direction) {
            case 'up':
                actionSelector(objectRow-1, objectCol);
                break;
            case 'down':
                shift(this.getRowOf(object), this.getColumnOf(object), this.getRowOf(object)+1, this.getColumnOf(object));
                break;
            case 'left':
                shift(this.getRowOf(object), this.getColumnOf(object), this.getRowOf(object), this.getColumnOf(object)-1);
                break;
            case 'right':
                shift(this.getRowOf(object), this.getColumnOf(object), this.getRowOf(object), this.getColumnOf(object)+1);
                break;
        }
    }

    /**
    *    Determine what the type of the object is when called
    * @param {object} object
    *
    */


    let typeOf = function(object) {
        switch (object.constructor.name) {
            case undefined: //air since blank spaces are undefined 
                return 1;
            case "Sushi":
                return 2;
            case "Enemy":
                return 3;
            case "Wall":
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

     let actionSelector = function(row, col) {
        let square = this.get(row, col);
         if (square == undefined || col < 0 || row < 0 || col >= size || row >= size) {//Empty Space
             return -1
         }
         
         let currSquare = this.typeOf(square);

         switch (currSquare) {
            case 1://Air
                return 0;
            case 2://Sushi
                this.collectSushi(row,col);
                return 1;
            case 3://Enemy
                this.enemyAhead();
                return 2;
            case 4://Wall
                this.wallAhead();
                return 3;
            default:
                console.log("AN ERROR HAS OCCURED")
                return -1;
         }
     }

     let collectSushi = function(row, col) {
        //Remove Sushi
        this.set(row, col, undefined);

        //Increase Score
        this.playerScore +=1;

        //Update Player Position
     }

     let enemyAhead = function() {
        //Get Total Game Time
        let endPlayerTime = new Date();
        let totalTime = endPlayerTime-startPlayerTime;

        //Set Dead
        alive = false;

    }

    let wallAhead = function() {
         
    }
}