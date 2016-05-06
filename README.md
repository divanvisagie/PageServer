PageServer
==========
[![Build Status](https://travis-ci.org/divanvisagie/PageServer.svg?branch=master)](https://travis-ci.org/divanvisagie/PageServer)
[![NPM version](https://badge.fury.io/js/pageserver.png)](http://badge.fury.io/js/pageserver)
[![NGN Dependencies](https://david-dm.org/divanvisagie/PageServer.png)](https://david-dm.org/divanvisagie/PageServer)

Simple Light weight static file server

## Installation

```sh
npm install pageserver
```

## Usage
```js
var pageServer = require('pageserver');

var server = pageServer({
	port : 8079,
	path : __dirname + '/www_root'
});

server.on('error',function(){
  console.log( 'error:' , arguments );
});
```
pageServer supports a single paramater as an object with teh following properties:

| Property		   | Description							 		                 |
|----------------|-----------------------------------------------|
| port           | The port number you want to run the server on |
| path			 		 | Path to the folder you want to serve          |
| compress		   | Filestream compression ( defaults to true )   |


## License

#### MIT License

Copyright (C) 2012 Divan Visagie

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
