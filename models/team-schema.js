'use strict';
var email_match = [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Coloca un email valido"];
const mongoose = require('./model'),
    Schema = mongoose.Schema,
    TeamSchema = new Schema({
        _id: Schema.Types.ObjectId,
        name: String,
        phone: {
            type: String,
            required: true,
            maxlength: [11, "Telefono muy  grande "],
            minlength: [10, "Debe tener minimo 10 digitos"]
        },
        email: {
            type: String,
            required: "El correo es obligatorio",
            match: email_match
        },
        facebook: String
    }, {
        collection: 'contactos'
    }),
    Team = mongoose.model('Contactos', TeamSchema);
module.exports = Team;