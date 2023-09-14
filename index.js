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

function updateEmployeeRole() {
  connection.query("SELECT id, name FROM employees", (err, employeeRows) => {
    if (err) throw err;

    connection.query("SELECT id, name FROM roles", (err, roleRows) => {
      if (err) throw err;

      inquirer
        .prompt([
          {
            name: "employeeId",
            type: "list",
            message: "Select the employee to update:",
            choices: employeeRows.map((employee) => ({
              name: employee.name,
              value: employee.id,
            })),
          },
          {
            name: "roleId",
            type: "list",
            message: "Select the new role:",
            choices: roleRows.map((role) => ({
              name: role.name,
              value: role.id,
            })),
          },
        ])
        .then((answers) => {
          // Update the employee's role in the database
          connection.query(
            "UPDATE employees SET role_id = ? WHERE id = ?",
            [answers.roleId, answers.employeeId],
            (err) => {
              if (err) throw err;
              console.log("Employee role updated successfully.");
              startApp();
            }
          );
        });
    });
  });
}

function deleteAnEmployee() {
  connection.query("SELECT id, name FROM employees", (err, employeeRows) => {
    if (err) throw err;

    inquirer
      .prompt([
        {
          name: "employeeId",
          type: "list",
          message: "Select the employee to delete:",
          choices: employeeRows.map((employee) => ({
            name: employee.name,
            value: employee.id,
          })),
        },
      ])
      .then((answer) => {
        const employeeIdToDelete = answer.employeeId;

        connection.query(
          "DELETE FROM employees WHERE id = ?",
          [employeeIdToDelete],
          (err) => {
            if (err) throw err;
            console.log("Employee deleted successfully.");
            startApp();
          }
        );
      });
  });
}

async function createNewEmployee() {
  try {
    const roles = await fetchRolesFromDatabase();

    inquirer
      .prompt([
        {
          name: "name",
          type: "input",
          message: "Enter the employee name:",
        },
        {
          name: "roleId",
          type: "list",
          message: "Select the employee role:",
          choices: roles,
        },
      ])
      .then((answers) => {
        connection.query(
          "INSERT INTO employees (name, role_id) VALUES (?, ?)",
          [answers.name, answers.roleId],
          (err) => {
            if (err) throw err;
            console.log("New employee added successfully.");
            startApp();
          }
        );
      });
  } catch (error) {
    console.error("Error fetching roles:", error);
    startApp();
  }
}

function fetchRolesFromDatabase() {
  return new Promise((resolve, reject) => {
    connection.query("SELECT id, name FROM roles", (err, rows) => {
      if (err) reject(err);
      resolve(
        rows.map((role) => ({
          name: role.name,
          value: role.id,
        }))
      );
    });
  });
}

//NOTES:
// DEPARTMENTS, ROLES, and EMPLOYEES
// EMPLOYEES: Row, First & Last Name, Birthday, Availablilty?
// ROLES: Job Title, Employee Assigned to it, and Description.
// DEPARTMENTS: Different department titles
