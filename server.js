//packages
const mysql = require("mysql2");
const inquirer = require("inquirer");
const rowGen = require("console.table");
const express = require("express");
const app = express();
require('dotenv').config()
const PORT = process.env.PORT || 3001;
// mysql connection
const connection = mysql.createConnection(
  {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  },
  console.log(`Connected to Database at ${PORT}`)
);
//callbacks
function promptCMD() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "answers",
        message: "Please Select a following option:",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Update employee role",
        ],
      },
    ])
    .then((resp) => {
      console.log(resp)
      if (resp = resp.answers[0]) {
        connection.execute(`SELECT * FROM department;`, function (res) {
         console.table(res);
          promptCMD();
        });
      } else if (resp =resp.answers[1]) {
        connection.execute(`SELECT * FROM roles;`, (res) => {
          console.table(res);
          promptCMD();
        });
      } else if (resp = resp.answers[2]) {
        connection.execute(`SELECT * FROM employee;`, (res) => {
          console.table(res);
          promptCMD();
        });
      } else if (resp = resp.answers[3]) {
        addDepartment();
      } else  if (resp = resp.answers[4]){
        updateRole();
      }
    });
}
promptCMD();

function addDepartment() {
  const newDept = {};
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the name of the new department",
        name: "deptName",
      },
      {
        type: "input",
        message: "What is the department id?",
        name: "deptId",
      },
    ])
    .then((answers) => {
      newDept.name = answers.deptName;
      newDept.id = answers.deptId;
      const addDept = connection.execute(
        `INSERT INTO department(name) VALUES (${newDept.name})`,
        (res) => {
          console.table(res);
          promptCMD();
        }
      );
    });
}
function updateRole() {
  const newRoleStarter = {
    first_name: "",
    last_name: "",
  };
  connection.execute(
    `SELECT first_name, last_name FROM employee; `,
    (err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.table(res);
        newRoleStarter.push([res.first_name + " " + res.last_name]);
        inquirer
          .prompt([
            {
              type: "list",
              message: "please select an employee to edit",
              choices: newRoleStarter,
            },
            {
              type: "input",
              message: "what is their new role?",
              choices: ["CEO", "COO", "Accountant", "Manager"],
            },
          ])
          .then((answer) => {
            connection.execute(`UPDATE ems_db.employee WHERE roles.id = ? `);
          });
          
      }
    }
  );
}
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
