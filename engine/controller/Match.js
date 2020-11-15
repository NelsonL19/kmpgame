import { Game } from "../model/Game.js";
import { View } from "../"
import { Controller } from "./Controller.js";

export class Match {
    constructor (player1Socket, player2Socket) {
        this.player1Socket = player1Socket;
        this.player2Socket = player2Socket;

        this.game = new Game(); // the game model
        this.view1 = new
        this.controller = new Controller(this.game,)
    }

}