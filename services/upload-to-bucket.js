const { httpGet } = require('./helpers');

const AWS = require('aws-sdk');

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_KEY_ID,
    secretAccessKey: process.env.AWS_KEY,
    signatureVersion: 'v4',
    region: 'eu-central-1',
});

const uploadToBucket = async function ({ audioUrl, avatarUrl, username }) {
    [audioFileContent, avatarFileContent] = await Promise.all([
        httpGet(audioUrl),
        httpGet(avatarUrl),
    ]);

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
