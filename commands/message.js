const Extra = require('telegraf/extra');
const Markup = require('telegraf/markup');
const mongoose = require('mongoose');

const { SavedUser, NewUser } = require('../models');

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
            const profilePhotos = await ctx.telegram.getUserProfilePhotos(ctx.message.from.id, 0, 1);

            await saveNewUserInfo({
                username: ctx.message.from.username ? ctx.message.from.username : `_${Math.random().toString(36).substr(2, 9)}`,
                id: messageToAdmin.date,
                avatarId: profilePhotos.photos[0] ? profilePhotos.photos[0][2].file_id : 'AgADAgADqacxG_IZehqzzSEUSUdOlFXOuQ8ABAEAAwIAA2MAA3KsAAIWBA',
            });


            new Promise(resolve => {
                SavedUser.watch().on('change', data => {
                    if (data.operationType === 'update') resolve(data.operationType)
                })
            }).then(async () => {
                await ctx.reply('папе понравилось!');
                await wait(1000);
                await ctx.reply('смотри тут http://naprasnominsk.com/buttons');
            });
        }
    });
};

module.exports = { setupMessage };
