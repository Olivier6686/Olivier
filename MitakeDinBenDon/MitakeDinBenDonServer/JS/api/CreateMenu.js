var sql = require('mssql');
var common = require('../Common/common.js');
var connection = require('../Common/connection.js')
var querystring = require('querystring');
var uuid = require('node-uuid');

function createMenu(data, callback) {
    var request = data.request;
    var response = data.response;
    var querys = data.query;
    var args = querystring.parse(querys);
    var items = args.Items;
    var menuID;

    if (items=== undefined) {
        common.ReturnError(common.ErrorMap[1], response);
        return;
    }

    menuID = uuid.v1();

    var sqlRequest = new sql.Request(connection);
    sqlRequest.input('MenuID', menuID);
    sqlRequest.input('Items', items);

    var query = 'INSERT INTO Menu(MenuID, Items) VALUES(@menuID, @items);';

    sqlRequest.query(query).then(function (recordset) {
        var ret = { MenuID: menuID };
        common.sendSucceed(response, ret);
    }).catch(function (err) {
        console.dir(err);
        common.ReturnError(err, response);
        return;
    });
}

exports.CreateMenu = createMenu;