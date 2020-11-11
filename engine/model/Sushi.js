import {Element} from "Element.js";

/**
 * Object representing Sushi on the gameboard. Extends the Element class
 */
class Sushi extends Element {
    /**
     * Constructs a new Sushi object
     * @param {Element} neighborLeft Instance of Element object located to the left
     * @param {Element} neighborUp Instance of Element object located above it
     * @param {Element} neighborRight Instance of Element object located to the right
     * @param {Element} neighborDown Instance of Element object located below it
     * @param {string} type Type of sushi represented by object ("nigiri", "sashimi", or "sushi")
     */
    constructor (neighborLeft, neighborUp, neighborRight, neighborDown, type) {
        super(neighborLeft, neighborUp, neighborRight, neighborDown);
        
        switch (type) {
            case "nigiri": this.stringRepresentation = "n"; break;
            case "sashimi": this.stringRepresentation = "sa"; break;
            case "sushi": this.stringRepresentation = "su"; break;
            default: throw `Sushi Constructor Error: ${type} is not recognized as a type of Sushi`;
        }
    }
}