const Element = require('./Element').elementClass; // Imports Element 

/**
 * Object representing the Player on the gameboard. Extends the Element class
 */
class Player extends Element {
    /**
     * Constructs a new Player object
     */
    constructor () {
        super();
        this.stringRepresentation = "p";
        this.isDead = false;
    }
}

module.exports = {
    playerClass: Player
}