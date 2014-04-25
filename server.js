/*
A naive web server implementation.
*/
var http = require('http');
var urls = require('url');
var httpServer = http.createServer();

module.exports = (function() {
	var routes = [];
	/* 
	this function is used to create the chain of callbacks for routes such that when next() is called from within a request callback, 
	the next matched routes' callback is triggered
	*/
	var createLinkedList = function(routes, request, response) {		
		for (var i = routes.length - 1 ; i >= 0 ; i--) {
			/* if we're at the last route and next is called, throw an exception */
			if (i === routes.length - 1) {
				routes[i].next = function() { throw "Can't call next, no more routes match" }
			} else {
				/* have to escape the closure */
				(function() {
					var j = i;				
					routes[j].next = function() {
						routes[j + 1].callback(request, response, routes[j + 1].next);
					};
				})();
			}
		}
	}

	/* setup request bindings */	
	httpServer.on('request', function(request, response) {
		console.log('new request incoming');

		/* get the routes that match the request url */
		var path = urls.parse(request.url).pathname;
		console.log('request path is ' + path);

		var matchedRoutes = routes.filter(function(r) {
			var patt = new RegExp(r.route);				
			return patt.test(path);
		});

		/* 
		if no matches found, return a 404 response		
		*/
		if (matchedRoutes.length === 0) {
			response.statusCode = 404;
			return response;
		} 		

		/* create a linked list from the matched routes such that next() will call the next link's callback */
		createLinkedList(matchedRoutes, request, response);		

		/* invoke the first matched routes' callback */
		matchedRoutes[0].callback(request, response, matchedRoutes[0].next);

		/* return the response object */
		return response;
	});

	/* begin export object */
	return {	
		use: function() {
			var callback = arguments[0],
				route = null;

			/* if the optional route parameter is supplied set the route and callback appropriately */
			if (arguments.length > 1) {
				route = arguments[0];
				callback = arguments[1];			
			}

			routes.push({
				route: route || "/",
				callback: callback
			});
		},

		listen: function(port, cb) {
			console.log("Starting connection over port " + port);		

			/* after connection created, invoke callback */
			httpServer.listen(port, function() { 
	  			cb();
			});		
		}
	}
})();	
