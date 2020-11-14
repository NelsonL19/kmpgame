//import {Controller} from "../controller/Controller.js"

/**
* Generates new table on page load.
*/
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
    let currPowerupPositions = [];
    for (let i = 0; i < 15; i++) {
        for (let j = i * 15; j < (i + 1) * 15; j++) {
            if ($(`#c${j}`).hasClass('powerup')) {
                currPowerupPositions[currPowerupPositions.length] = j;
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
    let newScore = `<h3 class = "score">${currScore+1}</h3>`;
    switch(direction){
        case 'up': move=-15;break;
        case 'down': move=15;break;
        case 'left': move=-1;break;
        case 'right': move=1; break;
    }
    if($(`#c${currPosition+move}`).attr(`class`) === 'air'){
        $(`#c${currPosition}`).removeClass('player').addClass('air');
        $(`#c${currPosition+move}`).removeClass('air').addClass('player');
    } else if($(`#c${currPosition+move}`).hasClass('powerup')){
        $(`#c${currPosition}`).removeClass('player').addClass('air');
        $(`#c${currPosition+move}`).removeClass().addClass('player');
        $('.score').replaceWith(newScore)
        //updatePowerupPositionStringRepresentation([],currPosition+move);
        //updates the current powerup position in our gameboard.
        if (getPowerupPositions().length == 0){
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
*/
function updatePowerupPositionStringRepresentation(table, position){
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
});
