const path = require('path');
const express = require('express');

const app = express();
const port = process.env.port || 3000;

app.use(express.static(path.join(__dirname, '../public')));



app.listen(port, () => {
    console.log(`listening on port ${port}`);
});