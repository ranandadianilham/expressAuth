const mysql = require('mysql');

// MySQL database connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'your_username',
    password: 'your_password',
    database: 'your_database',
});

module.exports = connection;