const {messageGenerator} = require('./messageGen');

describe('messageGen', () => {
    it('should generate the correct object', () => {
        const from = 'thierno';
        const text = 'it works';
        const message = messageGenerator(from, text);


    });
});