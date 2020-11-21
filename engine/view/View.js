class View {
    /**
     * creates a new View object
     * @param {Socket} socket instance of socket object that represents the connection made by gameview.js running client-side
     */
    constructor(socket) {
        console.log("Constructing new View");
        this.socket = socket;
        console.log("New View constructed!");
    }

    gameWon(winner, totalTime, score) {
        this.socket.emit("game won", winner, totalTime, score);
    }

    /**
     * Function that tell's the client to render a board passed to it
     * @param {Array} board string representation of the Game object's board/
     */
    renderBoard(board, time, score) {
        this.socket.emit("render board", board, time, score); // Passes the board to render, current time, and score
    }

    /**
     * Function that will get an updated board from a client
     * 
     */

    clientPushed() {
        this.socket.on('board', function(data){
            
        });
    }
}

module.exports = {
    viewClass: View
}