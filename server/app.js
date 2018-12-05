const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;
const io = socketIO(server);

app.use(express.static(path.join(__dirname, '../public')));

io.on('connection', socket => {
    console.log('new connection.');

    socket.emit('newMessage',{
        from: 'hello@gmail.com',
        text: 'welcome to sillicon valey!',
        createdAt: new Date().getTime()
    });

    socket.on('createdMessage', data => {
        console.log('created email', data);
    });

    socket.on('disconnection', socket => {
        console.log('disconnected.');
    });
});

server.listen(port, () => {
    console.log(`listening on port ${port}`);
});