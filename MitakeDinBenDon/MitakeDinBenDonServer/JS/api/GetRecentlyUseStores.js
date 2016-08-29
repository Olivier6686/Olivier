var sql = require('mssql');
var common = require('../Common/common.js');
var connection = require('../Common/connection.js');
var querystring = require('querystring');

function combineCondition(idarray) {
    var result = "";
    for (i = 0; i < idarray.length; i++) {
        if (i === 0)
            result = 'StoreID = ' + '\'' + idarray[0].StoreID + '\'';
        else {
            result = result + ' OR ' + 'StoreID = ' + '\'' + idarray[i].StoreID + '\'';
        }
    }
    return result;

}

function getStoresByID(stores, res)
{
    var condition = combineCondition(stores);
    var sqlRequest = new sql.Request(connection);    
    var query = 'select * from Store where ' + condition;
    console.log("sql comand =" + query);
    // or request.execute(procedure);
    sqlRequest.query(query).then(function (recordset) {
        // ... error checks
        if (recordset.length === 0) {
            common.ReturnError(common.ErrorMap[2], res);
            return;
        }

        console.dir(recordset);
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' });
        var result = { 'IsSucceed': true, 'Stores': recordset };
        var json = JSON.stringify(result);
        res.write(json);
        res.end();
    }).catch(function (err) {
        console.dir(err);
        common.ReturnError(err, res);
        return;
    });
}


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
                var stores = JSON.parse(record.RecentlyUseStores);
                getStoresByID(stores, response);
                //var ret = { Stores: record.RecentlyUseStores};
                //common.sendSucceed(response, ret);
            }
            else {//沒有註冊過
                common.sendSucceed(response, undefined);
            }
        }
    });    
}

module.exports = GetRecentlyUseStores;
