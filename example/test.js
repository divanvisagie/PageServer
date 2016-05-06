var pageServer = require( '../lib/pageserver' );

console.log( pageServer );

var s = pageServer({

	port : 8079,
	path : __dirname + '/www_root'
});

var y = pageServer({

	port : 8080,
	path : __dirname + '/www_root'
});


console.log( s );

s.on( 'error' , function(){

	console.log( 'error:' , arguments );
} );
