var sql = require('mssql');
var querystring = require('querystring');
var common = require('../Common/common.js');
var connection = require('../Common/connection.js')

function getStoreByID(data) {
    var request = data.request;
    var response = data.response;
    var querys = data.query;
    var args = querystring.parse(querys);    

    if (request.method === "POST") {
        response.writeHead(404, { "Content-Type": "text/plain" });
        response.write("404 Not Found\n");
        response.end();
        return;
    }
    
    console.log("Request handler '/getStoreByID' was called.");

    if (typeof (args.StoreID) === 'undefined') {
        common.ReturnError(common.ErrorMap[1], response);
        return;
    }
    
    var sqlRequest = new sql.Request(connection);
    sqlRequest.input('id', args.StoreID);
    var query = 'select * from Store where StoreID=@id';
    console.log("sql comand =" + query);
    // or request.execute(procedure);
    sqlRequest.query(query).then(function (recordset) {
        // ... error checks
        if (recordset.length === 0) {
            common.ReturnError(common.ErrorMap[2], response);
            return;
        }

        console.dir(recordset);
        response.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' });
        var result = { 'IsSucceed': true, 'Store': recordset[0] };
        var json = JSON.stringify(result);
        response.write(json);
        response.end();
    }).catch(function (err) {
        console.dir(err);
        common.ReturnError(err, response);
        return;
    });
}
exports.GetStoreByID = getStoreByID;