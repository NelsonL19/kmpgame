const Element = require('./Element').elementClass; // Imports Element 

/**
 * Object representing Sushi on the gameboard. Extends the Element class
 */
class Sushi extends Element {
    /**
     * Constructs a new Sushi object
     * @param {string} type Type of sushi represented by object ("nigiri", "sashimi", or "sushi")
     */
    constructor (type) {
        super();
        this.isSushi = true;
        this.type = type;
        switch (type) {
            case "nigiri": this.stringRepresentation = "n"; break;
            case "sashimi": this.stringRepresentation = "sa"; break;
            case "sushi": this.stringRepresentation = "su"; break;
            default: throw `Sushi Constructor Error: ${type} is not recognized as a type of Sushi`;
        }
    }
}

module.exports = {
    sushiClass: Sushi
}