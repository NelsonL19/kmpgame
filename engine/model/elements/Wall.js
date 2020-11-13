import {Element} from "./Element.js";

/**
 * Object representing the Walls on the gameboard. Extends the Element class
 */
export class Wall extends Element {
    /**
     * Constructs a new Wall object
     */
    constructor () {
        super();
        this.isWall = true;
        this.stringRepresentation = "w";
    }
}