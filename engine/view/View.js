export class View {
    /**
     * creates a new View object
     * @param {Socket} socket instance of socket object that represents the connection made by gameview.js running client-side
     */
    constructor(socket) {
        this.socket = socket;
    }

    /**
     * Function that tell's the client to render a board passed to it
     * @param {Array} board string representation of the Game object's board/
     */
    renderBoard(board) {
        this.socket.emit("render board", board);
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
