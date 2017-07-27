//Make a connection with the server side socket
var socket = io.connect("localhost:4000"); //this is the front end socket

//Taking input from the message sent
//Query DOM
var message = document.getElementById('message');
var handle = document.getElementById('handle');
var button = document.getElementById('send');
var output = document.getElementById('output');
var feedback = document.getElementById('feedback');

//Emit Events

button.addEventListener('click', () => {
    socket.emit('chat', {
        message : message.value,
        handle : handle.value
    });
});

//Listen on events

socket.on('chat', (data) => {
    feedback.innerHTML = '';
    message.value = '';
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});

message.addEventListener('keypress', () => {
    socket.emit('typing', handle.value);
});

socket.on('typing', (data) => {
    feedback.innerHTML = '<p><em>' + data + ' is typing...</em></p>';
});