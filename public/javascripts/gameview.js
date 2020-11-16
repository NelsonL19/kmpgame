//import {Controller} from "../engine/model/Game.js";
//import { Game } from "../../engine/model/Game.js";

//let game = new Game();

/**
* Generates new table on page load.
*/

function generatePage(){
    const $page = $('page');
    let page = `<section class="hero is-fullheight is-link is-bold">
                    <div class="hero-body">
                    <div class="container">
                    <h1 class="title">Current Opponent</h1>
                    <h1 class="subtitle" id="vs">You vs. Current Opponent</h1>
                    <h1 class="title">Current Score</h1>
                    <h1 class="subtitle" id="score">0</h1>

                    <p class="title">Current Time</p>
                    <h1 class="subtitle" id="time">00:00:00</h1>
                    <div style="border: 0px solid; width: 705px;height:705px; margin:0 auto;">
                        <table name="game" id='game' style="margin-left: auto; margin-right: auto; background: rgb(50,116,220)">
                    </div>
                    </table>
        </div>
</section>`
}
function generateStartTable() {
    const $table = $(`#game`);
    for (let i = 0; i < 15; i++) {
        let row = `<tr id = r${i}></tr>`
        $(row).appendTo($table);
        for (let j = i * 15; j < (i + 1) * 15; j++) {
            let cell = `<td id = c${j}></td>`;
            const $row = $(`#r${i}`);
            $(cell).appendTo($row);
        }
    }
}

/**
* Adds classes to table accordingly in HTML from string representaion of board from newly created game.
* @param {Array} board String representaion of board.
*/
function loadTableDOM(board) {
    for (i = 0; i < 225; i++) {
        switch(board[i]){
            case "w": $(`#c${i}`).addClass('wall');break; 
            case "a": $(`#c${i}`).addClass('air');break;
            case "p": $(`#c${i}`).addClass('player');break;

            case "n": $(`#c${i}`).addClass('nigiri');$(`#c${i}`).addClass('powerup');break;
            case "sa": $(`#c${i}`).addClass('sashimi');$(`#c${i}`).addClass('powerup');break;
            case "su": $(`#c${i}`).addClass('sushi');$(`#c${i}`).addClass('powerup');break;

            case "me": $(`#c${i}`).addClass('enemy'); $(`#c${i}`).addClass('munsell_enemy');break;
            case "je": $(`#c${i}`).addClass('enemy'); $(`#c${i}`).addClass('jordan_enemy');break;
            case "se": $(`#c${i}`).addClass('enemy'); $(`#c${i}`).addClass('stotts_enemy');break;

            case "mje": $(`#c${i}`).addClass('enemy'); $(`#c${i}`).addClass('majikes_enemy');break;
            case "sne": $(`#c${i}`).addClass('enemy'); $(`#c${i}`).addClass('snoeyink_enemy');break;
            case "pe": $(`#c${i}`).addClass('enemy'); $(`#c${i}`).addClass('plaisted_enemy');break;

            case "ce": $(`#c${i}`).addClass('enemy'); $(`#c${i}`).addClass('cynthia_enemy');break;
            case "poe": $(`#c${i}`).addClass('enemy'); $(`#c${i}`).addClass('porter_enemy');break;
            case "te": $(`#c${i}`).addClass('enemy'); $(`#c${i}`).addClass('terrell_enemy');break;
            
            case "de": $(`#c${i}`).addClass('enemy'); $(`#c${i}`).addClass('diane_enemy');break;
            case "ke": $(`#c${i}`).addClass('enemy'); $(`#c${i}`).addClass('kevin_enemy');break;
            case "fe": $(`#c${i}`).addClass('enemy'); $(`#c${i}`).addClass('folt_enemy');break;
            
        }
    }
}
/**
* Returns current position of the player. This will be the index in our string representaion.
*/
function getPlayer() {
    for (let i = 0; i < 15; i++) {
        for (let j = i * 15; j < (i + 1) * 15; j++) {
            if ($(`#c${j}`).attr(`class`) === 'player') {
                return j
            }
        }
    }
}
/**
* Returns current positions of the powerups. These will be the indexes in our string representaion.
*/
function getPowerupPositions() {
    let currPowerupPositions = 0;
    for (let i = 0; i < 15; i++) {
        for (let j = i * 15; j < (i + 1) * 15; j++) {
            if ($(`#c${j}`).hasClass('powerup')) {
                currPowerupPositions++;
            }
        }
    }
    return currPowerupPositions;
}
/**
* Updates player position in HTML representation. Handles interactions with other HTML objects.
* @param {number} currPosition The current position, or index, of player.
* @param {string} direction The key press to determine the player movement.
*/
function updatePlayerPosition(currPosition, direction){
    let currScore = parseInt($('.score').text(),10);
    let move = 0;
    let newScore = `<h1 class="subtitle" id="score">Current Score: ${currScore+1}</h1>`;
    //let obj = game.player
    //made a time place holder, will replace with real time later
    //let newTime = `<h3 class = "score">${currScore+1}</h3>`;
    switch(direction){
        case 'up': move=-15;break;
        case 'down': move=15;break;
        case 'left': move=-1;break;
        case 'right': move=1; break;
    }
    if($(`#c${currPosition+move}`).attr(`class`) === 'air'){
        $(`#c${currPosition}`).removeClass('player').addClass('air');
        $(`#c${currPosition+move}`).removeClass('air').addClass('player');
        //game.move(obj, direction);
    } else if($(`#c${currPosition+move}`).hasClass('powerup')){
        $(`#c${currPosition}`).removeClass('player').addClass('air');
        $(`#c${currPosition+move}`).removeClass().addClass('player');
        $('.score').replaceWith(newScore)
        // updatePowerupPositionStringRepresentation([],currPosition+move);
        if (getPowerupPositions()==0){
            $('.score').replaceWith(`<h3 class = "score">YOU WIN, LOSER</h3>`);
        }
    } else if($(`#c${currPosition+move}`).hasClass('enemy')){
        $(`#c${currPosition}`).removeClass('player').addClass('dead_player');
        $('.score').replaceWith(`<h3 class = "score">GAME OVER</h3>`);
    }
}

/**
* Updates player position in string array representation of gameboard.
* @param {Array} table The string array representation of the current gameboard.
* @param {number} oldp The old position of the player.
* @param {number} newp The current player position after a keypress.
*/
function updatePlayerPositionStringRepresentation(table, oldp, newp){
    if (oldp == newp){
        return table;
    }
    table[newp] = 'p'
    table[oldp] = 'a'
    return table;
}

/**
* Updates powerup position in string array representation of gameboard.
* @param {Array} table The string array representation of the current gameboard.
* @param {number} position The position of the powerup to be removed.
* @param {number} displacement Which direction the player moved.
*/
function updatePowerupPositionStringRepresentation(table, position, displacement){
    table[position] = 'a';
    return table;
}

window.addEventListener('keydown', (event) => {
    let position = getPlayer();
    switch(event.key){
        case 'ArrowUp': updatePlayerPosition(position, 'up'); break;
        case 'ArrowDown': updatePlayerPosition(position, 'down') ;break;
        case 'ArrowLeft': updatePlayerPosition(position, 'left');break;
        case 'ArrowRight': updatePlayerPosition(position, 'right');break;
    }
    //let newPosition = getPlayer();
    //updatePlayerPositionStringRepresentation([],position,newPosition);
    //will update whatever table we import in, just player position, will handle objects somewhere else
});

$(function () {
    generateStartTable();
    //loadTableDOM(game.getGameState().board);
    setTimeout(function(){
        window.location.reload(1);
     }, 10000);
});
