import {Element} from "Element.js";

/**
 * Object representing Air on the gameboard. Extends the Element class
 */
export class Air extends Element {
    /**
     * Constructs a new Air object
     * @param {Element} neighborLeft Instance of Element object located to the left
     * @param {Element} neighborUp Instance of Element object located above it
     * @param {Element} neighborRight Instance of Element object located to the right
     * @param {Element} neighborDown Instance of Element object located below it
     */
    constructor (neighborLeft, neighborUp, neighborRight, neighborDown) {
        super(neighborLeft, neighborUp, neighborRight, neighborDown);
        this.stringRepresentation = "a";
    }
}