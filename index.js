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

function startApp() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View Departments",
        "View Roles",
        "View Employees",
        "Update Employee Role",
        "Add New Employee",
        "Remove An Employee",
        "Exit",
      ],
    })
    .then((answer) => {
      switch (answer.action) {
        case "View Departments":
          viewDepartments();
          break;

        case "View Roles":
          viewRoles();
          break;

        case "View Employees":
          viewEmployees();
          break;

        case "Create New Department":
          // viewDepartments();
          break;

        case "Create New role":
          // viewRoles();
          break;

        case "Create New Employee":
          createNewEmployee();
          break;

        case "Update Employee Role":
          updateEmployeeRole();
          break;

        case "Exit":
          connection.end();
          console.log("Connection closed.");
          break;

        case "Remove An Employee":
          deleteAnEmployee();
          break;
      }
    });
}

function viewDepartments() {
  connection.query("SELECT * FROM departments", (err, res) => {
    if (err) throw err;
    console.log("Departments:");
    console.table(res);
    startApp();
  });
}

function viewRoles() {
  connection.query("SELECT * FROM roles", (err, res) => {
    if (err) throw err;
    console.log("Roles:");
    console.table(res);
    startApp();
  });
}

function viewEmployees() {
  connection.query("SELECT * FROM employees", (err, res) => {
    if (err) throw err;
    console.log("Employees:");
    console.table(res);
    startApp();
  });
}

