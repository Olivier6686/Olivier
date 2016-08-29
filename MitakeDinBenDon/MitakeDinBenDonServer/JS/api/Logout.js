var common = require('../Common/common.js');
//var session = require('express-session');

function Loginout(data)
{
    var req = data.request;
    var res = data.response;
    req.session.destroy(function (err) {
        // cannot access session here
        if (err)
            common.ReturnError(err, res);
        else
            common.sendSucceed(res);

    })

    //var sess = req.session;
}

module.exports = Loginout;