const Match = require('./engine/controller/Match').matchClass;
const express = require('express');
const app = express()
const server = require('http').createServer(app);
const path = require('path');
const io = require('socket.io')(server);
const fs = require('fs');

let users = {}; // Key, Value pairs where the Key is the Socket ID and the value is the screen name
let sockets = {}; // Key, Value pairs where the Key is the Socket ID and the value is the associated socket object
let lobby = new Array(); // Keeps track of which sockets are in the lobby
let waitingRoom = new Array(); // Purgatory, stores Socket IDs
let matches = new Array(); // Array containing all the Match objects that are currently running 

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

/**
 * When a new user connects to the server
 */


io.on('connection', async (socket) => { // Listens for a new user (represented by socket) has connected to server
    let id = socket.id;
    sockets[id] = socket; // adds socket to the list of sockets
    console.log(`User: ${id} has connected!`);

    socket.on('user logged in', (name) => { // When the User submits the screen name to be associated with their ID
        console.log(`${name} has logged in`);
        users[id] = name;
        socket.join("lobby"); // Puts the user in the room "lobby"
        lobby.push(id) // Pushes Socket ID onto the Array of users in the lobby
        io.to("lobby").emit('new message', `${users[id]} has joined the lobby`);
        socket.emit('new message', "Welcome to the Lobby! Click \"New Game\" to create a match. To send messages privately, type \"@\" followed by their username.");
    });

    socket.on('join waiting room', () => {
        console.log(waitingRoom);
        waitingRoom.push(id); // Adds user to the waiting room
        if (waitingRoom.length == 2) { // If there's 2 people in the waiting room after adding the user, move them to a match
            createGame(sockets[waitingRoom[0]], sockets[waitingRoom[1]]); // Calls helper method, passing the first 2 socket IDs in waiting room
        }
    });

    socket.on('leave waiting room', () => {
        removeFromWaitingRoom(id);
    });

    /**
     * When server is told a player made a move
     */
    socket.on('move', direction => {
        let currentMatch = matches.filter(value => { return (value.player1Socket == socket) || (value.player2Socket == socket); })[0]; // Gets the Match object the Socket belongs too
        let isEnemy = currentMatch.player2Socket == socket; // get whether or not the socket is the player or the enemy
        currentMatch.controller.move(isEnemy, direction); // tells Controller to make move
    })

    /**
     * When server is told a user sent a message in chat
     */
    socket.on('message sent', function (message) {
        let name = users[socket.id] // Gets the username associated with the socket
        let messageBody = `${name}: ${message}`;
        io.to('lobby').emit('new message', messageBody); // Emits ONLY to sockets in the lobby that a new message was sent
    });

    socket.on('request users in lobby', () => {
        console.log("recieving request for users");
        console.log(`Users in lobby: ${lobby}`);
        socket.emit('users in lobby', lobby, users); // Sends requesting socket an array of IDs in the lobby and the users Map to decode the IDs
    });

    socket.on('get leaderboards', () => {

        fs.readFile('./DB/leaderboards.json', 'utf-8', function (err, data) {
            if (err) throw err
            let db = JSON.parse(data)
            let rankings = db.rankings;
            socket.emit('ranks', rankings)
        });
    });

    socket.on('write leaderboards', function (username, score, time) {

        fs.readFile('./DB/leaderboards.json', 'utf-8', function (err, data) {
            if (err) throw err
            let db = JSON.parse(data)
            let rankings = db.rankings;

        });
    });





    socket.on("check if username taken", function (username, password) {
        // Callback
        console.log("username passed in: " + username);
        console.log("password passed in: " + password);

        fs.readFile('./DB/logins.json', 'utf-8', function (err, data) {
            if (err) throw err
            let db = JSON.parse(data)
            let found = false;
            for (let i = 0; i < db.accounts.length; i++) {
                //console.log("name in DB: " + (Object.values(db.accounts[i])[0]))
                if (username === Object.values(db.accounts[i])[0]) {
                    //console.log("name passed in: " + username);
                    found = true;
                    break;
                }
            }
            if (!found) {
                let account = {
                    username: username,
                    password: password
                }


                db.accounts.push(account);
                fs.writeFile('./DB/logins.json', JSON.stringify(db), 'utf-8', function (err, data) {
                    if (err) throw err;
                    console.log("Account created");
                })

            }
            socket.emit("check if username taken result", found); // Emits the result of whether the username was taken or not to client
        })
    });

    socket.on("checkUserPassword", function (username, password) {

        console.log("username passed in: " + username);
        console.log("password passed in: " + password);

        fs.readFile('./DB/logins.json', 'utf-8', function (err, data) {
            if (err) throw err
            let db = JSON.parse(data)
            let found = false;
            for (let i = 0; i < db.accounts.length; i++) {
                //console.log("name in DB: " + (Object.values(db.accounts[i])[0]))
                if (username === Object.values(db.accounts[i])[0]) {
                    //console.log("name passed in: " + username);
                    if (password === Object.values(db.accounts[i])[1]) {
                        console.log("found");
                        found = true;
                        break;
                    }
                }
            }
            console.log(found)
            socket.emit("verify account", found); // Emits the result of whether the username was taken or not to client
        });
    })

    socket.on('send game invite', (userID) => {
        let recipientSocket = sockets[userID]; // Gets the socket associated with the invite's recipient
        recipientSocket.emit('load game invite', users[socket], socket.id) // Passes the username and ID of who invited them to join a game
    });

    socket.on('disconnect', () => {
        console.log(`${users[id]} has disconnected`);

        users[id] = undefined; // Removes the user from the list of Key Value pairs mathing IDs to screen names
        socket[id] = undefined; // Removes socket from list of sockets
        removeFromWaitingRoom(id);
        removeFromLobby(id);
    })
});

server.listen(process.env.PORT || 3000, () => {
    console.log("Listening");
});

/**
 * Given 2 socket IDs, creates a new Match and begins the game
 * @param {string} socket1 ID of the first socket
 * @param {string} socket2 ID of the second socket
 */
function createGame(socket1, socket2) {
    socket1.leave("lobby");
    socket2.leave("lobby");
    removeFromWaitingRoom(socket1); // Removes Player 1 from the waiting room
    removeFromLobby(socket1)
    removeFromWaitingRoom(socket2) // Removes Player 2 from the waiting room
    removeFromLobby(socket2);
    let newMatch = new Match(socket1, socket2);
    matches.push(newMatch); // Adds the new Match to the list of matches
    // Notifies the client-facing code that the game is starting and what role their player has
    socket1.emit('game starting', 'player1');
    socket2.emit('game starting', 'player2');
    newMatch.controller.notifyViews();
    newMatch.controller.startGame();
}

/**
 * Removes a socket (user) from the waiting room
 * @param {string} userID the ID of a given socket
 */
function removeFromWaitingRoom(userID) {
    waitingRoom = waitingRoom.filter(function (value, index) { return value != userID });
    console.log(`Removed ${users[userID]} from the waiting room`);
}

function removeFromLobby(userID) {
    lobby = lobby.filter(function (value, index) { return value != userID });
}



