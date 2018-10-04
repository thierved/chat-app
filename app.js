const express = require('express');
const app = express();
let channels = require('./data/channels.json');
const bodyParser = require('body-parser');
const uuid = require('node-uuid');

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

app.use(bodyParser.urlencoded({extended: true}));
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

app.post('/add', (req, res) => {

    const channel = {
        channel: req.body.name,
        id: uuid.v4()
    }

    channels.push(channel);
    res.redirect('/channels');
});

app.get('/delete/:id', (req, res) => {
    channels = channels.filter(channel => channel.id !== req.params.id);
    res.redirect('/channels');
});

app.get('/users', (req, res) => {
    res.render("users", {title: "users"});
});

app.listen(3000, () => {
    console.log('listening on port 3000');
});