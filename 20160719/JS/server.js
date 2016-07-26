var port = 8889;
var http = require('http');
var url = require("url");

function start(route, handle) {
    function onRequest(request, response) {
        var data = {};
        data.request = request;
        data.handle = handle;
        data.response = response;

        var pathname = url.parse(request.url).pathname;
        console.log("url= " + request.url);
        console.log("Request for " + pathname + " received.");
        var ans = route(data);
        //response.writeHead(200, {"Content-Type": "text/plain"});        
        //response.write(ans);        
        //response.end();
    }

    http.createServer(onRequest).listen(port);
    console.log("Server has started.");
}

function start2(route, handle) {
    console.log("start2 run");
    function onRequest(request, response) {
        var postData = "";
        var pathname = url.parse(request.url).pathname;
        console.log("url= " + request.url);
        console.log("Request for " + pathname + " received.");
        request.setEncoding("utf8");
        
        request.addListener("data", function(postDataChunk) {
            postData += postDataChunk;
            //console.log("Received POST data chunk '"+ postDataChunk + "'.");
            });
        request.addListener("end", function() {
            var data = {};
            //data.request = request;
            //data.handle = handle;
            //data.pathname = pathname;
            //data.response = response;
            //data.postData = postData;            
            route(handle, pathname, response, request);
        });


    }

    http.createServer(onRequest).listen(port);
    console.log("Server has started.");
}

exports.start = start;
exports.start2 = start2;