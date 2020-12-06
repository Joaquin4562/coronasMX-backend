const mysql = require('mysql');

// const localHost = 'localhost';
// const localUser = 'root';
// const localDatabse = 'coronasMx';
const host = process.env.HOST;
const user = process.env.USER;
const password = process.env.PASS;
const database = process.env.DB;
const connection = mysql.createConnection({
    host,
    user,
    password,
    database
});
connection.connect( err => {
    if(err) throw err;
    console.log('Database server Running');
});

module.exports = connection;