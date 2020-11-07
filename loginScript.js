$(function () {
    const socket = io();
    
    let $username = $('#username');
    let $submit = $('submit');

    $submit.on("click", () => {
        socket.emit('username set', $username.val()); // Tells server that a user submitted their screen name
    });
});