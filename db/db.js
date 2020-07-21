let mysql = require('mysql')

const {DB_HOST,DB_USER,DB_PASSWORD,DB_NAME} = process.env

let connection = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME
});

connection.connect((err) => {
    if (err) {
       console.log(err)
    } else {
        console.log('Connected to MySQL successfully');
    }
});

module.exports = connection;