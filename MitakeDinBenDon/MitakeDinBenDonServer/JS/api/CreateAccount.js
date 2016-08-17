var sql = require('mssql');
var common = require('../Common/common.js');
var connection = require('../Common/connection.js')
var querystring = require('querystring');

function AddAccount(data)
{
    var request = data.request;
    var response = data.response;
    var querys = data.query;
    var args = querystring.parse(querys);
    var username = args.UserName;
    var realname = args.RealName;
    var password = args.Password;
    var email = "";    
    
    if (args.Email)
        email = args.Email;

    var sqlRequest = new sql.Request(connection);
    sqlRequest.input('username', username);
    sqlRequest.input('realname', realname);
    sqlRequest.input('password', password);
    sqlRequest.input('orderlist', '');
    sqlRequest.input('email', email);

    var query = 'INSERT INTO Account(UserName, RealName, Password, OrderList, Email) VALUES(@username, @realname, @password, @orderlist, @email);';

    sqlRequest.query(query).then(function (recordset) {
        common.sendSucceed(response);
    }).catch(function (err) {
        console.dir(err);
        common.ReturnError(err, response);
        return;
    });
}

function createAccount(data, callback) {
    var querys = data.query;
    var args = querystring.parse(querys);
        
    if (args.UserName === undefined || args.RealName === undefined || args.Password === undefined) {
        common.ReturnError(common.ErrorMap[1], response);
        return;
    }

    common.getAccountNotResponse(data, function (err, recordset) {
        if (err) {
            common.ReturnError(err, response);
        }
        else {
            if (recordset) {
                common.ReturnError(common.ErrorMap[3], response);
            }
            else {//沒有註冊過
                AddAccount(data);
            }
        }
    });
}

exports.CreateAccount = createAccount;