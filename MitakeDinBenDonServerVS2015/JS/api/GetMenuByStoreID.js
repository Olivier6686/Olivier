var sql = require('mssql');
var querystring = require('querystring');
var common = require('../Common/common.js');
var connection = require('../Common/connection.js')

function getStoreInfomationByStoreID(data, callback)
{
    var request   = data.request;
    var  response = data.response;
    var  storeID   = data.StoreID;        
    
    if (typeof(storeID) === 'undefined') {
        common.ReturnError(common.ErrorMap[1], response);
        return;
    }

    var sqlRequest = new sql.Request(connection);
    sqlRequest.input('name', storeID);
    var query = 'select * from Store where StoreID=@name';
    
    // or request.execute(procedure);
    sqlRequest.query(query).then(function(recordset) {
    // ... error checks
        if (recordset.length === 0) {
            common.ReturnError(common.ErrorMap[2], response);
            return;
        }

        console.dir(recordset);

        if (recordset[0]) {
            if (callback)
                callback(recordset[0]);            
            return;        

        }
     }).catch(function(err) {
	    console.dir(err);
        common.ReturnError(err, response);
        return;
	});
}

function getMenuByStoreID(data) {
    var request     = data.request;
    var  response = data.response;
    var  querys    = data.query;
    var args = querystring.parse(querys);

    if (request.method === "POST") {
        response.writeHead(404, {"Content-Type": "text/plain"});
        response.write("404 Not Found\n");
        response.end();
        return;
    }

    console.log("Request handler '/getMenuByStoreID' was called.");
    


    if (typeof(args.StoreID) === 'undefined') {
        common.ReturnError(common.ErrorMap[1], response);
        return;
    }

    data.StoreID = args.StoreID;

    getStoreInfomationByStoreID(data, function(result) {
        var sqlRequest = {};
        var query = "";
        var result2 = {};
        var json = "";
        console.log(result);
        if (result) {        
            if (result.MenuID) {
                sqlRequest = new sql.Request(connection);        
                sqlRequest.input('id',result.MenuID);
                query = 'select * from Menu where MenuID=@id';
                console.log("query=" + querys);
                // or request.execute(procedure);
                sqlRequest.query(query).then(function(recordset) {
                // ... error checks
                    if (recordset.length === 0) {
                        common.ReturnError(common.ErrorMap[2], response);
                        return;
                    }

                    console.dir(recordset);
                    if (recordset[0]) {                              
                        response.writeHead(200, {'Content-Type': 'application/json; charset=utf-8','Access-Control-Allow-Origin':'*'});                        
                        recordset[0].Items = new Buffer(recordset[0].Items).toString('base64');                        
                        var rawobj = {};
                        rawobj.IsSucceed = true;
                        rawobj.Menu = {MenuID:recordset[0].MenuID, Items:recordset[0].Items};
                        json = JSON.stringify(rawobj);
                        response.write(json);        
                        response.end();
                    }
                }).catch(function(err) {
                    console.dir(err);
                    common.ReturnError(err, response);
                    return;
                });
            }
        }
    });
     
    
}
exports.GetMenuByStoreID = getMenuByStoreID;