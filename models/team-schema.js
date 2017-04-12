'use strict';

const mongoose = require('./model'),
	Schema = mongoose.Schema,
	TeamSchema = new Schema({
		_id : Schema.Types.ObjectId,
		name : String,
		phone : String,
		email : String,
		facebook : String
	},
	{
		collection : 'contactos'
	}),
	Team = mongoose.model('Contactos', TeamSchema);

module.exports = Team;