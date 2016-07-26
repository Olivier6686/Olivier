var sql = require('mssql');
var querystring = require('querystring');
var common = require('../Common/common.js');

function login(data) {
    var request     = data.request;
    var  response = data.response;
    var  postData = data.postData;
    var  querys    = postData;
    var args = querystring.parse(querys);    


    if (request.method === "GET") {
        response.writeHead(404, {"Content-Type": "text/plain"});
        response.write("404 Not Found\n");
        response.end();
        return;
    }

    console.log("Request handler 'start' was called.");
    console.log("query=" + querys);


    if (typeof(args.UserName) === 'undefined' || typeof(args.Password) === 'undefined') {
        common.ReturnError(response);
        return;
    }

    var config = {
    user: 'sa',
    password: '1234',
    server: 'localhost', // You can use 'localhost\\instance' to connect to named instance 
    database: 'DinBenDon',
    };

    var connection1 = sql.connect(config, function(err) {
        // ... error checks 
        if (err !== null && err !== "") {
            console.log("sql connect :" + err);
            response.writeHead(200, {"Content-Type": 'text/plain; charset=utf-8','Access-Control-Allow-Origin':'*'});
            response.write("sql connect failed:" + err);
            response.end(); 
            return;
        }
        
        
        var request = new sql.Request(connection1); 
         
        var query = 'select * from Account where UserName=\'' + args.UserName +'\'';
        // or request.execute(procedure);
        request.query(query, function(err, recordset) {
        // ... error checks
            console.dir(recordset);
            if (err !== null && err !== "" || recordset.length === 0) {
                common.ReturnError(response);
                return;
            }
             
            if (recordset[0]) {
                if (args.Password === recordset[0].Password) {
                    response.writeHead(200, {'Content-Type': 'application/json; charset=utf-8','Access-Control-Allow-Origin':'*'});
                    rowdata.IsSucceed = true;
                    var r = JSON.stringify(rowdata); 
                    response.write(r);        
                    response.end();
                }
                else {
                    common.ReturnError(response);
                }
            }
            else
                common.ReturnError(response);
            
        });
    });
    
    connection1.on('error', function(err) {

    });    
}
exports.login = login;