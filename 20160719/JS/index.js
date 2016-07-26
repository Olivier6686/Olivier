var server = require("./server");
var route  = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {};
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;
handle["/show"] = requestHandlers.show;
handle["/show2"] = requestHandlers.show2;

//server.start(route.route, handle);
server.start2(route.route, handle);