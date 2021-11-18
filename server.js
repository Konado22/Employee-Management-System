//packages
const mysql = require("mysql2");
const inquirer = require("inquirer");
const rowGen = require("console.table");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
//mysql connection
require("dotenv").config();
const connection = mysql.createConnection(
  {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  console.log(`Connected to Database at ${PORT} `)
);
//callbacks
function promptCMD() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "answer1",
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
    .then((answers) => {
      if ((answers.choices = "View all departments")) {
        connection.query(`SELECT * FROM Department`, (err, res) => {
          console.table(res);
        });
        promptCMD();
      } else if ((answers.choices = choices[1])) {
        connection.query(`SELECT * FROM roles`, (err, res) => {
          console.table(res);
        });
        promptCMD();
      } else if ((answers.choices = choices[2])) {
        connection.query(`SELECT * FROM employee`, (err, res) => {
          if (err) {
            console.log(err);
          } else {
            console.table(res);
          }
        });
        promptCMD();
      } else if ((answers.choices = choices[3])) {
        connection.query(`SELECT roles`);
      }
    });
}
function addDepartment() {
  const newDept = {
    id: "",
    name: "",
  };
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
      const addDept = connection.query(
        `INSERT INTO Department(id,name) VALUES (${newDept.id}, ${newDept.name})`,
        (err, res) => {
          console.table(res);
        }
      );
    });
  promptCMD();
}
function updateRole() {
  const newRoleStarter = {
    first_name: "",
    last_name: "",
  };
  connection.query(
    `SELECT * first_name last_name FROM employee `,
    (err, res) => {
      if(err){
        console.log(err);
      } 
      else {
        console.table(res);
        forEachnewRoleStarter.push([res.first_name + " " + res.last_name]);
      }
    }
  );
}


