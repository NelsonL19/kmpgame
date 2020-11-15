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
});