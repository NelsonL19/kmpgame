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

let board2 = 
[
"w","w","w","w","w","w","w","w","w","w","w","w","w","w","w",
"w","poe","a","a","a","a","a","a","a","a","a","a","a","ce","w",
"w","a","w","w","w","w","w","su","w","w","w","w","w","a","w",
"w","a","w","sa","a","a","a","a","a","a","a","n","w","a","w",
"w","a","w","a","w","w","w","a","w","w","w","a","w","a","w",
"w","a","w","a","w","a","a","a","a","a","w","a","w","a","w",
"w","a","w","a","w","a","w","a","w","a","w","a","w","a","w",
"w","a","su","a","a","a","a","p","a","a","a","a","su","a","w",
"w","a","w","a","w","a","w","a","w","a","w","a","w","a","w",
"w","a","w","a","w","a","a","a","a","a","w","a","w","a","w",
"w","a","w","a","w","w","w","a","w","w","w","a","w","a","w",
"w","a","w","n","a","a","a","a","a","a","a","sa","w","a","w",
"w","a","w","w","w","w","w","su","w","w","w","w","w","a","w",
"w","te","a","a","a","a","a","a","a","a","a","a","a","a","w",
"w","w","w","w","w","w","w","w","w","w","w","w","w","w","w"
];

let board3 = [
    "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w",
    "w", "p", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "ke", "w",
    "w", "a", "a", "w", "w", "a", "w", "w", "w", "a", "w", "w", "a", "a", "w",
    "w", "a", "w", "sa","w", "a", "w", "su","w", "a", "w", "sa","w", "a", "w",
    "w", "a", "w", "a", "w", "a", "w", "a", "w", "a", "w", "a", "w", "a", "w",
    "w", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "w",
    "w", "a", "w", "a", "w", "w", "w", "a", "w", "w", "w", "a", "w", "a", "w",
    "w", "a", "w", "a", "a", "n", "a", "a", "a", "n", "a", "a", "w", "a", "w",
    "w", "a", "w", "a", "w", "w", "w", "a", "w", "w", "w", "a", "w", "a", "w",
    "w", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "w",
    "w", "a", "w", "a", "w", "a", "w", "a", "w", "a", "w", "a", "w", "a", "w",
    "w", "a", "w", "su","w", "a", "w", "sa","w", "a", "w", "su","w", "a", "w",
    "w", "a", "a", "w", "w", "a", "w", "w", "w", "a", "w", "w", "a", "a", "w",
    "w", "fe", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "de", "w",
    "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w", "w"
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

$(function() {

    //loadTableDOM(makeRandomBoard(15));
    let table = Math.floor(Math.random()*4);
    switch(table){
       case 0:loadTableDOM(board0); break;
       case 1:loadTableDOM(board1); break;
       case 2:loadTableDOM(board2); break;
       case 3:loadTableDOM(board3); break;
   }
   //loadTableDOM(board2)
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


