/**
 * Because of how Socket.i works, we can't do page redirrects without disconnecting the socket and connecting on an new one
 * This would screw up how the index.js keeps track of users so we're going to just dynamically load a single HTML page
 * This is the javascript file to be used on that one HTML page
 */

const socket = io();
let matchMusic = new Audio('../music/Boss_Fight.mp3');
let lobbyMusic = new Audio('../music/menu.mp3');
matchMusic.volume = 0.3;
lobbyMusic.volume = 0.5;
lobbyMusic.loop = true;

const $page = $('#page'); // This way it keeps the script tags in when you clear the page
let $mainContainer;
let globalUsername;

let lockControls = false // Set true to keep from spamming emits to the server by holding down arrow keys
let gameOver = true;
let matchID = undefined;

let pendingInvitations = new Array() // Stores the user IDs of all pending invitations

$(async function () {
    loadHeroAndBackground(); // Loads in the blue hero section and the Sushi 9 background image
    loadLogIn();

});

/**
 * Called when the game ends
 * 
 * hasWon: boolean value. True if clientView is winner
 * totalTime: how much time the game took
 * score: how many sushi were collected
 * wasForfeit: boolean value. If true, then it means that the other player disconnected 
 */
socket.on("game won", (hasWon, totalTime, score, wasForfeit) => {
    loadGameWon(hasWon, totalTime, score, wasForfeit);
});
//
socket.on('game starting', function (id, role, currPlayer, currEnemy) { // Backend informs client that game is starting
    lobbyMusic.pause();
    matchMusic.currentTime = 0
    matchMusic.play();
    matchID = id;
    $page.empty(); // Erases the page
    loadGamePage(currPlayer, currEnemy);
    loadStartTable();
    gameOver = false;
    lockControls = false;
});

socket.on('unlock controls', function () {
    lockControls = false;
});

socket.on('render board', function (board, time, score) {
    $('#score').replaceWith(`<h1 class="subtitle" id="score">${score}</h1>`)
    $('td').removeClass(); // Removes class from all <td> elements
    loadTableDOM(board); // reloads the board
    $('#time').text(time);
});

socket.on('new message', function (message) {
    let $message = $('<p>');
    $message.text(message); // Sanitizes message, parsing string as text and not HTML
    $('#chat_window').append($message); // Writes message to chat window
    $('#chat_window').animate({ scrollTop: $('#chat_window').height() }, "slow"); // Automatically scrolls to new chat
});

socket.on('users in lobby', (usersInLobby, users) => { // Processes server response
    for (let user of usersInLobby) {
        if (user == socket.id) { // Want to skip over the entry if it's the current client (client should be able to invite themselves)
            continue;
        }
        let userName = users[user]; // gets name associated with user's ID
        $('#users').append(`<option value="${user}">${userName}</option>`);
    }
});

/**
 * Only used after the create_account button is clicked
 */
socket.on("check if username taken result", found => {
    if (!found) {
        //No Username Found
        // Account already being created in back end
        $('#account_creation_box').append(`<h1 class="title has-text-success">Account Registered! Logging you in...</h1>`)
        $('#cancel_create').replaceWith('');
        $('#create_account').replaceWith('');
        setTimeout(function () {
            globalUsername = $('#new_username').val()
            socket.emit('user logged in', $('#new_username').val()); // Sends the server code what the user has entered
            loadLobby();
        }, 2000);

    } else {
        //Username Found
        $('#account_creation_box').append(`<h1 class="title has-text-danger" id="alred">This Username is Already Registered! Please Select a New One!</h1>`)
        setTimeout(function () {
            $(`#alred`).replaceWith(``)
        }, 2000);
    }
});

socket.on("verify account", correct => {
    if (correct) {
        $('#login_box').append(`<h1 class="title has-text-success" id="err">Logging you in...</h1>`)
        $('#submit').replaceWith('');
        $('#create_new_account').replaceWith('');
        setTimeout(function () {
            globalUsername = $('#username').val()
            socket.emit('user logged in', $('#username').val()); // Sends the server code what the user has entered 
            loadLobby();
        }, 2000);
    } else {
        $('#login_box').append(`<h1 class="title has-text-danger" id="err">Wrong Username/Password or Account Does Not Exist!</h1>`)
        setTimeout(function () {
            $(`#err`).replaceWith(``)
        }, 2000);
    }
});

