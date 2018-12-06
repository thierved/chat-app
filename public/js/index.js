const socket = io();

socket.on('connect', () => {
    console.log('connected to server.');

    socket.on('newMessage', data => {
        const li = $('<li></li>');
        li.text(`${data.from}: ${data.text}`);

        $('#messages').append(li);
    });
});


socket.on('disconnect', () => {
    console.log('disconnected to server.');
});


$('#user-input-form').on('submit', e => {
    e.preventDefault();

    socket.emit('createdMessage', {
        from: 'madian',
        text: $('[name=message]').val()
    }, () => {

    });
});