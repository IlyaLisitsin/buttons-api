const { uploadToBucket } = require('../services/upload-to-bucket');
const { getUserInfo } = require('../services/get-user-info');
const { removeUserInfo } = require('../services/remove-user-info');
const { adminDecisionEmitter } = require('../services/admin-decision-event-emitter');

const setupSave = function (bot) {
    bot.action('save', async (ctx) => {
        const info = await getUserInfo({ id: ctx.update.callback_query.message.date });
        if (info) {
            const { username, avatarId } = info;

            const [avatarUrl, audioUrl] = await Promise.all([
                ctx.telegram.getFileLink(avatarId)
                    .catch(() => console.log(`Telegram failed to fetch avatar ${avatarUrl}`)),
                ctx.telegram.getFileLink(ctx.update.callback_query.message.voice.file_id)
                    .catch(() => console.log(`Telegram failed to fetch audio ${audioUrl}`))
            ]);

            await uploadToBucket({
                avatarUrl,
                audioUrl,
                username,
            });

            adminDecisionEmitter.emit('decision', { username, decision: 'save' });
            await removeUserInfo({ id: ctx.update.callback_query.message.date, username });
            await ctx.deleteMessage();
        } else {
            await ctx.deleteMessage();
        }
    });
};

module.exports = { setupSave };
