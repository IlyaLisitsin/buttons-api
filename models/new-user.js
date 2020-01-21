const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const NewUserSchema = new Schema({
    username: String,
    id: String,
    avatarId: String,
}, { collection: 'new-user-info', versionKey: false });

module.exports = mongoose.model('NewUser', NewUserSchema, 'new-user-info');
