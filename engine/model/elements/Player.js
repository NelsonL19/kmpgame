import {Element} from "./Element.js";

/**
 * Object representing the Player on the gameboard. Extends the Element class
 */
export class Player extends Element {
    /**
     * Constructs a new Player object
     */
    constructor () {
        super();
        this.stringRepresentation = "p";
    }
}