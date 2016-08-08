var sql = require('mssql');
var querystring = require('querystring');
var common = require('../Common/common.js');
var connection = require('../Common/connection.js')


function upateOrderFormAttendance(data) {
    var request = data.request;
    var response = data.response;
    var querys = data.query;
    var args = querystring.parse(querys);


    var json = "";
   /* if (request.method === "GET") {
        response.writeHead(404, { "Content-Type": "text/plain" });
        response.write("404 Not Found\n");
        response.end();
        return;
    }*/

    console.log("Request handler '/UpateOrderFormAttendance' was called.");

    if (typeof (args.OrderFormID) === 'undefined') {
        common.ReturnError(common.ErrorMap[1], response);
        return;
    }

    common.getOrder(args.OrderFormID, function (recordset) {
        var database = [];
        if (recordset.Attendance) 
            database = JSON.parse(recordset.Attendance);
        var modify = JSON.parse(args.Attendance);
        var match = false;
        for (i = 0; i < modify.length; i++) {            
            //表示內迴圈一直跑到結束都沒有符合條件
            database.push(modify[i]);
        }
        var attendanceJson = JSON.stringify(database);
        
        common.updateAttendance(response, args.OrderFormID, attendanceJson);

    });
    


}
exports.UpateOrderFormAttendance = upateOrderFormAttendance;