var port = 8888;
var http = require('http');
var url = require("url");
var querystring = require('querystring');

function start(route, handle) {
    function onRequest(request, response) {
        var postData = "";
        var pathname = url.parse(request.url).pathname;
        var query   =url.parse(request.url).query;
        var json = querystring.parse(query);
        
        var data = {};
        data.request = request;
        data.handle = handle;
        data.response = response;
        data.request = request;
        data.pathname = pathname;
        
        console.log("url= " + request.url);
        console.log("pathname= " + pathname);
        console.log("query= " + query);
        
        console.log("Request for " + pathname + " received.");
        console.log("querystring= " + json);

        request.setEncoding("utf8");

        if (request.method === 'GET') {
             data.query = query;
             route(data);
             return;
        } 
        request.addListener("data", function(postDataChunk) {
            postData += postDataChunk;
            console.log("Received POST data chunk '"+
            postDataChunk + "'.");
        });

        request.addListener("end", function() {
            data.query = postData;
            route(data);
        });


        
        //response.writeHead(200, {"Content-Type": "text/plain"});        
        //response.write(ans);        
        //response.end();
    }

    http.createServer(onRequest).listen(port);
    console.log("Server has started.");
}

exports.start = start;