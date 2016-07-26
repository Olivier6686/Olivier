function ReturnError(response) {
    var error = {"IsSucceed":false};
    response.writeHead(200, {'Content-Type': 'application/json; charset=utf-8','Access-Control-Allow-Origin':'*'});
    response.write(JSON.stringify(error));           
    response.end(); 
}

exports.ReturnError = ReturnError;