const { getUserInfo } = require('../services/get-user-info');
const { removeUserInfo } = require('../services/remove-user-info');

const setupDecline = function (bot) {
    bot.action('decline', async (ctx) => {
        const info = await getUserInfo({ id: ctx.update.callback_query.message.date });
        if (info) {
            await removeUserInfo({ id: ctx.update.callback_query.message.date, username: info.username });
        }

        try {
            ctx.deleteMessage();
        } catch (e) {
            console.log(e);
        }
    });
};

module.exports = { setupDecline };
