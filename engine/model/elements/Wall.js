const Element = require('./Element').elementClass; // Imports Element 

/**
 * Object representing the Walls on the gameboard. Extends the Element class
 */
class Wall extends Element {
    /**
     * Constructs a new Wall object
     */
    constructor () {
        super();
        this.isWall = true;
        this.stringRepresentation = "w";
    }
}

module.exports = {
    wallClass: Wall
}