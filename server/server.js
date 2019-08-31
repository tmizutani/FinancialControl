var http = require('http');

/*
http.createServer(app).listen(3000, function() {
	console.log('Servidor iniciado');
});


*/

/*
var express = require('express');

var app = express();

var PORT = 3000;

app.get('/', function(req, res) {
   
    res.status(200).send("Hello World");
    
});

app.listen(PORT, function() {
   
    console.log("Server is running on PORT: ", PORT);
    
});
*/

var app = require('./config/express');

http.createServer(app).listen(3000, function() {
	console.log('Servidor iniciado');
});
