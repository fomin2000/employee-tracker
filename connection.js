const mysql = require('mysql2')

const db = mysql.createConnection({
    user: 'root',
    password: '',
    port: 3306,
    host: '127.0.0.1',
    database: 'employeeDB',
  },
  
  console.log('Connected to server!')

)

  module.exports = db