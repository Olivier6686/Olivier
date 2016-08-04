var sql = require('mssql');
var config = require('./config.json');

var connection = new sql.Connection({
    user: config.user,
    password: config.password,
    server: config.server ,
    database: config.database
    //
 	 //  debug: {
    //   packet: true,
    //   data: true,
    //   payload: true,
    //   token: false,
    //   log: true
    // },
    });

connection.connect();

module.exports = connection;