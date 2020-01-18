const { s3 } = require('../init/setup-aws');
const { httpGet } = require('./helpers');

const uploadToBucket = async function ({ bucketName, fileId, fileName }) {
    const fileRequest = await httpGet(`https://api.telegram.org/bot${process.env.TG_TOKEN}/getFile?file_id=${fileId}`);
    const fileUrl = await JSON.parse(fileRequest).result.file_path;
    const fileContent = await httpGet(`https://api.telegram.org/file/bot${process.env.TG_TOKEN}/${fileUrl}`);

    const params = {
        Bucket: bucketName,
        Key: fileName,
        Body: fileContent,
    };

    return new Promise((resolve, reject) => {
        s3.upload(params, function(err, data) {
            if (err) reject(err);


            resolve(data);
            console.log(`File uploaded successfully. ${data}`);
        });
    }).catch(err => console.log(`File upload failed with ${err}`))
};

module.exports = { uploadToBucket };
