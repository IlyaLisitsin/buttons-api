require('dotenv').config();

const { bot } = require('./init/setup-bot');
const { setupMongoose } = require('./init/setup-mongo');

const { setupStart } = require('./commands/start');
const { setupMessage } = require('./commands/message');
const { setupSave } = require('./commands/save');
const { setupDecline } = require('./commands/decline');

const http = require('https');
const PORT = process.env.PORT || 5000;

function init() {
    setupMongoose().then(() => {
        setupStart(bot);
        setupMessage(bot);
        setupSave(bot);
        setupDecline(bot);

        return bot.launch()
    }).then(() => console.log('Bot launched successfully!'));

    http.createServer(function (req, res) {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write('kek');
        res.end();
    }).listen(PORT);
}

init();

process.on('exit', (code) => {
    console.log(`About to exit with code: ${code}`);
    init();
});

process.on('unhandledRejection', (code) => {
    console.log('BLYA POLOMALOS', code);
    init();
});

process.on('SIGTERM', (err, origin) => {
    console.log('SOOOOOOOOQ');
    http.get('https://buttons-tg-api.herokuapp.com/')
});
