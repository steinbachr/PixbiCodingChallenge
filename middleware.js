/*
Our middleware must implement at least these three methods:

* createServer() - will create an instance of the web server which will be used to serve connections to clients
* use([optional]route, cb) - designates that the specified cb function should be invoked when route is requested by the client
* listen(port, cb) - designates that the web server should listen and respond to connections over the given port. The cb designates
  the action which should be taken once the server is ready to start accepting connections.

  Caveat: The implementations of use() and listen() are encapsulated in server.js
*/

module.exports = {
	createServer: function() {
		return require('./server');
	}
}