/**
 * Parent class for all Objects that appear in the gameboard
 */
class Element {
    /**
     * Constructs a new Element object
     */
    constructor () {
        this.isSushi = false;
        this.isWall = false;
    }
}

module.exports = {
    elementClass: Element
}