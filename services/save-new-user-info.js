const { NewUser } = require('../models');

const saveNewUserInfo = function({ username, id, avatarId }) {
    return new Promise(resolve => {
        new NewUser({ username, id, avatarId }).save()
            .then((data) => {
                resolve(data);
                console.log(`User info of "${data.username}" successfully saved.`);
            })
            .catch(err => console.log(`User info save failed. ${err}`))
    })
};

module.exports = { saveNewUserInfo };