socket.on('load game invite', (invitingPlayerName, invitingPlayerID) => {
    loadGameInvite(invitingPlayerName, invitingPlayerID);
});

socket.on('invitation declined', () => {
    loadGameOptions();
});

socket.on('ranks', (rankings) => {
    loadLeaderboard(rankings);
})


socket.on("password changed", function () {
    $('#updatebox').replaceWith('<h1 class="title has-text-success updated">Password Changed Successfully!</h1>')
    $('#delete').replaceWith('')
    $('#goBack').replaceWith('')
    setTimeout(function () {
        loadLobby();
    }, 1000);
})


socket.on("account deleted", function () {
    $('#updatebox').replaceWith('<h1 class="title has-text-success">Account Deleted!</h1>')
    $('#delete').replaceWith('')
    $('#goBack').replaceWith('')
    setTimeout(function() {
    loadLogIn();
    },2500);
})





function loadHeroAndBackground () {
    $page.empty(); // Clears out the #page div 
    let heroAndBackgroundHTML = `
    <section class="hero is-fullheight is-link is-bold" style="background-image: url(/images/kmpgamelogo.png); background-size: contain; background-repeat: no-repeat; background-position: center;">
        <div class="hero-body" id="hero_body">
            <div class="container" id="main_container" style="opacity: 0.9;">
            </div>
        </div>
    </section>
    `;
    $page.append(heroAndBackgroundHTML);
    $mainContainer = $('#main_container');
}

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
    if (!lockControls && !gameOver) {
        switch (event.key) {
            case 'ArrowUp': socket.emit('move', matchID, 'up'); break;
            case 'ArrowDown': socket.emit('move', matchID, 'down'); break;
            case 'ArrowLeft': socket.emit('move', matchID, 'left'); break;
            case 'ArrowRight': socket.emit('move', matchID, 'right'); break;
        }
        lockControls = true; // Locks controls until the next game tick
    }
});

function loadLogIn () {
    $mainContainer.empty();
    let logInHTML = `
    <div class="box" id="login_box">
        <div class="field">
            <h1 class="title has-text-link">KMP's Spicy 9 Adventure: Delxue Edition</h1>
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
        let username = $('#username').val();
        let password = $('#password').val(); // Hashes the passwords
        socket.emit('checkUserPassword', username, password);
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
        <div class="field userfield">
            <label class="label">New Username:</label>
            <input class="input" type="text" id="new_username">
        </div>
        <div class="field passwordfield">
            <label class="label">New Password</label>
            <input class="input" type="password" id="new_password">
            </div>
        <div class="field">
            <button class="button is-link" id="create_account">Create Account</button>
            <button class="button is-danger" id="cancel_create">Cancel</button>
        </div>
    </div>
    `
    $mainContainer.append(accountCreatorHTML);
    $('#cancel_create').on('click', function () {
        loadLogIn();
    });

    $('#create_account').on('click', function () {
        if ($('#new_username').val() !== '' && $('#new_password').val() !== '') {
            if ($('#new_username').val().length >= 5 && $('#new_password').val().length >= 5 && $('#new_username').val().length <= 15) {
                let username = $('#new_username').val();
                let password = $('#new_password').val();
                socket.emit("check if username taken", username, password);
            } else {
                $('#account_creation_box').append(`<h1 class="title has-text-danger" id="alred">Please make sure username is between 5 and 15 characters and/or password is at least 5 characters.</h1>`)
                setTimeout(function () {
                    $(`#alred`).replaceWith(``)
                }, 2000);
            }
        } else {
            $('#account_creation_box').append(`<h1 class="title has-text-danger" id="alred">Please make sure both fields are not empty</h1>`)
            setTimeout(function () {
                $(`#alred`).replaceWith(``)
            }, 2000);
        }
        // Code continues under the socket.on("check if username taken result") listener
    });


}

