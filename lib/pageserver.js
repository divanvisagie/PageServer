var http = require( 'http' ),
	url = require( 'url' ),
	fs = require( 'fs' ),
	events = require( 'events' ),
	util = require( 'util' ),
	oppressor = require( 'oppressor' ),
	mime = require( 'mime' );

/*
	pageServer takes a configuration object as a parameter and creates a
	server for static web pages by searching in the specified directory for
	requested files.
*/
function PageServer( config ){

	var ev = new events.EventEmitter();

	/* Diplays the cannot be found message if 404 occurs */
	function pageError( response ){

		console.log( 'pageerr' );

		response.writeHead( 404, { 'Content-Type' : 'text/html' } );

		var errpath = __dirname +  '/page_error.html';

		fs.exists( errpath, function( exists ){

			if( exists ){

				console.log( 'exists' , errpath );
				var fileStream = fs.createReadStream( errpath );
				fileStream.pipe( response );
			}
			else{

				response.end( '404 , page not found' );
			}
		} );
	}

	/* Evaluate the config to make sure everything is ok */

	if ( !config.port ){
		ev.emit( 'error', 'PageServer requires a port' );
	}
	else if ( !config.path ){
		ev.emit( 'error', 'PageServer requires a path' );
	}

	if( !config.hasOwnProperty( 'compress' ) ){ /* Default compression to true */

		config.compress = true;
	}

	if( config.port && config.path ){
		http.createServer( function( request, response ){

			var uri = url.parse(request.url).pathname;

			if( uri === '/' ) uri += 'index.html';

			var filepath = config.path + uri;

			/* Check if the requested file exists */
			fs.exists( filepath, function( exists ) {

				if( !exists ){
					console.log( filepath + ' does not exist' );

					/* Handle 404 if requested page does not exist */
					response.writeHead(404, {'Content-Type': 'text/plain'});

					if(!config.error_page){
						pageError( response );
					}
					else{
						var err_page_path = config.path + config.error_page;
						console.log( 'error page path'.cyan + err_page_path );
						fs.exists( err_page_path, function( exists ){

							if( exists ){
								console.log( 'found error page' );

								var fileStream = fs.createReadStream( err_page_path );
								fileStream.pipe( response );
							}
							else{
								/* 404 inception occurs when the custom 404 page cannot be found */
								pageError( response );
							}
						} );
					}
				}else{

					/* Get the mime type */
					var type = mime.lookup( filepath );

					var fileStream = fs.createReadStream( filepath );

					if( config.compress ){
						fileStream.pipe( oppressor( request ) ).pipe( response );
					}
					else{
						response.writeHead( 200, { 'Content-Type' : type } );
						fileStream.pipe( response );
					}
				}
			} );
		} ).listen( config.port );
		return ev;
	}
}

module.exports = PageServer;