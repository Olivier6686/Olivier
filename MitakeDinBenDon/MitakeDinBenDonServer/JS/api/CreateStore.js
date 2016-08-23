var sql = require('mssql');
var common = require('../Common/common.js');
var connection = require('../Common/connection.js')
var querystring = require('querystring');

function createStore(data, callback) {
    var request = data.request;
    var response = data.response;
    var querys = data.query;
    var args = querystring.parse(querys);
    var storename   = args.StoreName;
    var address     = args.Address;
    var phone = args.Phone;
    var fax = args.fax;
    var menuid = args.MenuID;

    if (args.StoreName === undefined || args.Address === undefined || args.Phone === undefined || args.MenuID === undefined) {
        common.ReturnError(common.ErrorMap[1], response);
        return;
    }
    if (fax === undefined)
        fax = "";

    var sqlRequest = new sql.Request(connection);
    sqlRequest.input('stroename', storename);
    sqlRequest.input('address', address);
    sqlRequest.input('phone', phone);
    sqlRequest.input('fax', fax);
    sqlRequest.input('menuid', menuid);

    var query = 'INSERT INTO Store(StoreName, Address, Phone, Fax, MenuID) VALUES(@stroename, @address, @phone, @fax, @menuid);';

    sqlRequest.query(query).then(function (recordset) {
        common.sendSucceed(response, undefined);
    }).catch(function (err) {
        console.dir(err);
        common.ReturnError(err, response);
        return;
    });
}

exports.CreateStore = createStore;