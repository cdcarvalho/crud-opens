var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    login: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    email: String
});

module.exports = mongoose.model('User', UserSchema);