'use strict';

const express = require('express'),
	pug = require('pug'),
	bodyParser = require('body-parser'),
	session = require('express-session'),
	morgan = require('morgan'),
	restFul = require('express-method-override')('_method'),
	errors = require('./middlewares/errors'),
	users = require('./routes/user-router'),
	routes = require('./routes/team-router'),
	favicon = require('serve-favicon')(`${__dirname}/public/favicon.png`),
	publicDir = express.static(`${__dirname}/public`),
	viewDir = `${__dirname}/views`,
	optSession = {
		secret: 'shhhhhh',
		saveUnitialized : true,
		resave : true
	},
	port = (process.env.PORT || 8080);
var app = express();

app
	.set( 'views', viewDir )
	.set( 'view engine', 'pug' )
	.set( 'port', port )
	.use(session(optSession))
	.use( bodyParser.json() )
	.use( bodyParser.urlencoded({ extended: false }) )
	.use( restFul )
	.use( publicDir )
	.use( favicon )
	.use( morgan('dev') )
	.use( users)
	.use( routes )
	.use(errors.http404);

module.exports = app;