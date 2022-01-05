// get the client
// const { route } = require('express/lib/application');
const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'saboroso',
  password: 'mysql'
});


module.exports = connection;