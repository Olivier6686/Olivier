var sql = require('mssql');
var querystring = require('querystring');
var common = require('../Common/common.js');
var connection = require('../Common/connection.js')


function deleteOrderFormItem(data) {
    var request = data.request;
    var response = data.response;
    var querys = data.query;
    var args = querystring.parse(querys);

    var json = "";

    console.log("Request handler '/DeleteOrderFormItem' was called.");

    if (!args.OrderFormID || !args.AttendanceID) {
        common.ReturnError(common.ErrorMap[1], response);
        return;
    }

    common.getOrder(args.OrderFormID, function (recordset) {
        var database = [];
        var dest = [];

        if (recordset.Attendance)
            database = JSON.parse(recordset.Attendance);

        for (var i = 0; i < database.length; i++) {
            if (args.AttendanceID === database[i].AttendanceID) {
                    continue;                
            }
            dest.push(database[i]);
        }

        var attendanceJson = JSON.stringify(dest);

        common.updateAttendance(response, args.OrderFormID, attendanceJson);

    });



}

exports.DeleteOrderFormItem = deleteOrderFormItem;