PageServer
==========

Simple Serrver for serving static pages and files out of a specified directory

## Installation 

	npm install pageserver

## Usage


	var pageServer = require( 'pageserver' );

	var server = pageServer({

		port : 8079,
		path : __dirname + '/www_root'
	});

	server.on( 'error' , function(){

		console.log( 'error:' , arguments );
	} );


## Notes:

This module is under development

## License 

MIT