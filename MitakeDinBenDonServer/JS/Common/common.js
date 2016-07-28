var passwordError = {'name':'PasswordError', 'message':'Password is wrong.', 'code':'0'};
var passwordInputError = {'name':'passwordInputError', 'message':'Password is Empty.', 'code':'1'};
var NotFoundUserError = {'name':'NotFoundUserError', 'message':'User not found.', 'code':'2'};

var ErrorMap = [passwordError, passwordInputError, NotFoundUserError];

function ReturnError(err, response) {
    var error = {"IsSucceed":false};
    error.exception = err;
    response.writeHead(200, {'Content-Type': 'application/json; charset=utf-8','Access-Control-Allow-Origin':'*'});
    response.write(JSON.stringify(error));           
    response.end(); 
}

exports.ReturnError = ReturnError;
exports.ErrorMap = ErrorMap;