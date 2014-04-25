/*
basic integrated testing
*/

var middleware = require('./middleware');
var server = middleware.createServer();

server.use(function(req, res, next) {
	res.write('a');
	next();
});

server.use("/hello", function(req, res, next) {
	res.write('b');
	next();
});

server.use(function(req, res) {
	res.end('hello');
});

server.listen(3000, function() {
	console.log('im listening over port 3000');
});