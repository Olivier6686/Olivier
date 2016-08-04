var server = require("./server");
var route  = require("./router");
var requestHandlers = require("./requestHandlers");
var url = require("url");
var querystring = require('querystring');
var express = require('express');
var app = express();
var pathname = __dirname;

var handle = {};
handle["/login"] = requestHandlers.Login;
handle["/GetStoresByName"] = requestHandlers.GetStoresByName;
handle["/GetMenuByStoreID"] = requestHandlers.GetMenuByStoreID;
handle["/EstablishOrder"] = requestHandlers.EstablishOrder;
handle["/GetOrderFormsByID"] = requestHandlers.GetOrderFormsByID;
handle["/UpateOrderFormAttendance"] = requestHandlers.UpateOrderFormAttendance;
handle["/GetStores"] = requestHandlers.GetStores;

app.use('/Main', express.static('D:\\Git\\Olivier\\MitakeDinBenDon\\MitakeDinBenDon'));


var myParamter = function (req, res, next) {
    var postData = "";
    var pathname = url.parse(req.url).pathname;
    var query = url.parse(req.url).query;
    var json = querystring.parse(query);

    var data = {};
    data.handle = handle;
    data.request = req;
    data.response = res;    
    data.pathname = pathname;
    data.query = query;
    req.data = data;

    next();
};

app.use(myParamter);


app.get('/', function (req, res) {    
    req = req;
});

app.post('/login', function (req, res) {
    var data = req.data;
    handle["/login"](data);
});

app.get('/GetStoresByName', function (req, res) {    
    var data = req.data;
    handle["/GetStoresByName"](data);
});

app.get('/GetMenuByStoreID', function (req, res) {    
    var data = req.data;
    handle["/GetMenuByStoreID"](data);
});

app.post('/EstablishOrder', function (req, res) {
    var data = req.data;
    handle["/EstablishOrder"](data);
});

app.get('/GetOrderFormsByID', function (req, res) {    
    var data = req.data;
    handle["/GetOrderFormsByID"](data);
});

app.post('/UpateOrderFormAttendance', function (req, res) {
    var data = req.data;
    handle["/UpateOrderFormAttendance"](data);
});

app.get('/GetStores', function (req, res) {      
    var data = req.data;
    handle["/GetStores"](data);
});

app.listen(3000);
//server.start(route.route, handle);
