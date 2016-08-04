var server = require("./js/server");
var route  = require("./js/router");
var requestHandlers = require("./js/requestHandlers");
var url = require("url");
var querystring = require('querystring');
var express = require('express');
var app = express();
var pathname = __dirname;
var port = 8889;

var handle = {};
handle["/login"] = requestHandlers.Login;
handle["/GetStoresByName"] = requestHandlers.GetStoresByName;
handle["/GetMenuByStoreID"] = requestHandlers.GetMenuByStoreID;
handle["/EstablishOrder"] = requestHandlers.EstablishOrder;
handle["/GetOrderFormsByID"] = requestHandlers.GetOrderFormsByID;
handle["/UpateOrderFormAttendance"] = requestHandlers.UpateOrderFormAttendance;
handle["/GetStores"] = requestHandlers.GetStores;
handle["/GetStoreByID"] = requestHandlers.GetStoreByID;


app.use('/Main', express.static(pathname.replace('MitakeDinBenDonServer', 'MitakeDinBenDon')));

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
    
    if (req.method === 'GET') {
        data.query = query;
        req.data = data;
        next();
        return;
    }
    else if (req.method === 'POST') {
        req.addListener("data", function (postDataChunk) {
            postData += postDataChunk;
        });

        req.addListener("end", function () {
            data.query = postData;
            req.data = data;
            next();
        });
    }
    else {
        data.query = postData;
        req.data = data;
        next();
    }
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

app.get('/GetStoreByID', function (req, res) {
    var data = req.data;
    handle["/GetStoreByID"](data);
});

app.listen(port);
//server.start(route.route, handle);
