var querystring = require('querystring');
var common = require('../Common/common.js');
var getAccount = require('./GetAccount.js')

function login(data)
{
    var request     = data.request;
    var  response = data.response;
    var  querys    = data.query;
    var args = querystring.parse(querys);    
    
    console.log("Request handler 'login' was called.");
    console.log("query=" + querys);


    if (typeof(args.UserName) === 'undefined' || typeof(args.Password) === 'undefined') {
        common.ReturnError(common.ErrorMap[1], response);
        return;
    }

    data.Username = args.UserName; 
    getAccount.getAccount(data, function(account) {
        if (account) {
            if (args.Password === account.Password) {
                response.writeHead(200, {'Content-Type': 'application/json; charset=utf-8','Access-Control-Allow-Origin':'*'});
                account.IsSucceed = true;                
                account.OrderList = new Buffer(account.OrderList).toString('base64');
                var json = JSON.stringify(account);
                response.write(json);        
                response.end();
            }
            else {
                common.ReturnError(common.ErrorMap[0], response);
            }
        }
    });    
}

exports.login = login;
