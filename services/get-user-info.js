const { NewUser } = require('../models');

const getUserInfo = function ({ id }) {
    return NewUser.findOne({
        id
    }).catch(e => console.log(e))
};

module.exports = { getUserInfo };
