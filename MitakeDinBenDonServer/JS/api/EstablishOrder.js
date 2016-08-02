var sql = require('mssql');
var querystring = require('querystring');
var common = require('../Common/common.js');
var connection = require('../Common/connection.js')
var uuid = require('node-uuid');
var getAccount = require('./GetAccount.js')


function updateOrderList(data, callback)
{
    var request   = data.request;
    var response  = data.response;
    var username  = data.Username;
    var OrderGuid = data.uuid; 

    getAccount.getAccount(data, function(account){
        var newOrderList = "";
        if (account) {
            if (account.OrderList !== null && account.OrderList !== 'undefined') {
                if (account.OrderList === "") {
                    newOrderList = "[{" + "\"OrderFormID\":\"" + OrderGuid  + "\"}]";
                }
                else {
                    account.OrderList = account.OrderList.replace("[", "");
                    account.OrderList = account.OrderList.replace("]", "");
                    newOrderList = "[" + account.OrderList +  ", {" + "\"OrderFormID\":\"" + OrderGuid  + "\"}]";
                }
            }
            
            var sqlRequest = new sql.Request(connection);
            sqlRequest.input('username', username);
            sqlRequest.input('orderlist', newOrderList);
            var query = 'UPDATE Account SET OrderList=@orderlist WHERE UserName=@username';
            sqlRequest.query(query).then(function(recordset) {
                if (typeof(callback) === 'function') {
                    callback();
                    return;
                }
            }).catch(function(err) {
                console.dir(err);
                common.ReturnError(err, response);
                return;
            });
        }
    })

    
}

function establishOrder(data) {
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
    
    console.log("Request handler '/establishOrder' was called.");
    console.log(args);

    var guid = uuid.v1();
    var sqlRequest = new sql.Request(connection);
    sqlRequest.input('OrderFormID', guid);
    sqlRequest.input('StoreID', args.StoreID);
    sqlRequest.input('Owner', sql.VarChar, args.Owner);
    sqlRequest.input('Title', sql.NVarChar, args.Title);
    sqlRequest.input('Description', sql.NVarChar, args.Description);
    sqlRequest.input('ExpiredTime', args.ExpiredTime);
    sqlRequest.input('Attendance', sql.NVarChar, args.Attendance);

    var query = 'INSERT INTO OrderForm (OrderFormID, StoreID, Owner, Title, Description, ExpiredTime, Attendance) VALUES(@OrderFormID, @StoreID, @Owner, @Title, @Description, @ExpiredTime, @Attendance);';
    sqlRequest.query(query).then(function(recordset) {
        
    // ... error checks
        var result = {'IsSucceed':true,'OrderForm':guid};
        var r = JSON.stringify(result);
        data.uuid = guid;
        data.Username = args.Owner;
        updateOrderList(data, function(){});

        console.log("GUID=" + guid);            
        response.writeHead(200, {'Content-Type': 'application/json; charset=utf-8','Access-Control-Allow-Origin':'*'});
        response.write(r);        
        response.end();
     }).catch(function(err) {
	    console.dir(err);
        common.ReturnError(err, response);
        return;
	});
}
exports.EstablishOrder = establishOrder;