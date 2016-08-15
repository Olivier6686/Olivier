var sql = require('mssql');
var common = require('../Common/common.js');
var connection = require('../Common/connection.js')

function getAccount(data, callback)
{
    var username = data.Username;
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

exports.getAccount = getAccount;
