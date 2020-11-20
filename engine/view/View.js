class View {
    /**
     * creates a new View object
     * @param {Socket} socket instance of socket object that represents the connection made by gameview.js running client-side
     */
    constructor(socket) {
        this.socket = socket;
    }

    gameWon(winner, totalTime) {
        this.socket.emit("game won", winner, totalTime);
    }

    /**
     * Function that tell's the client to render a board passed to it
     * @param {Array} board string representation of the Game object's board/
     */
    renderBoard(board) {
        this.socket.emit("render board", board);
    }

    updateTime(time) {
        this.socket.emit("update time", time);
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