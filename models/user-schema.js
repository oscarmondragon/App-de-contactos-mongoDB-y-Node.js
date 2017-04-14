'use strict';
var email_match = [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Coloca un email valido"];
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