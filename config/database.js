// Require mysql
var mysql = require('mysql');

// Create a connection
var connection = mysql.createConnection({
    host: "34.128.121.24" ,
    user: "root",
    password: "waytogo123",
    database: "place",
});

// Export the connection
module.exports = connection;