const Game = require('../model/Game').gameClass;
const View = require('../view/View').viewClass;
const Controller = require('./Controller').controllerClass;

class Match {
    constructor (player1Socket, player2Socket) {
        this.player1Socket = player1Socket;
        this.player2Socket = player2Socket;

        this.game = new Game(); // the game model
        this.view1 = new View(this.player1Socket);
        this.view2 = new View(this.player2Socket);
        this.controller = new Controller(this.game, this.view1, this.view2);
    }

}

module.exports = {
    matchClass: Match
}