/**
 * Parent class for all Objects that appear in the gameboard
 */
export class Element {
    /**
     * 
     * @param {Element} neighborLeft Instance of Element object located to the left
     * @param {Element} neighborUp Instance of Element object located above it
     * @param {Element} neighborRight Instance of Element object located to the right
     * @param {Element} neighborDown Instance of Element object located below it
     */
    constructor (neighborLeft, neighborUp, neighborRight, neighborDown) {
        this.neighborLeft = neighborLeft;
        this.neighborUp = neighborUp;
        this.neighborRight = neighborRight;
        this.neighborDown = neighborDown;
    
        if (neighborLeft != undefined) {
            neighborLeft.neighborRight = this; //tells it's left neighbor that it's there to it's right
        }

        if (neighborUp != undefined) {
            neighborUp.neighborDown = this; //tells it's up neighbor that it's there below it
        }
    }

    
}