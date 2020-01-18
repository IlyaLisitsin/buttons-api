const { NewUser } = require('../models');

const removeUserInfo = function ({ id }) {
    return new Promise((resolve, reject) => {
        NewUser.deleteOne({
            id
        }).then((data) => {
            if (data.deletedCount === 1) console.log(`User info of "${id}" successfully removed.`)
            else reject('Not found')
        })
    }).catch(err => console.log(`Remove action failed. ${err}`))
};

module.exports = { removeUserInfo };
