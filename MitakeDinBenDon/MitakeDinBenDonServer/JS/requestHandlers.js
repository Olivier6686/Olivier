var login = require('./api/Login.js');
var getStoresByName = require('./api/GetStoresByName.js');
var getMenuByStoreID = require('./api/GetMenuByStoreID.js');
var establishOrder = require('./api/EstablishOrder.js');
var getOrderFormsByID = require('./api/GetOrderFormsByID.js');
var upateOrderFormAttendance = require('./api/UpateOrderFormAttendance.js');
var getStores = require('./api/GetStores.js');
var getStoreByID = require('./api/GetStoreByID.js');
var deleteOrderFormItem = require('./api/DeleteOrderFormItem.js');
var createAccount = require('./api/createAccount.js');
var createStore = require('./api/CreateStore.js');


exports.Login = login.login;
exports.GetStoresByName = getStoresByName.GetStoresByName;
exports.GetMenuByStoreID = getMenuByStoreID.GetMenuByStoreID;
exports.EstablishOrder = establishOrder.EstablishOrder;
exports.GetOrderFormsByID = getOrderFormsByID.GetOrderFormsByID;
exports.UpateOrderFormAttendance = upateOrderFormAttendance.UpateOrderFormAttendance;
exports.GetStores = getStores.GetStores;
exports.GetStoreByID = getStoreByID.GetStoreByID;
exports.DeleteOrderFormItem = deleteOrderFormItem.DeleteOrderFormItem;
exports.CreateAccount = createAccount.CreateAccount;
exports.CreateStore = createStore.CreateStore;
