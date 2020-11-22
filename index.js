let Match = require('./engine/controller/Match').matchClass;
const express = require('express');
const app = express()
const server = require('http').createServer(app);
const path = require('path');
const io = require('socket.io')(server);
const fs = require('fs');
const { waitForDebugger } = require('inspector');

let users = {}; // Key, Value pairs where the Key is the Socket ID and the value is the screen name
let sockets = {}; // Key, Value pairs where the Key is the Socket ID and the value is the associated socket object
let lobby = new Array(); // Keeps track of which sockets are in the lobby
let waitingRoom = new Array(); // Purgatory, stores Socket IDs
let matches = { } // Key value pairs of Match object. Key is a unique ID associated with each Match and value is that Match object

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
        leaveLobby(socket);
        joinWaitingRoom(socket); // Adds user to the waiting room
        if (waitingRoom.length == 2) { // If there's 2 people in the waiting room after adding the user, move them to a match
            createGame(sockets[waitingRoom[0]], sockets[waitingRoom[1]]); // Calls helper method, passing the first 2 socket IDs in waiting room
        }
    });

    socket.on('leave waiting room', () => {
        leaveWaitingRoom(socket);
    });

    /**
     * When server is told a player made a move
     */
    socket.on('move', (id, direction) => {
        let isEnemy = matches[id].player2Socket == socket; // get whether or not the socket is the player or the enemy
        matches[id].controller.move(isEnemy, direction); // tells Controller to make move
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
        console.log("recieving request for users in lobby");
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

    socket.on('write leaderboards', function (username, time) {

        console.log("username passed in: " + username);
        console.log("time passed in: " + time);


        fs.readFile('./DB/leaderboards.json', 'utf-8', function (err, data) {
            if (err) throw err
            let db = JSON.parse(data)
            let rankings = db.rankings;

            let triggered = false;
            for (let i = 0; i < db.rankings.length; i++) {
                if (parseInt(time) < parseInt(Object.values(db.rankings[i])[1], 10)) {
                    console.log("better time");
                    db.rankings.splice(i, 0, { "name": username, "time": time });
                    fs.writeFile('./DB/leaderboards.json', JSON.stringify(db), 'utf-8', function (err, data) {
                        if (err) throw err;
                    });
                    triggered = true;
                    break;
                }
            }

            if (!triggered) {
                db.rankings.push({ "name": username, "time": time })
                fs.writeFile('./DB/leaderboards.json', JSON.stringify(db), 'utf-8', function (err, data) {
                    if (err) throw err;
                });
            }
            socket.emit("added to leaderboards"); // Emits the result of whether the username was taken or not to client
        });
    });

    socket.on("return to lobby", function () {
        joinLobby(socket);
        io.to("lobby").emit('new message', `${users[id]} has completed their game!`);
        socket.emit('new message', "Welcome Back! We hope you enjoyed your game!");
    });

    socket.on('game ended', (id) => {
        delete matches[id];
    });

    socket.on("check if username taken", function (username, password) {

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
                newPass = 0;
                let account = {
                    username: username,
                    password: password
                }


                db.accounts.push(account);
                fs.writeFile('./DB/logins.json', JSON.stringify(db), 'utf-8', function (err, data) {
                    if (err) throw err;
                    //console.log("Account created");
                })

            }
            socket.emit("check if username taken result", found); // Emits the result of whether the username was taken or not to client
        })
    });

    socket.on("checkUserPassword", function (username, password) {

        //console.log("username passed in: " + username);
        //console.log("password passed in: " + password);

        fs.readFile('./DB/logins.json', 'utf-8', function (err, data) {
            if (err) throw err
            let db = JSON.parse(data)
            let found = false;
            for (let i = 0; i < db.accounts.length; i++) {
                //console.log("name in DB: " + (Object.values(db.accounts[i])[0]))
                if (username === Object.values(db.accounts[i])[0]) {
                    //console.log("name passed in: " + username);
                    if (password === Object.values(db.accounts[i])[1]) {
                        //console.log("found");
                        found = true;
                        break;
                    }
                }
            }
            //console.log(found)
            socket.emit("verify account", found); // Emits the result of whether the username was taken or not to client
        });
    })

    socket.on('send game invite', (userID) => {
        let recipientSocket = sockets[userID]; // Gets the socket associated with the invite's recipient
        recipientSocket.emit('load game invite', users[socket.id], socket.id) // Passes the username and ID of who invited them to join a game
    });

    socket.on('accept invitation', (invitingUserID) => {
        createGame(sockets[invitingUserID], socket);
    });

    socket.on('decline invitation', (invitingUserID) => {
        console.log("Declining invitation");
        sockets[invitingUserID].emit('invitation declined');
    });

    socket.on('disconnect', () => {
        console.log("lobby: "+lobby);
        console.log("waiting room: "+waitingRoom);
        console.log("Socket ID: "+socket.id)
        if ((waitingRoom.indexOf(socket.id) == -1) && (lobby.indexOf(socket.id) == -1) && (users[socket.id] != undefined)) { // If socket not in the waiting room or the lobby, then it must be in a game
            console.log("in game");
            //TODO give win to other player in the match
            let match = Object.values(matches).filter(value => {
                return (value.player1Socket == socket) || (value.player2Socket == socket);
            })[0];
            match.game.isOver = true;

            if (match.player1Socket == socket) { // If the socket diconnecting was socket1, give win to socket2
                match.player2Socket.emit('game won', true, undefined, undefined, true);
            }
            else {
                match.player1Socket.emit('game won', true, undefined, undefined, true); // Else, socket disconnecting is socket2, so give win to socket1
            }
            
        }


        console.log(`${users[id]} has disconnected`);
        io.to("lobby").emit('new message', `${users[id]} has left the game!`);
        users[id] = undefined; // Removes the user from the list of Key Value pairs mathing IDs to screen names
        socket[id] = undefined; // Removes socket from list of sockets
        leaveWaitingRoom(socket);
        leaveLobby(socket);
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
function createGame (socket1, socket2) {
    leaveLobby(socket1);
    leaveLobby(socket2);
    leaveWaitingRoom(socket1); // Removes Player 1 from the waiting room
    leaveWaitingRoom(socket2); // Removes Player 2 from the waiting room
    let matchID = Date.now(); // Unique identifier
    console.log("Match ID: " + matchID);
    matches[matchID] = new Match(matchID, socket1, socket2); // Adds Key, Value pair
    // Notifies the client-facing code that the game is starting and what role their player has
    console.log("sending user: "+ socket1.id);
    console.log("sending user: "+ socket2.id);
    console.log("sending user: "+ socket1);
    console.log("sending user: "+ socket2);
    socket1.emit('game starting', matchID, 'player1', users[socket1.id], users[socket2.id]);
    socket2.emit('game starting', matchID, 'player2', users[socket2.id], users[socket1.id]);
    matches[matchID].controller.notifyViews();
    matches[matchID].controller.startGame();
}

function joinWaitingRoom (socket) {
    waitingRoom.push(socket.id); // Adds socket ID to list of IDs in the waiting room
}

function leaveWaitingRoom (socket) { // Removes socket ID from the list of IDs in the waiting room
    waitingRoom = waitingRoom.filter(function (value, index) { return value != socket.id });
}

function joinLobby(socket) {
    lobby.push(socket.id); // Adds socket ID to list of IDs in lobby
    socket.join("lobby"); // Adds socket to room "lobby"
}

function leaveLobby(socket) {
    lobby = lobby.filter(function (value, index) { return value != socket.id }); // Removes socket ID from the list of ID's in lobby
    socket.leave("lobby"); // Removes socket from room "lobby"
}



{ }