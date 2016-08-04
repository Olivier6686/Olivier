var sql = require('mssql');
var querystring = require('querystring');
var common = require('../Common/common.js');
var connection = require('../Common/connection.js')

function upateOrderFormAttendance(data) {
    var request = data.request;
    var response = data.response;
    var querys = data.query;
    var args = querystring.parse(querys);


    var json = "";
    if (request.method === "GET") {
        response.writeHead(404, { "Content-Type": "text/plain" });
        response.write("404 Not Found\n");
        response.end();
        return;
    }

    console.log("Request handler '/UpateOrderFormAttendance' was called.");

    if (typeof (args.OrderFormID) === 'undefined') {
        common.ReturnError(common.ErrorMap[1], response);
        return;
    }
    
    sqlRequest = new sql.Request(connection);
    sqlRequest.input('id', args.OrderFormID);
    sqlRequest.input('attendance', args.Attendance);
    query = 'UPDATE OrderForm SET Attendance=@attendance WHERE OrderFormID=@id';
    console.log("sql command =" + query);
    // or request.execute(procedure);
    sqlRequest.query(query).then(function (recordset) {
        var ret = { IsSucceed: true};
        response.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' });
        json = JSON.stringify(ret);
        response.write(json);
        response.end();        
    }).catch(function (err) {
        console.dir(err);
        common.ReturnError(err, response);
        return;
    });


}
exports.UpateOrderFormAttendance = upateOrderFormAttendance;