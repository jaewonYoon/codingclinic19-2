const mysql = require('mysql2');
require('dotenv').config();
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    multipleStatements: true
});


module.exports = {
   pool : pool,
   db :pool.promise(),
   config : {
       host: process.env.DB_HOST,
       user: process.env.DB_USER,
       database: process.env.DB_DATABASE,
       password: process.env.DB_PASSWORD
   }
}
