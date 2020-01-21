const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const SavedUserSchema = new Schema({
    audioUrl: String,
    avatarUrl: String,
    username: String,
}, { collection: 'saved-user-info', versionKey: false });

module.exports = mongoose.model('SavedUser', SavedUserSchema);

//
// async function run() {
//     // Create a new mongoose model
//
//     const Person = mongoose.model('SavedUser', SavedUserSchema, 'saved-user-info');
//
//     // Create a change stream. The 'change' event gets emitted when there's a
//     // change in the database
//     Person.watch().
//     on('change', data => console.log(new Date(), data));
//
//     // Insert a doc, will trigger the change stream handler above
//     console.log(new Date(), 'Inserting doc');
//     await Person.create({ name: 'Axl Rose' });
// }
//
// run()
