const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;
const io = socketIO(server);
const {messageGenerator} = require('./utils/messageGen');

app.use(express.static(path.join(__dirname, '../public')));

io.on('connection', socket => {
    console.log('new connection.');

    socket.emit('newMessage', messageGenerator('Admin', 'welcome to the hood'));

    socket.broadcast.emit('newMessage', messageGenerator('admin', 'new user connected.'))

    socket.on('createdMessage', (data, callback) => {
        callback('I love node.');
        io.emit('newMessage', messageGenerator(data.from, data.text));
    });

    socket.on('createLocation', coords => {
        io.emit('newMessage', messageGenerator('admin', `${coords.latitude}, ${coords.longitude}`))
    });

    socket.on('disconnection', socket => {
        console.log('disconnected.');
    });
});

server.listen(port, () => {
    console.log(`listening on port ${port}`);
});