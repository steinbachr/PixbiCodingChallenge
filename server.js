/*
A naive web server implementation.
*/
var net = require('net');
var nodeServer = net.createServer(function(c) { //'connection' listener    
  c.pipe(c);
});

module.exports = {	
	use: function() {
		var callback = arguments[0],
			route = null;

		/* if the optional route parameter is supplied set the route and callback appropriately */
		if (arguments.length > 1) {
			route = arguments[0];
			callback = arguments[1];			
		}
	},

	listen: function(port, cb) {
		console.log("Starting connection over port " + port);		

		/* after connection created, invoke callback */
		nodeServer.listen(port, function() { 
  			cb();
		});		
	}
}