const { getUserInfo } = require('../services/get-user-info');
const { removeUserInfo } = require('../services/remove-user-info');

const setupDecline = function (bot) {
    bot.action('decline', async (ctx) => {
        const info = await getUserInfo({ id: ctx.update.callback_query.message.date });
        if (info) {
            console.log('info in decline', info)
            removeUserInfo({ id: ctx.update.callback_query.message.date, username: info.username });
            ctx.deleteMessage();
        }
    });
};

module.exports = { setupDecline };
