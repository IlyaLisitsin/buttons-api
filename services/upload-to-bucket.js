const { httpGet } = require('./helpers');

async function getFileUrl(fileId) {
    const fileRequest = await httpGet(`https://api.telegram.org/bot${process.env.TG_TOKEN}/getFile?file_id=${fileId}`);
    const fileUrl = await JSON.parse(fileRequest).result.file_path;
    return fileUrl;
}

const AWS = require('aws-sdk');

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_KEY_ID,
    secretAccessKey: process.env.AWS_KEY,
    signatureVersion: 'v4',
    region: 'eu-central-1',
});

const uploadToBucket = async function ({ audioId, avatarId, username }) {
    const audioUrl = await getFileUrl(audioId);
    const avatarUrl = await getFileUrl(avatarId);
    const audioFileContent = await httpGet(`https://api.telegram.org/file/bot${process.env.TG_TOKEN}/${audioUrl}`);
    const avatarFileContent = await httpGet(`https://api.telegram.org/file/bot${process.env.TG_TOKEN}/${avatarUrl}`);

    await Promise.all([
        new Promise(resolve => s3.upload({
            Bucket: 'button-avatar',
            Key: `${username}.jpg`,
            Body: avatarFileContent,
        }, function(err, data) {
            if (err) console.log(err);
            else {
                console.log(`Avatar of "${username}" uploaded successfully. ${data.Location}`);
                resolve();
            }
        })).catch(err => console.log(`Avatar upload of "${username}" failed with ${err}`)),
        new Promise(resolve => s3.upload({
            Bucket: 'button-audio',
            Key: `${username}.ogg`,
            Body: audioFileContent,
        }, function(err, data) {
            if (err) console.log(err);
            else {
                console.log(`Voice of "${username}" uploaded successfully. ${data.Location}`);
                resolve();
            }
        })).catch(err => console.log(`Voice upload of "${username}" failed with ${err}`))
    ]);
};

module.exports = { uploadToBucket };