/**
 * Clears out all the content under #hero_body and replaces it with
 * the HTML for the chat window in the lobby
 */
function loadLobby () {
    lobbyMusic.time = 0;
    lobbyMusic.play();
    $mainContainer.empty(); // Clears out the Hero Body
    let chatHTML = `
    <div class="box" id="game_creation_box">
      
    </div>
    <div class="scrollBox" id="chat_window">

    </div>
    <footer>
    <br>
    <div class="box">
        <div class="field inputfield">
            <label class="label">Message:</label>
            <input class="input" type="text" id="message">
        </div>
        <div class="field">
            <button class="button is-primary is-light" id="send_button">Send</button>
        </div>
        </div>
    </footer>
    `;
    $mainContainer.append(chatHTML);
    loadNewGameButton();
    $('.inputfield').on('keydown', '#message', function (e) {
        if ($('#message').val() !== '' && $('#message').val().length <= 100 && e.which == 13) {
            socket.emit('message sent', $('#message').val()); // Tells server a message was sent a passes the message text
            $('#message').val(""); // Emptys the text input
        }
    });
    $('#send_button').on('click', function () {
        if ($('#message').val() !== '' && $('#message').val().length <= 100) {
            socket.emit('message sent', $('#message').val()); // Tells server a message was sent a passes the message text
            $('#message').val(""); // Emptys the text input
        }
    });
}

function loadNewGameButton () {
    $('#game_creation_box').empty();
    $('#game_creation_box').append(`<button class="button is-success is-light" id="new_game">New Game</button>
    <button class="button is-warning is-light" id="help">Tutorial</button>
    <button class="button is-link is-light" id="update">Update your Account</button>`);


    $('#new_game').on('click', function () {
        loadGameOptions();
    });

    $('#help').on('click', function () {
        loadTutorial();
    });

    $('#update').on('click', function () {
        loadUpdater();
    });

}

