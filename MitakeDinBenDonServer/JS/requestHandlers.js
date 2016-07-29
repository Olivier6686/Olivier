var login = require('./api/Login.js');
var getStoresByName = require('./api/GetStoresByName.js');

exports.Login = login.login;
exports.GetStoresByName = getStoresByName.GetStoresByName;
