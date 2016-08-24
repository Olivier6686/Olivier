var sql = require('mssql');
var common = require('../Common/common.js');
var connection = require('../Common/connection.js');
var querystring = require('querystring');

function GetRecentlyUseStores(data) {        
    var response = data.response;
    var args = querystring.parse(data.query);
    data.Username = args.UserName;
    common.getAccountNotResponse(data, function (err, record) {
        if (err) {
            common.ReturnError(err, response);
        }
        else {
            if (record) {
                var ret = { Stores: record.RecentlyUseStores};
                common.sendSucceed(response, ret);
            }
            else {//沒有註冊過
                common.sendSucceed(response, undefined);
            }
        }
    });    
}

module.exports = GetRecentlyUseStores;
