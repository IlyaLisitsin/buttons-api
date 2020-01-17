const { wait } = require('../helpers/wait');

const setupStart = function (bot) {
    bot.start(async (ctx) => {
        await ctx.reply('Если бы ты был кнопочкой, то какой звук издавал бы при нажатии?');
        await wait(1000);
        await ctx.reply('запиши голосовое!');
    });
};

module.exports = { setupStart };
