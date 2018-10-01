const express = require('express');
const app = express();

app.set('views', './views');

app.use(express.static('public'));

app.get('/hello', (req, res) => {
    res.render("channels.jade");
});

app.listen(3000, () => {
    console.log('listening on port 3000');
});