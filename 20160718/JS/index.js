var server = require("./server");
var route  = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {};
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/start2"] = requestHandlers.start2;
handle["/upload"] = requestHandlers.upload;
handle["/upload2"] = requestHandlers.upload2;

//server.start(route.route, handle);
server.start2(route.route2, handle);