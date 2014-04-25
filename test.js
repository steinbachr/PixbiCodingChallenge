/*
basic integrated testing
*/

var middleware = require('./middleware');
var server = middleware.createServer();

/** 404 test
server.use('/never-guess-me', function(req, res) {
	res.end('prolly gonna be a 404');
});
**/

/** Multiple writes same callback test
server.use(function(req, res, next) {
	res.write('a');
	res.write('b');
	next();
});
**/

/** Try Next With Nowhere to go test
server.use(function(req, res, next) {
	next();
});
**/

/**-- Above Tests Rely On Below Tests Being Commented Out --**/

server.use(function(req, res, next) {
	res.write('a');
	next();
});

server.use("/hello", function(req, res, next) {
	res.write('b');
	next();
});

server.use(function(req, res, next) {
	res.write('c');
	next();
});

server.use("/end", function(req, res, next) {
	res.end('I le tired');
});

server.use(function(req, res) {
	res.end('hello');
});

server.use(function(req, res, next) {
	res.end('I should never get here');
});

server.listen(3000, function() {
	console.log('im listening over port 3000');
});