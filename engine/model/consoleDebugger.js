import { Game } from "./Game.js";
import keypress from 'keypress';
keypress(process.stdin);



let prettyPrint = function (boardArray) {
    for (let row = 0; row < 15; row++) {
        let string = ""
        for (let col = 0; col < 15; col++) {
            let element = boardArray[row * 15 + col];
            let stringRepresetnation;
            switch (element) {
                //Blocks Start Here
                case "a":
                    stringRepresetnation = "   "; break;
                case "w":
                    stringRepresetnation = " W "; break;
                //Power Ups Start Here
                case "sa":
                    stringRepresetnation = "SA "; break;
                case "su":
                    stringRepresetnation = "SU "; break;
                case "n":
                    stringRepresetnation = " N "; break;
                //Players Start Here
                case "p":
                    stringRepresetnation = " P "; break;
                //Enemies Start Here
                case "se":
                    stringRepresetnation = "SE "; break;
                case "mje":
                    stringRepresetnation = "MJE"; break;
                case "sne":
                    stringRepresetnation = "SNE"; break;
                case "pe":
                    stringRepresetnation = "PE "; break;
                case "je":
                    stringRepresetnation = "JE "; break;
                case "me":
                    stringRepresetnation = "ME "; break;
            }
            string += stringRepresetnation + " ";
        }
        console.log(string);
    }
}

let game = new Game();

prettyPrint(game.getGameState().board);

//const tag = document.querySelector('table');

// tag.addEventListener('keydown', (e) => {
//     let obj = game.gameBoard.objectRepresentation;
//     switch(e.code){
//         case 'KeyW': game.move(obj, 'up');break;
//         case 'KeyA': game.move(obj, 'left');break;
//         case 'KeyS': game.move(obj, 'down');break;
//         case 'KeyD': game.move(obj, 'right');break;
//     }
// });



process.stdin.on('keypress', function (ch, key) {
    let obj = game.player//game.gameBoard.objectRepresentation;
    console.log(obj)
    switch (key.name) {
        case 'right':
            game.move(obj, 'right');
            break;
        case 'left':
            game.move(obj, 'left');
            break;
        case 'down':
            game.move(obj, 'down');

            break;
        case 'up':
            game.move(obj, 'up');
            break;
    }
    if (key && key.ctrl && key.name == 'c') {
        process.stdin.pause();
    }
    prettyPrint(game.getGameState().board);
});


process.stdin.setRawMode(true);
process.stdin.resume();


