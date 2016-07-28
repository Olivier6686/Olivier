var sql = require('mssql');
var querystring = require('querystring');
var common = require('../Common/common.js');
var connection = require('../Common/connection.js')

function login(data) {
    var request     = data.request;
    var  response = data.response;
    var  querys    = data.query;
    var args = querystring.parse(querys);    


    if (request.method === "GET") {
        response.writeHead(404, {"Content-Type": "text/plain"});
        response.write("404 Not Found\n");
        response.end();
        return;
    }

    console.log("Request handler 'login' was called.");
    console.log("query=" + querys);


    if (typeof(args.UserName) === 'undefined' || typeof(args.Password) === 'undefined') {
        common.ReturnError(common.ErrorMap[1], response);
        return;
    }
     
    var request = new sql.Request(connection);
        
    var query = 'select * from Account where UserName=\'' + args.UserName +'\'';
    // or request.execute(procedure);
    request.query(query, function(err, recordset) {
    // ... error checks
        if ( recordset.length === 0) {
            common.ReturnError(common.ErrorMap[2], response);
            return;
        }
        if (err !== null && err !== "" ) {
            console.dir(err);
            common.ReturnError(err, response);
            return;
        }

        console.dir(recordset);
        
        if (recordset[0]) {
            var record = recordset[0];
            if (args.Password === record.Password) {
                response.writeHead(200, {'Content-Type': 'application/json; charset=utf-8','Access-Control-Allow-Origin':'*'});
                record.IsSucceed = true;
                var r = JSON.stringify(record); 
                response.write(r);        
                response.end();
            }
            else {
                common.ReturnError(common.ErrorMap[0], response);
            }
        }
        else
            common.ReturnError(common.ErrorMap[2], response);
        
    });
}
exports.login = login;