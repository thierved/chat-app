const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {messageGenerator} = require('./utils/messageGen');

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;
const io = socketIO(server);

app.use(express.static(path.join(__dirname, '../public')));

io.on('connection', socket => {
    console.log('new connection.');

    socket.emit('newMessage', messageGenerator('Admin', 'welcome to the hood'));

    socket.broadcast.emit('newMessage', messageGenerator('admin', 'new user connected.'))

    socket.on('createdMessage', (data, callback) => {
        callback('I love node.');
        io.emit('newMessage', messageGenerator(data.from, data.text));
    });

    socket.on('disconnection', socket => {
        console.log('disconnected.');
    });
});

server.listen(port, () => {
    console.log(`listening on port ${port}`);
});