//var server = require("./js/server");
//var router  = require("./js/router");
var requestHandlers = require("./js/requestHandlers");
var url = require("url");
var querystring = require('querystring');
var express = require('express');
var session = require('express-session');
//var router = express.Router()
var app = express();
var pathname = __dirname;
var port = 8888;
var redirect = 'http://10.1.4.133:' + port + '/Main/index.html';
//var redirect2 = 'http://www.google.com';

var handle = {};
handle["/login"] = requestHandlers.Login;
handle["/GetStoresByName"] = requestHandlers.GetStoresByName;
handle["/GetMenuByStoreID"] = requestHandlers.GetMenuByStoreID;
handle["/EstablishOrder"] = requestHandlers.EstablishOrder;
handle["/GetOrderFormsByID"] = requestHandlers.GetOrderFormsByID;
handle["/UpateOrderFormAttendance"] = requestHandlers.UpateOrderFormAttendance;
handle["/GetStores"] = requestHandlers.GetStores;
handle["/GetStoreByID"] = requestHandlers.GetStoreByID;
handle["/DeleteOrderFormItem"] = requestHandlers.DeleteOrderFormItem;
handle["/CreateAccount"] = requestHandlers.CreateAccount;
handle["/CreateStore"] = requestHandlers.CreateStore;
handle["/CreateMenu"] = requestHandlers.CreateMenu;
handle["/SessionCheck"] = requestHandlers.SessionCheck;
handle["/GetRecentlyUseStores"] = requestHandlers.GetRecentlyUseStores;


app.use('/Main', express.static(pathname.replace('MitakeDinBenDonServer', 'MitakeDinBenDon')));

var myParamter = function (req, res, next) {
    var postData = "";
    var pathname = url.parse(req.url).pathname;
    var query = url.parse(req.url).query;
    //var json = querystring.parse(query);

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
app.use(session({
    secret: 'HsiwGsswdddkUATdfded',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 * 60 * 10 },
    data: {}
}));

app.get('/', function (req, res) {    
    res.writeHead(301,
        { Location: redirect }
    );
    res.end();
});

app.post('/login', function (req, res) {
    var data = req.data;
    handle["/login"](data);
});

app.get('/GetStoresByName',  function (req, res) {    
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

app.get('/UpateOrderFormAttendance', function (req, res) {
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

app.post('/DeleteOrderFormItem', function (req, res) {
    var data = req.data;
    handle["/DeleteOrderFormItem"](data);
});

app.post('/CreateAccount', function (req, res) {
    var data = req.data;
    handle["/CreateAccount"](data);
});

app.post('/CreateStore', function (req, res) {
    var data = req.data;
    handle["/CreateStore"](data);
});

app.post('/CreateMenu', function (req, res) {
    var data = req.data;
    handle["/CreateMenu"](data);
});

app.post('/SessionCheck', function (req, res) {
    var data = req.data;
    handle["/SessionCheck"](data);
});

app.get('/GetRecentlyUseStores', function (req, res) {
    var data = req.data;
    handle["/GetRecentlyUseStores"](data);
});

//app.use(router);
app.listen(port);
console.log('listen port:' + port);
//server.start(route.route, handle);