let Game = require('../model/Game').gameClass;
let View = require('../view/View').viewClass;
let Controller = require('./controller').controllerClass;

class Match {
    constructor (matchID, player1Socket, player2Socket) {
        this.id = matchID;
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