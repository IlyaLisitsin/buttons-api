const { httpGet } = require('./helpers');

const { SavedUser } = require('../models');

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

    // const fileUrl = await JSON.parse(fileRequest).result.file_path;
    const fileContent = await httpGet(`https://api.telegram.org/file/bot${process.env.TG_TOKEN}/${audioUrl}`);

    const params = {
        Bucket: 'button-audio',
        Key: username,
        Body: fileContent
    };

    s3.upload(params, function(err, data) {


        if (err) console.log(err);
        else console.log(`File uploaded successfully. ${data.Location}`);
    });

    SavedUser.find({ username }).then((data) => {
        const newSavedUser = { audioUrl, avatarUrl, username };
        if (!data.length) {
            new SavedUser(newSavedUser).save()
                .then(() => console.log(`Username "${username}" successfully added`));
        } else {
            SavedUser.updateOne({ username }, { audioUrl, avatarUrl }, { new: true })
                .then(() => console.log(`Username "${username}" successfully updated`));
        }
    }).catch(err => console.log(`User upload failed with ${err}`));
};

module.exports = { uploadToBucket };
