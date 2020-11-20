/**
 * Because of how Socket.io works, we can't do page redirrects without disconnecting the socket and connecting on an new one
 * This would screw up how the index.js keeps track of users so we're going to just dynamically load a single HTML page
 * This is the javascript file to be used on that one HTML page
 */

const socket = io();

const $page = $('body');
const $mainContainer = $('#main_container');

let usernameIsTaken;

$(function () {
    loadLogIn();
});

socket.on("game won", (winner, totalTime) => {
    loadGameWon(winner, totalTime);
});

socket.on('game starting', function (role) { // Backend informs client that game is starting 
    console.log("Game starting!");
    $page.empty(); // Erases the page
    loadGamePage();
    loadStartTable();
});

socket.on('render board', function (board) {
    $('td').removeClass();
    loadTableDOM(board); // reloads the board
});

socket.on('update time', function (time) {
    $('#time').text(time);
    console.log(time);
});

socket.on('new message', function (message) {
    let $message = $('<p>');
    $message.text(message); // Sanitizes message, parsing string as text and not HTML
    $('#chat_window').append($message); // Writes message to chat window
    $('#chat_window').animate({ scrollTop: $('#chat_window').height() }, "slow"); // Automatically scrolls to new chat
});

socket.on('users in lobby', (usersInLobby, users) => { // Processes server response
    console.log(`Users in lobby: ${usersInLobby}`);
    for (let user of usersInLobby) {
        if (user == socket.id) { // Want to skip over the entry if it's the current client (client should be able to invite themselves)
            continue;
        }
        let userName = users[user]; // gets name associated with user's ID
        console.log(`Apending ${userName}`);
        $('#users').append(`<option value="${user}">${userName}</option>`);
    }
});

/**
 * Only used after the create_account button is clicked
 */
socket.on("check if username taken result", found => {
    console.log("Result of checking if username was taken: " + found);
    if (!found) {
        //No Username Found
        //createAccount(username, password);
        $('#account_creation_box').append(`<h1 class="title has-text-success">Account Registered! Logging you in...</h1>`)
        setTimeout(function () {
            //socket.emit('user logged in', $('#new_username').val()); // Sends the server code what the user has entered 
            //loadLobby();
        }, 4000);

    } else {
        //Username Found
        $('#account_creation_box').append(`<h1 class="title has-text-danger" id="alred">This Username is Already Registered! Please Select a New One!</h1>`)
        setTimeout(function () {
            $(`#alred`).replaceWith(``)
        }, 4000);
    }
});

function loadTableDOM (board) {
    for (let i = 0; i < 225; i++) {
        switch (board[i]) {
            case "w": $(`#c${i}`).addClass('wall'); break;
            case "a": $(`#c${i}`).addClass('air'); break;
            case "p": $(`#c${i}`).addClass('player'); break;

            case "n": $(`#c${i}`).addClass('nigiri'); $(`#c${i}`).addClass('powerup'); break;
            case "sa": $(`#c${i}`).addClass('sashimi'); $(`#c${i}`).addClass('powerup'); break;
            case "su": $(`#c${i}`).addClass('sushi'); $(`#c${i}`).addClass('powerup'); break;

            case "me": $(`#c${i}`).addClass('enemy'); $(`#c${i}`).addClass('munsell_enemy'); break;
            case "je": $(`#c${i}`).addClass('enemy'); $(`#c${i}`).addClass('jordan_enemy'); break;
            case "se": $(`#c${i}`).addClass('enemy'); $(`#c${i}`).addClass('stotts_enemy'); break;

            case "mje": $(`#c${i}`).addClass('enemy'); $(`#c${i}`).addClass('majikes_enemy'); break;
            case "sne": $(`#c${i}`).addClass('enemy'); $(`#c${i}`).addClass('snoeyink_enemy'); break;
            case "pe": $(`#c${i}`).addClass('enemy'); $(`#c${i}`).addClass('plaisted_enemy'); break;

            case "ce": $(`#c${i}`).addClass('enemy'); $(`#c${i}`).addClass('cynthia_enemy'); break;
            case "poe": $(`#c${i}`).addClass('enemy'); $(`#c${i}`).addClass('porter_enemy'); break;
            case "te": $(`#c${i}`).addClass('enemy'); $(`#c${i}`).addClass('terrell_enemy'); break;

            case "de": $(`#c${i}`).addClass('enemy'); $(`#c${i}`).addClass('diane_enemy'); break;
            case "ke": $(`#c${i}`).addClass('enemy'); $(`#c${i}`).addClass('kevin_enemy'); break;
            case "fe": $(`#c${i}`).addClass('enemy'); $(`#c${i}`).addClass('folt_enemy'); break;

        }
    }
}


/**
 * Takes user input and depending on input, tells controller how to move the player
 */
window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp': socket.emit('move', 'up'); break;
        case 'ArrowDown': socket.emit('move', 'down'); break;
        case 'ArrowLeft': socket.emit('move', 'left'); break;
        case 'ArrowRight': socket.emit('move', 'right'); break;
    }
});

