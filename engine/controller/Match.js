import { Game } from "../model/Game.js";

export class Match {
    constructor (player1Socket, player2Socket) {
        this.game = new Game(); // the game model
        this.player1Socket = player1Socket;
        this.player2Socket = player2Socket;
    }

}