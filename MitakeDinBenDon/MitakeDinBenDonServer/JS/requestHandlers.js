var login = require('./api/Login.js');
var getStoresByName = require('./api/GetStoresByName.js');
var getMenuByStoreID = require('./api/GetMenuByStoreID.js');
var establishOrder = require('./api/EstablishOrder.js');
var getOrderFormsByID = require('./api/GetOrderFormsByID.js');
var upateOrderFormAttendance = require('./api/UpateOrderFormAttendance.js');
var getStores = require('./api/GetStores.js');
var getStoreByID = require('./api/GetStoreByID.js');

exports.Login = login.login;
exports.GetStoresByName = getStoresByName.GetStoresByName;
exports.GetMenuByStoreID = getMenuByStoreID.GetMenuByStoreID;
exports.EstablishOrder = establishOrder.EstablishOrder;
exports.GetOrderFormsByID = getOrderFormsByID.GetOrderFormsByID;
exports.UpateOrderFormAttendance = upateOrderFormAttendance.UpateOrderFormAttendance;
exports.GetStores = getStores.GetStores;
exports.GetStoreByID = getStoreByID.GetStoreByID;
