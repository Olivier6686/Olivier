var exec = require("child_process").exec;
var querystring = require("querystring");

function start(response) {
    console.log("Request handler 'start' was called.");    
    exec("dir c:\ /s",
    { timeout: 10000, maxBuffer: 20000*1024 }, 
    function (error, stdout, stderr) {
      response.writeHead(200, {"Content-Type": "text/plain"});
      response.write(stdout);
      response.end();
    });

}

function start2(response, postData) {
    console.log("Request handler 'start' was called.");
    var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload2" method="post">'+
    '<textarea name="text" rows="20" cols="60"></textarea>'+
    '<input type="submit" value="Submit text" />'+
    '</form>'+
    '</body>'+
    '</html>';
   
    
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write(body);
      response.end();
    

}

function upload(response) {
  console.log("Request handler 'upload' was called.");
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Hello Upload");
  response.end();
}

function upload2(response, postData) {
  console.log("Request handler 'upload' was called.");
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("You've sent the text: "+
  querystring.parse(postData).text);
  response.end();
}

exports.start = start;
exports.start2 = start2;
exports.upload = upload;
exports.upload2 = upload2;