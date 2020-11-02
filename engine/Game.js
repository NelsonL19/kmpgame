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
     * 
     * @param {Object} object 
     */
    this.getColumnOf = function(object) {
        return gameBoard.indexOf(object) % size;
    }

    this.move = function(object, direction) { 
        
    }
}