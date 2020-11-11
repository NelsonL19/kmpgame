//let randomtable = Math.floor(Math.random()*4);


let board0 = 
[
"w","w","w","w","w","w","w","w","w","w","w","w","w","w","w",
"w","je","a","a","a","a","a","w","a","a","a","a","a","me","w",
"w","a","w","w","a","a","a","sa","a","a","a","w","w","a","w",
"w","a","w","a","a","a","a","a","a","a","a","a","w","a","w",
"w","a","a","a","a","w","a","w","a","w","a","a","a","a","w",
"w","a","a","a","w","w","a","w","a","w","w","a","a","a","w",
"w","a","a","a","a","a","n","a","su","a","a","a","a","a","w",
"w","sa","a","a","w","w","a","w","a","w","w","a","a","sa","w",
"w","a","a","a","a","a","su","a","n","a","a","a","a","a","w",
"w","a","a","a","w","w","a","w","a","w","w","a","a","a","w",
"w","a","a","a","a","w","a","w","a","w","a","a","a","a","w",
"w","a","w","a","a","a","a","a","a","a","a","a","w","a","w",
"w","a","w","w","a","a","a","sa","a","a","a","w","w","a","w",
"w","se","a","a","a","a","a","w","a","a","a","a","a","p","w",
"w","w","w","w","w","w","w","w","w","w","w","w","w","w","w"
];

let board1 = 
[
    "w","w","w","w","w","w","w","w","w","w","w","w","w","w","w",
    "w","mje","a","a","a","a","a","su","a","a","a","a","a","sne","w",
    "w","a","w","w","w","w","a","w","a","w","w","w","w","a","w",
    "w","a","w","a","a","a","a","w","a","a","a","a","w","a","w",
    "w","a","w","a","w","w","sa","a","sa","w","w","a","w","a","w",
    "w","a","w","a","w","a","a","w","a","a","w","a","w","a","w",
    "w","a","a","a","n","a","a","a","a","a","su","a","a","a","w",
    "w","su","w","w","a","w","a","p","a","w","a","w","w","n","w",
    "w","a","a","a","su","a","a","a","a","a","n","a","a","a","w",
    "w","a","w","a","w","a","a","w","a","a","w","a","w","a","w",
    "w","a","w","a","w","w","sa","a","su","w","w","a","w","a","w",
    "w","a","w","a","a","a","a","w","a","a","a","a","w","a","w",
    "w","a","w","w","w","w","a","w","a","w","w","w","w","a","w",
    "w","a","a","a","a","a","a","pe","a","a","a","a","a","a","w",
    "w","w","w","w","w","w","w","w","w","w","w","w","w","w","w"
];

function makeRandomBoard(size) {
    let board = new Array(size*size).fill("a");

    let numEnemies = 0; // counter to determine when to stop adding enemies 
    let numSushi = 0; // counter to determine when to stop adding sushi

    let numRandomSpaces = (size-1)*(size-1) - 4; 
    let numOfSushiToAdd = Math.floor(numRandomSpaces * 0.057); // 5.7% chance tile is sushi
    let numOfAirToAdd = Math.floor(numRandomSpaces * 0.75 ) // Want 75% of spaces to be air
    let numOfWallsToAdd = numRandomSpaces - numOfSushiToAdd - numOfAirToAdd // All remaining spaces are walls

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (i == 0 || i == size - 1 || j == 0 || j == size - 1) { // If it's the first or the last row or first or last column, want to make it just walls
                board[i*size+j] = "w";
                console.log("added wall");
            }
            else if (i == Math.floor(size/2) && j == Math.floor(size/2)) { // Else if it's the middle of the board, add player
                board[i*size+j] = "p";
            }
            else {   
                let randomTile = Math.floor(Math.random()*numRandomSpaces);
                
                if (randomTile >= 0 && randomTile < numOfSushiToAdd) { // if the space is to be sushi
                    let randomSushi = Math.floor(Math.random()*3);
                        switch (randomSushi) {
                            case 0: board[i*size+j] = "n"; break; // Add Nigiri
                            case 1: board[i*size+j] = "sa"; break; // Add Sashimi
                            case 2: board[i*size+j] = "su"; break; // Add Sushi
                        }
                }
                else if (randomTile >= numOfSushiToAdd && randomTile < (numOfSushiToAdd + numOfAirToAdd)) { // if space is to be air
                    board[i*size+j] = "a";
                }
                else { // otherwise, the space is wall
                    board[i*size+j] = "w";
                }
            }
        }
    }
    
    return board;
}

function loadTableDOM(board) {
    for (i = 0; i < 225; i++) {
        switch(board[i]){
            case "w": $(`#c${i+1}`).addClass('wall');break;
            case "a": $(`#c${i+1}`).addClass('air');break;
            case "p": $(`#c${i+1}`).addClass('player');break;
            case "n": $(`#c${i+1}`).addClass('nigiri');break;
            case "sa": $(`#c${i+1}`).addClass('sashimi');break;
            case "su": $(`#c${i+1}`).addClass('sushi');break;
            case "me": $(`#c${i+1}`).addClass('enemy'); $(`#c${i+1}`).addClass('munsell_enemy');break;
            case "je": $(`#c${i+1}`).addClass('enemy'); $(`#c${i+1}`).addClass('jordan_enemy');break;
            case "se": $(`#c${i+1}`).addClass('enemy'); $(`#c${i+1}`).addClass('stotts_enemy');break;
            case "mje": $(`#c${i+1}`).addClass('enemy'); $(`#c${i+1}`).addClass('majikes_enemy');break;
            case "sne": $(`#c${i+1}`).addClass('enemy'); $(`#c${i+1}`).addClass('snoeyink_enemy');break;
            case "pe": $(`#c${i+1}`).addClass('enemy'); $(`#c${i+1}`).addClass('plaisted_enemy');break;
        }
    }
}

$(function() {

    loadTableDOM(makeRandomBoard(15));
    //let table = Math.floor(Math.random()*2);
    //switch(table){
    //    case 0:loadTableDOM(board0); break;
    //    case 1:loadTableDOM(board1); break;
    //     case 2:loadTableDOM(board2); break;
    //    case 3:loadTableDOM(board3); break;
   // }
    //loadTableDOM(board1);
});

// let emptyboard = 
// [
// "w","w","w","w","w","w","w","w","w","w","w","w","w","w","w",
// "w","a","a","a","a","a","a","a","a","a","a","a","a","a","w",
// "w","a","a","a","a","a","a","a","a","a","a","a","a","a","w",
// "w","a","a","a","a","a","a","a","a","a","a","a","a","a","w",
// "w","a","a","a","a","a","a","a","a","a","a","a","a","a","w",
// "w","a","a","a","a","a","a","a","a","a","a","a","a","a","w",
// "w","a","a","a","a","a","a","a","a","a","a","a","a","a","w",
// "w","a","a","a","a","a","a","a","a","a","a","a","a","a","w",
// "w","a","a","a","a","a","a","a","a","a","a","a","a","a","w",
// "w","a","a","a","a","a","a","a","a","a","a","a","a","a","w",
// "w","a","a","a","a","a","a","a","a","a","a","a","a","a","w",
// "w","a","a","a","a","a","a","a","a","a","a","a","a","a","w",
// "w","a","a","a","a","a","a","a","a","a","a","a","a","a","w",
// "w","a","a","a","a","a","a","a","a","a","a","a","a","a","w",
// "w","w","w","w","w","w","w","w","w","w","w","w","w","w","w"
// ];


