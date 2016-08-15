var sql = require('mssql');
var querystring = require('querystring');
var common = require('../Common/common.js');
var connection = require('../Common/connection.js')

function combineCondition(idarray)
{
    var result = "";
    for (i = 0; i < idarray.length; i++) {
        if (i === 0)
            result = 'OrderFormID = ' + '\'' + idarray[0] + '\'';
        else {
            result = result + ' OR ' + 'OrderFormID = ' + '\'' + idarray[i] + '\'';
        }
    }
    return result;

}

function getOrderFormsByID(data) {
    var request = data.request;
    var response = data.response;
    var querys = data.query;
    var args = querystring.parse(querys);
    var condition = "";
    var json = "";
    if (request.method === "POST") {
        response.writeHead(404, { "Content-Type": "text/plain" });
        response.write("404 Not Found\n");
        response.end();
        return;
    }

    console.log("Request handler '/getOrderFormsByID' was called.");

    if (typeof (args.OrderFormIDs) === 'undefined') {
        common.ReturnError(common.ErrorMap[1], response);
        return;
    }

    var idArray = args.OrderFormIDs.split(',');
    if (idArray === null || idArray === undefined) {
        common.ReturnError(common.ErrorMap[1], response);
        return;
    }
    condition =  combineCondition(idArray);

    sqlRequest = new sql.Request(connection);
    sqlRequest.input('condition', condition);
    query = 'select * from OrderForm where ' + condition;
    console.log("sql command =" + query);
    // or request.execute(procedure);
    sqlRequest.query(query).then(function (recordset) {
        // ... error checks
        if (recordset.length === 0) {
            common.ReturnError(common.ErrorMap[2], response);
            return;
        }

        console.dir(recordset);
        if (recordset) {
            var ret = { IsSucceed: true, Items: recordset};            
            response.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' });            
            json = JSON.stringify(ret);            
            response.write(json);
            response.end();
        }
    }).catch(function (err) {
        console.dir(err);
        common.ReturnError(err, response);
        return;
    });


}
exports.GetOrderFormsByID = getOrderFormsByID;