import {Element} from "./Element.js";

/**
 * Object representing Air on the gameboard. Extends the Element class
 */
export class Air extends Element {
    /**
     * Constructs a new Air object
     */
    constructor () {
        super();
        this.stringRepresentation = "a";
    }
}