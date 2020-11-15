const Element = require('./Element').elementClass; // Imports Element 
/**
 * Object representing Air on the gameboard. Extends the Element class
 */
class Air extends Element {
    /**
     * Constructs a new Air object
     */
    constructor () {
        super();
        this.stringRepresentation = "a";
    }
}

module.exports = {
    airClass: Air
}