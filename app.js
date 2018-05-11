'use strict'
var http 			= require('http'),
	config 			= require('./config'),
	expressServer 	= require('./app/expressServer');

//express app
var app = new expressServer();

//server
var server = http.createServer(app.server);

//socket start
var io	= require('socket.io').listen(server)

app.socket(io)


//http server
server.listen(process.env.PORT || config.server.port, function(){
	console.log('corriendo en el puerto ' + config.server.port);
});
