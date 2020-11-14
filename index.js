
const express = require('express');
const app = express()
const http = require('http').createServer(app);
const path = require('path');

const dir = "C:/Users/samum/Github Repository/kmpgame/kmpgame";

let users = {} // Key, Value pairs where the Key is the Socket ID and the value is the Username 
let matches = new Array() // Array containing all the Match objects that are currently running 

console.log(__dirname);

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) { 
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(3000, () => {
    console.log("Listening");
});