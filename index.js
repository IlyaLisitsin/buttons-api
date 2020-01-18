require('dotenv').config();

const { bot } = require('./init/setup-bot');
const { setupMongoose } = require('./init/setup-mongo');

const { setupStart } = require('./commands/start');
const { setupMessage } = require('./commands/message');
const { setupSave } = require('./commands/save');
const { setupDecline } = require('./commands/decline');

setupMongoose().then(() => {
    setupStart(bot);
    setupMessage(bot);
    setupSave(bot);
    setupDecline(bot);

    return bot.launch()
}).then(() => console.log('Bot launched successfully!'));
