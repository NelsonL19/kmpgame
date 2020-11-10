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
    let table = Math.floor(Math.random()*2);
    switch(table){
        case 0:loadTableDOM(board0); break;
        case 1:loadTableDOM(board1); break;
        // case 2:loadTableDOM(board2); break;
        // case 3:loadTableDOM(board3); break;
    }
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


