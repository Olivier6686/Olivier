var passwordError = {'name':'PasswordError', 'message':'Password is wrong.', 'code':'0'};
var parameterInputError = {'name':'parameterInputError', 'message':'parameter is error.', 'code':'1'};
var NotFoundDataError = {'name':'NotFoundDataError', 'message':'Data not found.', 'code':'2'};

var ErrorMap = [passwordError, parameterInputError, NotFoundDataError];

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


exports.ReturnError = ReturnError;
exports.ErrorMap = ErrorMap;