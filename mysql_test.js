const mysql = require('mysql')
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database : 'test',
    port: 3308,
})

connection.connect()

connection.query('SELECT * FROM user', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', JSON.stringify(results));
  });
   
connection.end();