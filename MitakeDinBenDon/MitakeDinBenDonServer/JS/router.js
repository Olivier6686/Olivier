/*var requestHandlers = require("./requestHandlers");
var express = require('express');
var session = require('express-session');
var router = express.Router();
port = 8888;
var redirect = 'http://10.1.4.133:' + port + '/Main/index.html';
//var redirect = '/Main/index.html';

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

function isAuthenticated(req, res, next) {
    sess = req.session;
    var ID = req.session.data;
    if (req.session.data)
        return next();
    res.writeHead(301,
        { Location: redirect }
    );
    res.end();

}

router.get('/', function (req, res) {
    res.writeHead(301,
        { Location: redirect }
    );
    res.end();
});

router.post('/login', function (req, res) {
    var data = req.data;
    handle["/login"](data);
});

router.get('/GetStoresByName', isAuthenticated, function (req, res) {
    var data = req.data;
    handle["/GetStoresByName"](data);
});

router.get('/GetMenuByStoreID', isAuthenticated, function (req, res) {
    var data = req.data;
    handle["/GetMenuByStoreID"](data);
});

router.post('/EstablishOrder', isAuthenticated, function (req, res) {
    var data = req.data;
    handle["/EstablishOrder"](data);
});

router.get('/GetOrderFormsByID', isAuthenticated, function (req, res) {
    var data = req.data;
    handle["/GetOrderFormsByID"](data);
});

router.post('/UpateOrderFormAttendance', isAuthenticated, function (req, res) {
    var data = req.data;
    handle["/UpateOrderFormAttendance"](data);
});

router.get('/UpateOrderFormAttendance', isAuthenticated, function (req, res) {
    var data = req.data;
    handle["/UpateOrderFormAttendance"](data);
});

router.get('/GetStores', isAuthenticated, function (req, res) {
    var data = req.data;
    handle["/GetStores"](data);
});

router.get('/GetStoreByID', isAuthenticated, function (req, res) {
    var data = req.data;
    handle["/GetStoreByID"](data);
});

router.post('/DeleteOrderFormItem', isAuthenticated, function (req, res) {
    var data = req.data;
    handle["/DeleteOrderFormItem"](data);
});

router.post('/CreateAccount', isAuthenticated, function (req, res) {
    var data = req.data;
    handle["/CreateAccount"](data);
});

router.post('/CreateStore', isAuthenticated, function (req, res) {
    var data = req.data;
    handle["/CreateStore"](data);
});

router.post('/CreateMenu', isAuthenticated, function (req, res) {
    var data = req.data;
    handle["/CreateMenu"](data);
});

module.exports = router;*/