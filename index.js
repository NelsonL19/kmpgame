const Match = require('./engine/controller/Match').matchClass;
const express = require('express');
const app = express()
const http = require('http').createServer(app);
const path = require('path');
const io = require('socket.io')(http);


let users = {} // Key, Value pairs where the Key is the Socket ID and the value is the screen name
let sockets = {} // Key, Value pairs where the Key is the Socket ID and the value is the associated socket object
let waitingRoom = new Array() // Purgatory, stores Socket IDs
let matches = new Array() // Array containing all the Match objects that are currently running 

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) { 
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
        users[id] = name;
        socket.join("lobby"); // Puts the user in the room "lobby"
        io.to("lobby").emit('new message', `${users[id]} has joined the lobby`);
    });

    socket.on('join waiting room', () => {
        waitingRoom.push(id); // Adds user to the waiting room
        console.log(`Added ${users[id]} to the waiting room`);
        let isWaiting = true // Indicates whether or not the user is in the waiting room. True by default
        if (waitingRoom.length == 2) { // If there's 2 people in the waiting room after adding the user, move them to a match
            isWaiting = false;
            let player1Socket = sockets[waitingRoom[0]]; // Socket object representing Player 1
            let player2Socket = sockets[waitingRoom[1]]; // Socket object representing Player 2
            waitingRoom.pop() // Removes Player 1 from the waiting room
            waitingRoom.pop() // Removes Player 2 from the waiting room
            let newMatch = new Match(player1Socket, player2Socket) // Creates a new Match object
            matches.push(newMatch); // Adds the new Match to the list of matches
            // Notifies the client-facing code that the game is starting and what role their player has
            player1Socket.emit('game starting', 'player1');
            player2Socket.emit('game starting', 'player2');
            newMatch.controller.notifyViews();
            newMatch.controller.startGame();
        }
    });

    socket.on('leave waiting room', () => {
        removeFromWaitingRoom(id);
    });

    /**
     * When server is told a player made a move
     */
    socket.on('move', direction => {
        let currentMatch = matches.filter(value => {return (value.player1Socket == socket) || (value.player2Socket == socket);})[0]; // Gets the Match object the Socket belongs too
        let isEnemy = currentMatch.player2Socket == socket; // get whether or not the socket is the player or the enemy
        currentMatch.controller.move(isEnemy, direction); // tells Controller to make move
    })

    /**
     * When server is told a user sent a message in chat
     */
    socket.on('message sent', function(message) {
        let name = users[socket.id] // Gets the username associated with the socket
        let messageBody = `${name}: ${message}`;
        io.to('lobby').emit('new message', messageBody); // Emits ONLY to sockets in the lobby that a new message was sent
    });


    socket.on('disconnect', () => {
        console.log(`${users[id]} has disconnected`);
        
        users[id] = undefined; // Removes the user from the list of Key Value pairs mathing IDs to screen names
        socket[id] = undefined; // Removes socket from list of sockets
        removeFromWaitingRoom(id);
    })
});
 
http.listen(process.env.PORT || 3000, () => {
    console.log("Listening");
});

/**
 * Removes a socket (user) from the waiting room
 * @param {string} userID the ID of a given socket
 */
let removeFromWaitingRoom = function (userID) {
    waitingRoom = waitingRoom.filter(function (value, index) {return value != userID});
    console.log(`Removed ${users[userID]} from the waiting room`);
}