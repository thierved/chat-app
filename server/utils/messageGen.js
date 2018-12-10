const moment = require('moment');

const messageGenerator = (from, text) => {
    return {
        from,
        text,
        createdAt: moment.valueOf()
    }
};

const messageLocationGenerator = (from, latitude, longitude) => {
    return {
        from,
        url: `https://www.google.com/maps?q=${latitude},${longitude}`,
        createdAt: moment.valueOf()
    };
}

module.exports = {messageGenerator, messageLocationGenerator};