const inquirer = require("inquirer");
const mysql = require("mysql");
require("dotenv").config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "business_db",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("successfully connected to database!");
  startApp();
});
