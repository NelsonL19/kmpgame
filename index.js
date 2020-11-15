const express = require('express');
const app = express()
const http = require('http').createServer(app);
const path = require('path');
const io = require('socket.io')(http);


let users = {} // Key, Value pairs where the Key is the Socket ID and the value is the Username 
let waitingRoom = new Array() // Purgatory
let matches = new Array() // Array containing all the Match objects that are currently running 

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) { 
    res.sendFile(path.join(__dirname + '/index.html'));
});

io.on('connection', (socket) => { // Listens for a new user (represented by socket) has connected to server
    let id = socket.id;

    console.log(`User: ${id} has connected!`);

    socket.on('set screen name', (name) => { // When the User submits the screen name to be associated with their ID
        users[id] = name;
        waitingRoom.push(id); // Adds user to the waiting room

        console.log(JSON.stringify(users));
        
        let isWaiting = true // Indicates whether or not the user is in the waiting room. True by default
        
        if (waitingRoom.length == 2) { // If there's 2 people in the waiting room after adding the user, move them to a match
            isWaiting = false;
            /**
             * TODO: Add code here that'll move the users in the waiting room into a new Match
             */
        }
        socket.emit('screen name set', isWaiting); // Tells the client that the username has been set and whether or not they're in the waiting room
    });

    socket.on('disconnect', () => {
        console.log(`${users[id]} has disconnected`);
        users[id] = undefined; // Removes the user from the list of Key Value pairs mathing IDs to screen names
        waitingRoom = waitingRoom.filter(function (value, index) {return value != id}); // Removes the user from the waiting room
    })
});

http.listen(3000, () => {
    console.log("Listening");
});