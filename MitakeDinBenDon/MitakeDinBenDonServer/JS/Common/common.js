var sql = require('mssql');
var connection = require('../Common/connection.js')

var passwordError = { 'name': 'PasswordError', 'message': 'Password is wrong.', 'code': '0' };
var parameterInputError = {'name':'parameterInputError', 'message':'parameter is error.', 'code':'1'};
var NotFoundDataError = {'name':'NotFoundDataError', 'message':'Data not found.', 'code':'2'};
var NotEmptyAccount = { 'name': 'NotEmptyAccount', 'message': 'Account had been register', 'code': '3' };


var ErrorMap = [passwordError, parameterInputError, NotFoundDataError, NotEmptyAccount];

function ReturnError(err, response) {
    var error = {"IsSucceed":false};
    error.exception = err;
    response.writeHead(200, {'Content-Type': 'application/json; charset=utf-8','Access-Control-Allow-Origin':'*'});
    response.write(JSON.stringify(error));           
    response.end(); 
}

function getAccount(data, callback)
{
    var username = data.username;
    var  response = data.response;

    var sqlRequest = new sql.Request(connection);
    sqlRequest.input('username', username);
    var query = 'select * from Account where UserName=@username';
    
    sqlRequest.query(query).then(function(recordset) {
    // ... error checks
        if ( recordset.length === 0) {
            common.ReturnError(common.ErrorMap[2], response);
            return;
        }
       
        console.dir(recordset);
        
        if (recordset[0]) {
            if (typeof(callback) === 'function') {
                callback(recordset[0]);
                return;
            }
        }
        else
            common.ReturnError(common.ErrorMap[2], response);
        
    }).catch(function(err) {
	    console.dir(err);
        common.ReturnError(err, response);
        return;
	});
}

function getAccountNotResponse(data, callback) {
    var username = data.Username;
    var response = data.response;

    var sqlRequest = new sql.Request(connection);
    sqlRequest.input('username', username);
    var query = 'select * from Account where UserName=@username';

    sqlRequest.query(query).then(function (recordset) {
        // ... error checks
        if (recordset.length === 0) {
            if (typeof (callback) === 'function')
                callback(undefined, undefined);
            return;
        }

        console.dir(recordset);

        if (recordset[0]) {
            if (typeof (callback) === 'function') {
                callback(undefined, recordset[0]);
                return;
            }
        }

    }).catch(function (err) {
        if (typeof (callback) === 'function')
            callback(err, undefined);
        return;
    });
}

function getOrder(id, callback) {
    var sqlRequest = new sql.Request(connection);
    sqlRequest.input('id', id);
    query = 'select * from OrderForm where OrderFormID=@id';
    sqlRequest.query(query).then(function (recordset) {
        if (callback)
            callback(recordset[0]);
    }).catch(function (err) {
        console.dir(err);
        common.ReturnError(err, response);
        return;
    });
}

function updateAttendance(response, id, attendance) {
    var sqlRequest = new sql.Request(connection);
    sqlRequest.input('id', id);
    sqlRequest.input('attendance', attendance);
    query = 'UPDATE OrderForm SET Attendance=@attendance WHERE OrderFormID=@id';
    console.log("sql command =" + query);
    // or request.execute(procedure);
    sqlRequest.query(query).then(function (recordset) {
        var ret = { IsSucceed: true };
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

function SendSucceed(response, ret)
{
    var defaultRet = { IsSucceed: true };
    if (ret === undefined)
        ret = defaultRet;
    else
        ret.IsSucceed = true;
    
    response.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' });
    var json = JSON.stringify(ret);
    response.write(json);
    response.end();
}

exports.ReturnError = ReturnError;
exports.ErrorMap = ErrorMap;

exports.getOrder = getOrder;
exports.updateAttendance = updateAttendance;
exports.sendSucceed = SendSucceed;
exports.getAccountNotResponse = getAccountNotResponse;