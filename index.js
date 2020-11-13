const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

let users = {} // Key, Value pairs where the Key is the Socket ID and the value is the Username 
let matches = new Array() // Array containing all the Match objects that are currently running 

app.get('/', (request, response) => { // Serves HTML file
    response.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    socket.on('set username', function(name) {
        users[socket.id] = name //adds key value pair to users
    });
});