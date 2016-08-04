var server = require("./server");
var route  = require("./router");
var requestHandlers = require("./requestHandlers");
//var express = require('express');
//var app = express();
//var pathname = __dirname;

var handle = {};
handle["/login"] = requestHandlers.Login;
handle["/GetStoresByName"] = requestHandlers.GetStoresByName;
handle["/GetMenuByStoreID"] = requestHandlers.GetMenuByStoreID;
handle["/EstablishOrder"] = requestHandlers.EstablishOrder;
handle["/GetOrderFormsByID"] = requestHandlers.GetOrderFormsByID;
handle["/UpateOrderFormAttendance"] = requestHandlers.UpateOrderFormAttendance;
handle["/GetStores"] = requestHandlers.GetStores;

//app.use('/static', express.static('D:\\Git\\Tasty\\MitakeDinBenDon'));

//app.get('/', function (req, res) {
    //res.send('Hello World!');
//});

//app.listen(8888);
server.start(route.route, handle);
