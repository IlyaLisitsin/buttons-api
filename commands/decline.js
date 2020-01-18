const { getUserInfo } = require('../services/get-user-info');
const { removeUserInfo } = require('../services/remove-user-info');

const setupDecline = function (bot) {
    bot.action('decline', async (ctx) => {
        const info = await getUserInfo({ id: ctx.update.callback_query.message.date });

        if (info) {
            removeUserInfo({ id: ctx.update.callback_query.message.date });
            ctx.deleteMessage();
        }
    });
};

module.exports = { setupDecline };
