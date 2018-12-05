const socket = io();

socket.on('connect', () => {
    console.log('connected to server.');

    socket.on('newMessage', data => {
        console.log(data);
    });

    socket.emit('createdMessage', {
        from: 'h@m.fs',
        text: 'it works!'
    });
});

socket.on('disconnect', () => {
    console.log('disconnected to server.');
});

socket.on('newEmail', (data) => {
    console.log('new Email.', data);
});