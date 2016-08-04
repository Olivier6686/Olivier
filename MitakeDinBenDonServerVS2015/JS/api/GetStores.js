var sql = require('mssql');
var querystring = require('querystring');
var common = require('../Common/common.js');
var connection = require('../Common/connection.js')

function getStores(data) {
    var request = data.request;
    var response = data.response;
    
    if (request.method === "POST") {
        response.writeHead(404, { "Content-Type": "text/plain" });
        response.write("404 Not Found\n");
        response.end();
        return;
    }

    console.log("Request handler '/getStoresByName' was called.");
    
    var sqlRequest = new sql.Request(connection);

    var query = 'select * from Store';
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
        var result = { 'IsSucceed': true, 'Stores': recordset };
        var json = JSON.stringify(result);
        response.write(json);
        response.end();
    }).catch(function (err) {
        console.dir(err);
        common.ReturnError(err, response);
        return;
    });
}
exports.GetStores = getStores;