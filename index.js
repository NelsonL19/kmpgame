const Match = require('./engine/controller/Match').matchClass;
const express = require('express');
const app = express()
const http = require('http').createServer(app);
const path = require('path');
const io = require('socket.io')(http);


let screenNames = {} // Key, Value pairs where the Key is the Socket ID and the value is the screen name
let sockets = {} // Key, Value pairs where the Key is the Socket ID and the value is the associated socket object
let waitingRoom = new Array() // Purgatory
let matches = new Array() // Array containing all the Match objects that are currently running 

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) { 
    res.sendFile(path.join(__dirname + '/index.html'));
});

/**
 * When a new user connects to the server
 */
io.on('connection', (socket) => { // Listens for a new user (represented by socket) has connected to server
    let id = socket.id;
    sockets[id] = socket // adds socket to the list of sockets

    console.log(`User: ${id} has connected!`);

    socket.on('set screen name', (name) => { // When the User submits the screen name to be associated with their ID
        screenNames[id] = name;
        waitingRoom.push(id); // Adds user to the waiting room

        console.log(JSON.stringify(screenNames));
        
        let isWaiting = true // Indicates whether or not the user is in the waiting room. True by default
        
        if (waitingRoom.length == 2) { // If there's 2 people in the waiting room after adding the user, move them to a match
            isWaiting = false;
            let player1Socket = sockets[waitingRoom[0]]; // Socket object representing Player 1
            let player2Socket = sockets[waitingRoom[1]]; // Socket object representing Player 2
            waitingRoom.pop() // Removes Player 1 from the waiting room
            waitingRoom.pop() // Removes Player 2 from the waiting room
            let newMatch = new Match(player1Socket, player2Socket) // Creates a new Match object
            matches.push(newMatch); // Adds the new Match to the list of matches
        }
        socket.emit('screen name set', isWaiting); // Tells the client that the username has been set and whether or not they're in the waiting room
    });

    socket.on('disconnect', () => {
        console.log(`${screenNames[id]} has disconnected`);
        screenNames[id] = undefined; // Removes the user from the list of Key Value pairs mathing IDs to screen names
        socket[id] = undefined; // Removes socket from list of sockets
        removeFromWaitingRoom(id);
    })
});
 
http.listen(3000, () => {
    console.log("Listening");
});

/**
 * Removes a socket (user) from the waiting room
 * @param {string} userID the ID of a given socket
 */
let removeFromWaitingRoom = function (userID) {
    waitingRoom = waitingRoom.filter(function (value, index) {return value != userID});
}