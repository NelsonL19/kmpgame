$(function () {
    const socket = io('kmpunc.com');
    
    let $username = $('#username');
    let $submit = $('#submit');

    $submit.on("click", () => {
        alert($username.val());
        socket.emit('username set', $username.val()); // Tells server that a user submitted their screen name
    });
});