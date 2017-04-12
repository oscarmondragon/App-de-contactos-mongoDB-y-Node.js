'use strict';

const express = require('express'),
	pug = require('pug'),
	bodyParser = require('body-parser'),
	morgan = require('morgan'),
	restFul = require('express-method-override')('_method'),
	routes = require('./routes/team-router'),
	favicon = require('serve-favicon')(`${__dirname}/public/favicon.png`),
	publicDir = express.static(`${__dirname}/public`),
	viewDir = `${__dirname}/views`,
	port = (process.env.PORT || 8080);
var app = express();

app
	.set( 'views', viewDir )
	.set( 'view engine', 'pug' )
	.set( 'port', port )

	.use( bodyParser.json() )
	.use( bodyParser.urlencoded({ extended: false }) )
	.use( restFul )
	.use( publicDir )
	.use( favicon )
	.use( morgan('dev') )
	.use( routes );

module.exports = app;