function loadUpdater () {
    $mainContainer.empty(); // clears body
    let tutorialHTML = `
    <div class="box">
        <div class="box" id="updatebox">
        <div class="field inputfield">
        <label class="label">New Password:</label>
        <input class="input" type="password" id="newPassword">
    </div>

    <div class="field inputfield">
    <label class="label">Old Password:</label>
    <input type="password" class="input" id="oldPassword">
</div>
    
    <div class="field" id="updateinfo">
        <button class="button is-info is-light" id="update">Update Password</button>
    </div>
        </div>



        <button type="button" class="button is-primary is-light" id="goBack">Back To Lobby</button>
        <div id="delreplace">
            <button type="button" class="button is-danger" id="delete">Delete Account</button>
        </div>
    </div>
    `;
    $mainContainer.append(tutorialHTML);

    $('#update').on('click', function () {
        let newPassword = $('#newPassword').val();
        let oldPassword = $('#oldPassword').val();
        socket.emit("update password", newPassword, oldPassword);
    })


    $('#goBack').on('click', function () {
        loadLobby();
    })

    $('#delete').on('click', function () {
        $('#delreplace').replaceWith(`<div id="delreplace">
        <h1 class="title has-text-danger">Are you sure you wanna delete?</h1>
        <button type="button" class="button is-danger" id="delete">Delete Account</button>
        </div>`)


        socket.emit("delete account");
    })
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
    socket.emit('request users in lobby'); // Sends request to server with a list of users in the lobby. Handles response at socket.on("users in lobby")

    $('#send').on('click', function () {
        let recipientID = $('#users').val();
        if (recipientID != 'default') { // If they've selected a valid player to send the message to
            $('#game_creation_box').empty().append(`<p>Invite Sent! Waiting on a Response</p>`);
            socket.emit('send game invite', recipientID);
        }
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

function loadGamePage (currPlayer, currEnemy) {
    let page = `
                <section class="hero is-fullheight is-link is-bold">
                    <div class="hero-body">
                        <div class="container">
                            <div class="columns is-one-fifth">
                                <div class="column">
                                    <h1 class="title">Current Players</h1>
                                    <h1 class="subtitle" id="vs">${currPlayer} vs. ${currEnemy}</h1>
                                    <h1 class="title">Current Score</h1>
                                    <h1 class="subtitle" id="score">0</h1>
                                    <p class="title">Current Time</p>
                                    <h1 class="subtitle" id="time">00:00:00</h1>
                                </div>
                                <div class="column is-four-fifths">
                                    <div style="border: 0px solid; width: 705px;height:705px; margin:0 auto;">
                                        <table name="game" id='game' style="margin: 0 auto; background: rgb(50,116,220);">
                                    </div>
                                </div>
                            </div>
                        </div>
                </section>`
    $(page).appendTo($page);
}

function loadGameInvite (invitingUserName, invitingUserID) {
    pendingInvitations.push(invitingUserID);
    let inviteHTML = `
    <p = "${invitingUserName}" class="field ${invitingUserName} ${invitingUserID}" id = "${invitingUserID}_invite"> ${invitingUserName} is inviting you to a game. Accept Invite?
        <button style="background-color:#48c774; border-radius:5px; color:white; border-width:0px;" id="accept_${invitingUserID}">Yes</button>
        <button style="background-color:#f14668; border-radius:5px; color:white; border-width:0px;" id="decline_${invitingUserID}">No</button>
    </p>`
    $('#chat_window').append(inviteHTML); // Writes invite to chat window
    $('#chat_window').animate({ scrollTop: $('#chat_window').height() }, "slow"); // Automatically scrolls to new chat

    $(`#decline_${invitingUserID}`).on('click', function () {
        declineInvitation(invitingUserID);
    })
    $(`#accept_${invitingUserID}`).on('click', function () {
        acceptInvitation(invitingUserID);
    })
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

function loadGameWon (hasWon, totalTime, score, wasForfeit) {
    gameOver = true;
    lockControls = true;
    matchMusic.pause();
    socket.emit('game ended', matchID);


    let time = (totalTime / 1000).toString();
    
    matchID = undefined;
    // "player"
    // "enemy"

    // "You Won!"
    // "You lost, idiot."

    let winLose = "";
    let color = "";

    if (hasWon) {
        winLose = "You Win!";
        color = "#00ff00";
    } else {
        winLose = "You lost!";
        color = "#ff0000";
    }
    $page.empty();

    let winMessageBody = `
    Sushi Eaten: ${score}<br>
    Time: ${time}
    `

    if (wasForfeit) {
        winMessageBody = "The other player has disconnected, forfeiting the game.";
    }

    let gameWonHTML = `
    <section class="hero is-fullheight is-link is-bold">
        <div class="hero-body">
            <div class="container">
                <div class="box">
                    <div class="box" style="margin-left: 50px; margin-right: 50px;">
                        <h1 style = "color: rgb(200, 200, 200);
                        text-align: center;
                        font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
                        text-shadow: 2px 2px 5px ${color}; font-size: 50px;"
                        >Game Over</h1>

                        <h2 style="color: rgb(130, 130, 130);
                        text-align: center;
                        font-family: verdana;
                        font-size: 20px;
                        text-shadow: 1px 1px 2px rgb(100, 128, 153)"
                        >${winLose}</h2>
                    </div>

                    <h2 style="color: rgb(130, 130, 130);
                    text-align: center;
                    font-family: verdana;
                    font-size: 20px;
                    text-shadow: 1px 1px 1px rgb(100, 128, 153)"
                    >${winMessageBody}</h2>
                    <br>
                    <div id="wonLead">
                    <button type="button" class="button is-primary is-light" id="goBack">Back To Lobby</button>
                    </div>
                    <br>
                    </div>
                </div>
            </div>
        </div>
    </section>`;
    $page.append(gameWonHTML);

    //if (hasWon) {
    //    $('#wonLead').append(`<button type="button" class="button is-danger is-light" id="leaderboard">Post to Leaderboards</button>`)
    //}
    //hello Owen (kep this here)
    $('#goBack').on('click', function () {
        socket.emit('return to lobby');
        loadHeroAndBackground(); // Needs to load in this HTML before it can load the lobby
        loadLobby();
    })

    //$('#leaderboard').on('click', function () {
    //    socket.emit('write leaderboards', globalUsername, time)
    //    $('#leaderboards').replaceWith('')
    //})
}

function loadTutorial () {
    lobbyMusic.pause();

    let tutorialMusic = new Audio('../music/tutorial_audio.mp3');
    tutorialMusic.volume = 0.8;
    tutorialMusic.play();

    $mainContainer.empty(); // clears body
    let tutorialHTML = `
            <div class="box has-text-centered" id="tutorial_window">
            <div class="box has-text-centered">
            <h1 class="title" style = "color: rgb(0, 153, 0);
                text-align: center;
                font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
                text-shadow: 2px 2px 5px rgb(120, 120, 200); font-size: 50px;"
                >Tutorial</h1>
                <h1 class="subtitle has-text-danger" autoplay>Help! KMP is on the loose and he's eating everyone's lunch!!!</h1>
                </div>
            <br>
            
            <div class="columns">
                <div class="column">
                    <figure class="image">
                        <img src="../images/gameplay_gif.gif" alt="Tutorial Gif">
                        </figure>
                </div>
            
                <div class="column">
                    <p>
                    Welcome to KMP'S Spicy 9 Adventure! Play as either a ravenous KMP who steals sushi, 
                    or as the bewildered UNC CS professors trying to stop him! In this game, KMP is 
                    loaded in a board with 3 other CS Professors. One of those professors will be the 
                    second user, who's sole mission is stop KMP. If you're playing as KMP, you win if 
                    you're able to collect all of the Sushi before anyone can catch you. In the lobby, 
                    you can chat to other users, join a random match, or challenge other players directly! 
                    Good luck and have fun!
                    <br>
                    <br>
                    Designed and Created by:
                    <br>
                    Nelson Lopez
                    <br>
                    Andres Menjivar
                    <br>
                    Samuel Miller
                    <br>
                    Alexander Harvey
                    </p>
                    <button type="button" class="button is-primary is-light" id="goBack">Back To Lobby</button>
                </div>
            </div>
        </div>`;
    $mainContainer.append(tutorialHTML);

    $('#goBack').on('click', function () {
        tutorialMusic.pause();
        loadLobby();
    })
}

function loadLeaderboard (rankings) {
    $mainContainer.empty(); // clears body
    let leaderboardHTML = `

            <h1 style = "color: rgb(200, 200, 200);
                text-align: center;
                font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
                text-shadow: 2px 2px 5px rgb(120, 120, 200); font-size: 50px;"
                >Leaderboards</h1>
            <div class="scrollBox" id="leaderboard_window">
        
            </div>
            <button type="button" class="button is-primary is-light" id="goBack">Back To Lobby</button>`;
    $mainContainer.append(leaderboardHTML);

    $('#goBack').on('click', function () {
        loadLobby();
    })

    for (let i = 0; i < rankings.length; i++) {
        let $message = $(`<p># ${i} Name: ${Object.values(rankings[i])[0]}     Time: ${Object.values(rankings[i])[1]}</p>`);
        // Sanitizes message, parsing string as text and not HTML
        $('#leaderboard_window').append($message); // Writes message to chat window
    }
}

/**
 * Called to accept a particular invitation
 * @param {string} invitingUserID User (socket) ID of the inviting player
 */
function acceptInvitation (invitingUserID) {
    socket.emit('accept invitation', invitingUserID); // Tells server that the invitation was accepted
    deleteInvitation(invitingUserID);
    for (let id of pendingInvitations) { // Iterates through array of remaining invitations and declines them
        declineInvitation(id);
    }
}

function declineInvitation (invitingUserID) {
    socket.emit('decline invitation', invitingUserID); // Tells server that the invitation was declined
    deleteInvitation(invitingUserID);
}

/**
 * Removes invitation from given user ID from array pendingInvites
 * @param {string} invitingUserID 
 */
function deleteInvitation (invitingUserID) {
    pendingInvitations = pendingInvitations.filter(value => { // filters out deletedInvite's id
        return value != invitingUserID;
    });
    $(`#${invitingUserID}_invite`).remove();
}