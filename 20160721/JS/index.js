var server = require("./server");
var route  = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {};
handle["/login"] = requestHandlers.Login;

server.start(route.route, handle);
