const socket = io();
const locationButton = $('#location');
const messageInput = $('[name=message]');

socket.on('connect', () => {
    console.log('connected to server.');

    socket.on('newMessage', data => {
        const li = $('<li></li>');
        li.text(`${data.from}: ${data.text}`);

        $('#messages').append(li);
    });
});

socket.on('newLocationMessage', data => {
    const li = $('<li></li>');
    const a = $('<a target="_blank">My Location</a>')

    li.text(`${data.from}: `);
    a.attr('href', data.url);
    li.append(a);

   $('#messages').append(li); 
});


socket.on('disconnect', () => {
    console.log('disconnected to server.');
});


$('#user-input-form').on('submit', e => {
    e.preventDefault();

    socket.emit('createdMessage', {
        from: 'User',
        text: messageInput.val()
    }, () => {
        messageInput.val('');
    });
});

locationButton.on('click', () => {
    if (!navigator.geolocation) {
        return alert('Geolocation unavailable in your browser.');
    }

    locationButton.attr('disabled', 'disabled').text('Sending location...');
    navigator.geolocation.getCurrentPosition(position => {

        locationButton.removeAttr('disabled');

        socket.emit('createLocation', {
            longitude: position.coords.longitude,
            latitude: position.coords.latitude
        });
    }, () => {
        locationButton.removeAttr('disabled');
        console.log('can\'t find location');
    });
});