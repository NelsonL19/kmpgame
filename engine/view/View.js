export class View {
    /**
     * creates a new View object
     * @param {Controller} controller instance of the Controller class that View interacts with
     * @param {Socket} socket instance of socket object that represents the connection made by gameview.js running client-side
     */
    constructor(controller, socket) {
        this.controller = controller
        this.socket = socket;
    }

    /**
     * Function that tell's the client to render a board passed to it
     * @param {Array} board string representation of the Game object's board/
     */
    renderBoard(board) {
        socket.emit("render board", board);
    }



    /**
     * Function that will get an updated board from a client
     * 
     */

    clientPushed() {
        socket.on('board', function(data){
        
        });
    }
}
