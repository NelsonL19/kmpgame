/**
 * Because of how Socket.io works, we can't do page redirrects without disconnecting the socket and connecting on an new one
 * This would screw up how the index.js keeps track of users so we're going to just dynamically load a single HTML page
 * This is the javascript file to be used on that one HTML page
 */

const socket = io();

const $loginBox = $('#login_box');

$(function () {
    let $username = $('#username');
    let $submit = $('#submit');

    $submit.on('click', function (e) {
        e.preventDefault(); // Prevents the page from reloading
        console.log("click");
        socket.emit('set screen name', $username.val()); // Sends the server code what the user has entered 
    });

    socket.on('screen name set', function (isWaiting) { // When it recieves word the the screen name is set
        console.log("Name set!");
        if (isWaiting) {    
            $loginBox.empty();
            $loginBox.append('<h1>Connect succesfully! Waiting for an opponent...</h1>');
        }
    });

    socket.on('game starting', role => { // Backend informs client that game is starting 
        socket.on('render board', function(board) {
            loadTableDOM(board); // reloads the board
        })
    });
});

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
 * Takes user input and depending on input, tells controller how to move the player
 */
window.addEventListener('keydown', (event) => {
    switch(event.key){
        case 'ArrowUp': socket.emit('move', 'up'); break;
        case 'ArrowDown': socket.emit('move', 'down') ;break;
        case 'ArrowLeft': socket.emit('move', 'left');break;
        case 'ArrowRight': socket.emit('move', 'right');break;
    }
});