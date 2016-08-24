var common = require('../Common/common.js');
//var session = require('express-session');

function SessionCheck(data) {
    var req = data.request;
    var res = data.response;
    
    /*
    var sess = req.session;
    if (sess) {
        if (sess.data) {
            common.sendSucceed(res, undefined);
            return;
        }
    }
    common.ReturnError(undefined, res);
    */
    common.sendSucceed(res, undefined);
}

module.exports = SessionCheck;