function loadLogIn () {
    $mainContainer.empty();
    let logInHTML = `
    <div class="box" id="login_box">
        <div class="field">
            <label class="label">Username:</label>
            <input class="input" type="text" id="username">
        </div>
        <div class="field">
            <label class="label">Password</label>
            <input class="input" type="password" id="password">
        </div>
        <div class="field">
            <button class="button is-link" id="submit">Enter</button>
            <button class="button is-info" id="create_new_account">Create New Account</button>
        </div>
    </div>
    `;
    $mainContainer.append(logInHTML);
    // Listener for submit button
    $('#submit').on('click', function (e) {
        socket.emit('user logged in', $('#username').val()); // Sends the server code what the user has entered 
        loadLobby();
    });
    // Listener for create account button
    $('#create_new_account').on('click', function () {
        loadAccountCreator();
    });

}

/**
 * Loads in the account creator into $heroBody
 */
function loadAccountCreator () {
    $mainContainer.empty();
    let accountCreatorHTML = `
    <div class="box" id="account_creation_box">
        <div class="field">
            <label class="label">New Username:</label>
            <input class="input" type="text" id="new_username">
        </div>
        <div class="field">
            <label class="label">New Password</label>
            <input class="input" type="password" id="new_password">
            </div>
        <div class="field">
            <button class="button is-link" id="create_account">Create Account</button>
            <button class="button is-danger" id="cancel">Cancel</button>
        </div>
    </div>
    `
    $mainContainer.append(accountCreatorHTML);
    $('#cancel').on('click', function () {
        loadLogIn();
    });

    $('#create_account').on('click', function () {
        let username = $('#new_username').val();
        let password = $('#new_password').val();
        socket.emit("check if username taken", username);
        // Code continues under the socket.on("check if username taken result") listener
    });


}


function createAccount (username, password) {
    let account = { username, password }
    socket.emit("account made", account);
}



/**
 * Clears out all the content under #hero_body and replaces it with
 * the HTML for the chat window in the lobby
 */
function loadLobby () {
    $mainContainer.empty(); // Clears out the Hero Body
    let chatHTML = `
    <div class="box" id="game_creation_box">
        
    </div>
    <div class="scrollBox" id="chat_window">

    </div>
    <footer>
        <div class="field">
            <label class="label">Message:</label>
            <input class="input" type="text" id="message">
        </div>
        <div class="field">
            <button class="button" id="send_button">Send</button>
        </div>
    </footer>
    `;
    $mainContainer.append(chatHTML);
    loadNewGameButton();
    $('#send_button').on('click', function () {
        socket.emit('message sent', $('#message').val()); // Tells server a message was sent a passes the message text
        $('#message').val(""); // Emptys the text input
    });
}

function loadNewGameButton () {
    $('#game_creation_box').empty();
    $('#game_creation_box').append('<button class="button is-success" id="new_game">New Game</button>');
    $('#new_game').on('click', function () {
        loadGameOptions();
    });
}

function loadGameOptions () {
    $('#game_creation_box').empty();
    let gameOptionsHTML = `
    <button class="button" id="join_random_match">Join a Random Match</button>
    <button class="button" id="invite_a_friend">Invite a Friend</button>
    <button class="button is-danger" id="cancel">Cancel</button>
    `
    $('#game_creation_box').append(gameOptionsHTML);

    $('#join_random_match').on('click', function () {
        socket.emit('join waiting room');
        loadWaitingRoomMessage();
    });

    $('#invite_a_friend').on('click', function () {
        loadInvitationCreator();
    })

    $('#cancel').on('click', function () {
        loadNewGameButton();
    });
}

function loadInvitationCreator () {
    $('#game_creation_box').empty(); // Empties the top bar above chat
    let invitationHTML = `
    <label>Recipient of invitation:</label>
    <select class="select" name="users" id="users">
        <option value="default">Select a Player</option>
    </select>
    <button class="button is-success" id="send">Send</button>
    <button class="button is-danger" id="cancel">Cancel</button>
    `;
    $('#game_creation_box').append(invitationHTML); // Adds in the dropdown selector
    socket.emit('request users in lobby'); // Sends request to server with a list of users in the lobby
    console.log("requesting users");

    $('#users').on('change', function () {
        console.log($('#users').val());
    });
    $('#cancel').on('click', function () {
        loadGameOptions();
    });
}

function loadWaitingRoomMessage () {
    $('#game_creation_box').empty();
    let waitingRoomMessageHTML = `
        <p>Waiting for another player to join, please wait...</p>
        <button class="button is-danger" id="cancel">Cancel</button>
    `
    $('#game_creation_box').append(waitingRoomMessageHTML);
    $('#cancel').on('click', function () {
        socket.emit('leave waiting room');
        loadGameOptions();
    });
}

function loadGamePage () {
    let page = `
                <section class="hero is-fullheight is-link is-bold">
                    <div class="hero-body">
                        <div class="container">
                            <h1 class="title">Current Opponent</h1>
                            <h1 class="subtitle" id="vs">You vs. Current Opponent</h1>
                            <h1 class="title">Current Score</h1>
                            <h1 class="subtitle" id="score">0</h1>
                            <p class="title">Current Time</p>
                            <h1 class="subtitle" id="time">00:00:00</h1>
                            <div style="border: 0px solid; width: 705px;height:705px; margin:0 auto;">
                                <table name="game" id='game' style="margin: 0 auto; background: rgb(50,116,220);">
                            </div>
                        </div>
                </section>`
    $(page).appendTo($page);
}

function loadStartTable () {
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

function loadGameWon (winner, totalTime) {
    $page.empty();
    let gameWonHTML = ``;
    $page.append(gameWonHTML);
}


