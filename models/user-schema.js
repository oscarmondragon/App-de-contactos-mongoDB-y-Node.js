'use strict';
const mongoose = require('./model'),
    Schema = mongoose.Schema,
    UserSchema = new Schema({
        username: String,
        password: String
    }, {
        collection: 'usuarios'
    }),
    User = mongoose.model('Usuarios', UserSchema);
module.exports = User;