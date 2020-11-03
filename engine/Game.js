var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);



export function Game(size) {
    let gameBoard = new Array(size**2);
   

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
        switch (direction) {
            case 'up':
                shift(this.getRowOf(object), this.getColumnOf(object), this.getRowOf(object)-1, this.getColumnOf(object));
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
                this.collectSushi();
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

     let collectSushi = function() {

     }

     let enemyAhead = function() {
         
    }

    let wallAhead = function() {
         
    }

        
    /**
     * Attempts to move the element in aRow, aCol to the location bRow, bCol. Returns true if success. False if move cannot be made
     * @param {number} aRow 
     * @param {number} aCol 
     * @param {number} bRow 
     * @param {number} bCol 
     */

    let shift = function(aRow, aCol, bRow, bCol) {
        bElement = this.get(bRow, bCol);
        
        if (bElement == undefined || bCol < 0 || bRow < 0 || bCol >= size || bRow >= size) {
            return false;
        }

        let element = this.get(aRow, aCol);
        this.set(aRow, aCol, undefined);
        this.set(bRow, bCol, element);
        return true; 
    }
}