const express = require('express');
const socket = require('socket.io');
var app = express();

var server = app.listen(4000, () => {
    console.log('Server started on port 4000');
});

app.use(express.static('public'));

var io = socket(server);

io.on('connection', (socket) => {
        console.log("Connection made", socket.id);

        socket.on('chat', (data)=>{
        io.sockets.emit('chat', data);

        socket.on('typing', (data) => {
            socket.broadcast.emit('typing', data);
        })
    });
});