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
            //
            // await uploadToBucket({
            //     fileId: ctx.update.callback_query.message.voice.file_id,
            //     bucketName: 'button-audio',
            //     fileName: `${username}.ogg`,
            // });
            //
            // await uploadToBucket({
            //     fileId: avatarId,
            //     bucketName: 'button-avatar',
            //     fileName: `${username}.jpg`,
            // });

            removeUserInfo({ id: ctx.update.callback_query.message.date });
            ctx.deleteMessage();
        }
    });
};

module.exports = { setupSave };
