const { s3 } = require('../init/setup-aws');
const { httpGet } = require('./helpers');

const { SavedUser } = require('../models');

async function getFileUrl(fileId) {
    const fileRequest = await httpGet(`https://api.telegram.org/bot${process.env.TG_TOKEN}/getFile?file_id=${fileId}`);
    const fileUrl = await JSON.parse(fileRequest).result.file_path;
    return fileUrl;
}

const uploadToBucket = async function ({ audioId, avatarId, username }) {
    const audioUrl = await getFileUrl(audioId);
    const avatarUrl = await getFileUrl(avatarId);

    SavedUser.find({ username }).then((data) => {
        const newSavedUser = { audioUrl, avatarUrl, username };
        if (!data.length) {
            new SavedUser(newSavedUser).save();
        } else {
            SavedUser.updateOne({ username }, { audioUrl, avatarUrl }, { new: true }).then()
        }
    }).catch(err => console.log(`User upload failed with ${err}`));
};

module.exports = { uploadToBucket };
