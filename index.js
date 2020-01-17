// const { botStart } = require('./bot');
//
// botStart();

const { setupStart } = require('./commands/start');
const { wait } = require('./helpers/wait');
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
const session = require('telegraf/session')
const AWS = require('aws-sdk');

const http = require('https');


const clientToken = '1054329519:AAGetgp6uQ3PPMtkfkH2Ou1K8FUmIUmPY_U';
const Telegraf = require('telegraf');

const bot = new Telegraf(clientToken);
bot.use(session())


const s3 = new AWS.S3({
    accessKeyId: 'AKIAJEGX3AMT2RJW4WGA',
    secretAccessKey: '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'
});

const httpGet = url => {
    return new Promise((resolve, reject) => {
        http.get(url, res => {
            const chunksArray = [];
            let length = 0;
            res.on('data', chunk => {
                chunksArray.push(chunk);
                length += chunk.length;
            });
            res.on('end', () => resolve(Buffer.concat(chunksArray), length));
        }).on('error', reject);
    });
};

// const kek = Buffer.from('kek')
// const kak = Buffer.from('kok')
//
// var res = Buffer.concat([kek, kak], kek.length + kak.length)

// console.log(res.toString())

// https://api.telegram.org/bot1054329519:AAGetgp6uQ3PPMtkfkH2Ou1K8FUmIUmPY_U/getFile?file_id=AwADAgADggYAAgXwAUmS2gfpSGOojxYE get link
// https://api.telegram.org/bot1054329519:AAGetgp6uQ3PPMtkfkH2Ou1K8FUmIUmPY_U/file/voice/file_0.oga get file

const voiceMap = {}

const keyboard = Markup.inlineKeyboard([
    Markup.callbackButton('норм', 'save'),
    Markup.callbackButton('хуйня', 'delete')
]);

setupStart(bot);
bot.on('message', async (ctx) => {
    if (!ctx.message.voice) {
        await ctx.reply('это не голосовое');
        await wait(1000);
        await ctx.reply('а нужно голосовое');
    } else {
        ctx.reply('нужно проверить');
        console.log(ctx.message.voice)
        const messageToAdmin = await ctx.telegram.sendVoice('444209650', ctx.message.voice.file_id, Extra.markup(keyboard));
        // console.log(3232432432, messageToAdmin)
        voiceMap[String(messageToAdmin.date)] = {
            username: ctx.message.from.username,
            fileId:  ctx.message.voice.file_id
        }
        // console.log(ctx.message)


        // const fileRequest = await httpGet(`https://api.telegram.org/bot1054329519:AAGetgp6uQ3PPMtkfkH2Ou1K8FUmIUmPY_U/getFile?file_id=${ctx.message.voice.file_id}`);
        // const fileUrl = await JSON.parse(fileRequest).result.file_path;
        //
        // const fileContent = await httpGet(`https://api.telegram.org/file/bot1054329519:AAGetgp6uQ3PPMtkfkH2Ou1K8FUmIUmPY_U/${fileUrl}`);
        //
        // const params = {
        //     Bucket: 'button-audio',
        //     Key: 'kek4.ogg', // File name you want to save as in S3
        //     Body: fileContent
        // };
        //
        // // Uploading files to the bucket
        // s3.upload(params, function(err, data) {
        //     if (err) {
        //         throw err;
        //     }
        //     console.log(`File uploaded successfully. ${data.Location}`);
        // });
    }

    // ctx.forwardMessage('444209650', '444209650', ctx.message.message_id);
    // ctx.message.voice
});

// bot.action('kek', (ctx) => {
bot.action('save', (ctx) => {
    console.log(voiceMap[ctx.update.callback_query.message.date])
    console.log(ctx.update.callback_query.message.voice.file_id)
    // console.log(ctx.update.callback_query.message.voice)
    // console.log(ctx.update)
});

bot.launch();


// { message_id: 260,
//     from:
//     { id: 444209650,
//         is_bot: false,
//         first_name: 'Ilya',
//         last_name: 'Ilya',
//         username: 'privetlisitsin',
//         language_code: 'en' },
//     chat:
//     { id: 444209650,
//         first_name: 'Ilya',
//         last_name: 'Ilya',
//         username: 'privetlisitsin',
//         type: 'private' },
//     date: 1579283421,
//         voice:
//     { duration: 1,
//         mime_type: 'audio/ogg',
//         file_id: 'AwADAgADZgUAAmfWEUmgJC4QUG3NdxYE',
//         file_unique_id: 'AgADZgUAAmfWEUk',
//         file_size: 3060 } }


