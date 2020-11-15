const Element = require('./Element').elementClass; // Imports Element 

/**
 * Object representing Enemies on the gameboard. Extends the Element class
 */
class Enemy extends Element {
    /**
     * Constructs a new Enemy object
     * @param {string} type Type of Enemy represented by object ("munsell", "jordan", "stotts", "majikes", "snoeyink", "plaisted")
     */
    constructor (type, isCPU) {
        super();
        this.type = type;
        this.isCPU = isCPU;
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

module.exports = {
    enemyClass: Enemy
}