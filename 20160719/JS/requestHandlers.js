var exec = require("child_process").exec;
var querystring = require("querystring"),
    fs = require("fs"),
    formidable = require("./formidable");

function start(response, request) {
    //var  response = data.response;
    //var  postData = data.postData;
    console.log("Request handler 'start' was called.");
    var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" enctype="multipart/form-data" '+
    'method="post">'+
    '<input type="file" name="upload" multiple="multiple">'+
    '<input type="submit" value="Upload file" />'+
    '</form>'+
    '</body>'+
    '</html>';
    
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();

}

function upload(response, request) {
  //var  response = data.response;
  //var  postData = data.postData;
  //var  request  = data.request;

  console.log("Request handler 'upload' was called.");
  var form = new formidable.IncomingForm();
  console.log("about to parse");
  form.parse(request, function(error, fields, files) {
    console.log("parsing done");
    console.log("path:" + files.upload.path);
    //fs.renameSync(files.upload.path, "/Git/Olivier/20160719/JS/tmp/test2.png");
    fs.renameSync(files.upload.path, "/tmp/test.png");
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write("received image:<br/>");
    response.write("<img src='/show2' />");
    response.end();
  });
}

function show(response, request) {
  //var  response = data.response;
    //var  postData = data.postData;
  console.log("Request handle 'show' was called.");
  fs.readFile("/Git/Olivier/20160719/JS/tmp/test.png", "binary", function(error, file){
    if (error) {
      response.writeHead(50, {"Content-Type": "text/plain"});
      response.write(error + "\n");
      response.end();
    }
    else{
      response.writeHead(200, {"Content-Type" : "image/png"});
      response.write(file, "binary");
      response.end();
    }
  });
}

function show2(response, request) {
  //var  response = data.response;
//    var  postData = data.postData;
  console.log("Request handle 'show' was called.");
  fs.readFile("/Git/Olivier/20160719/JS/tmp/test2.png", "binary", function(error, file){
    if (error) {
      response.writeHead(50, {"Content-Type": "text/plain"});
      response.write(error + "\n");
      response.end();
    }
    else{
      response.writeHead(200, {"Content-Type" : "image/png"});
      response.write(file, "binary");
      response.end();
    }
  });
}

exports.start = start;
exports.upload = upload;
exports.show =show;
exports.show2 =show2;