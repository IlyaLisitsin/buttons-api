const { uploadToBucket } = require('../services/upload-to-bucket');
const { getUserInfo } = require('../services/get-user-info');
const { removeUserInfo } = require('../services/remove-user-info');

const setupSave = function (bot) {
    bot.action('save', async (ctx) => {
        const info = await getUserInfo({ id: ctx.update.callback_query.message.date });
        if (info) {
            const { username, avatarId } = info;

            await uploadToBucket({
                audioId: ctx.update.callback_query.message.voice.file_id,
                avatarId,
                username,
            });

            await removeUserInfo({ id: ctx.update.callback_query.message.date, username });
            await ctx.deleteMessage();
        } else {
            await ctx.deleteMessage();
        }
    });
};

module.exports = { setupSave };
