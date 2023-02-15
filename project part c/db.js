const mysql = require('mysql2');
const dbConfig = require("./db_Config.js");

const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DATABASE
});

connection.connect(error => {
    if(error) throw error;
    console.log("Successfuly connected to the Data Base: ");
});
module.exports = connection;