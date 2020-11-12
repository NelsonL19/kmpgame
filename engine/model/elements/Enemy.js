import {Element} from "Element.js";

/**
 * Object representing Enemies on the gameboard. Extends the Element class
 */
export class Enemy extends Element {
    /**
     * Constructs a new Enemy object
     * @param {Element} neighborLeft Instance of Element object located to the left
     * @param {Element} neighborUp Instance of Element object located above it
     * @param {Element} neighborRight Instance of Element object located to the right
     * @param {Element} neighborDown Instance of Element object located below it
     * @param {string} type Type of Enemy represented by object ("munsell", "jordan", "stotts", "majikes", "snoeyink", "plaisted")
     */
    constructor (neighborLeft, neighborUp, neighborRight, neighborDown, type) {
        super(neighborLeft, neighborUp, neighborRight, neighborDown);
        
        switch (type) {
            case "munsell": this.stringRepresentation = "me"; break;
            case "jordan": this.stringRepresentation = "je"; break;
            case "stotts": this.stringRepresentation = "se"; break;
            case "majikes": this.stringRepresentation = "mje"; break;
            case "snoeyink": this.stringRepresentation = "sne"; break;
            case "plaisted": this.stringRepresentation = "pe"; break;
            default: throw `Enemy Constructor Error: ${type} is not recognized as a type of Enemy`;
        }
    }
}