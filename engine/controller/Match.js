import { Game } from "../model/Game.js";
import { View } from "../view/View.js";
import { Controller } from "./Controller.js";

export class Match {
    constructor (player1Socket, player2Socket) {
        this.player1Socket = player1Socket;
        this.player2Socket = player2Socket;

        this.game = new Game(); // the game model
        this.view1 = new View(this.player1Socket);
        this.view2 = new View(this.player2Socket);
        this.controller = new Controller(this.game, this.view1, this.view2);
    }

}