const express = require('express');
const app = express();
const channels = require('./data/channels.json');

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

app.use(express.static('public/'));

app.get('/', (req, res) => {
    res.render("index", {title: "home"});
});

app.get('/channels', (req, res) => {
    res.render("channels", {title: "channels", channels : channels});
});

app.get('/add', (req, res) => {
    res.render("form");
});

app.get('/users', (req, res) => {
    res.render("users", {title: "users"});
});

app.listen(3000, () => {
    console.log('listening on port 3000');
});