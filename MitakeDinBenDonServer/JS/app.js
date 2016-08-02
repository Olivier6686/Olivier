var server = require("./server");
var route  = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {};
handle["/login"] = requestHandlers.Login;
handle["/GetStoresByName"] = requestHandlers.GetStoresByName;
handle["/GetMenuByStoreID"] = requestHandlers.GetMenuByStoreID;
handle["/EstablishOrder"] = requestHandlers.EstablishOrder;

server.start(route.route, handle);
