const Extra = require('telegraf/extra');
const Markup = require('telegraf/markup');
// const mongoose = require('mongoose');
//
// const { UserInfo } = require('../models');

const { wait } = require('../services/helpers');
const { saveNewUserInfo } = require('../services/save-new-user-info');

const keyboard = Markup.inlineKeyboard([
    Markup.callbackButton('норм', 'save'),
    Markup.callbackButton('хуйня', 'decline')
]);

const setupMessage = function (bot) {
    bot.on('message', async (ctx) => {
        if (!ctx.message.voice) {
            await ctx.reply('это не голосовое');
            await wait(1000);
            await ctx.reply('а нужно голосовое');
        } else {
            ctx.reply('нужно показать папе');
            await wait(1000);
            ctx.reply('только он решает можно ли кому-то быть кнопочкой!');

            const messageToAdmin = await ctx.telegram.sendVoice('444209650', ctx.message.voice.file_id, Extra.markup(keyboard));
            const profilePhotos = await ctx.telegram.getUserProfilePhotos(ctx.message.from.id, 0, 1)

            await saveNewUserInfo({
                username: ctx.message.from.username,
                id: messageToAdmin.date,
                avatarId: profilePhotos.photos[0][2].file_id,
            });

            // ctx.telegram.getUserProfilePhotos(ctx.message.from.id, 0, 1).then(kek => console.log(kek.photos[0][2]))

            // mongoose.model('NewUser').on('change', async data => {
            //     console.log(data.operationType, data)
            //     if (data.operationType === 'delete') {
            //         console.log(data)
            //     }
            // })
        }
    });
};

module.exports = { setupMessage };
