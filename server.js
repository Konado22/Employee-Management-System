//packages
const mysql = require("mysql2");
const inquirer = require("inquirer");
const rowGen = require("console.table");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
//mysql connection
const connection = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "root",
    database: "ems_db",
  },
  console.log(`Connected to Database at http://localhost:${PORT} `)
);
//routes
app.get("/", promptCMD);
app.get("/department", promptCMD);
app.get("/roles", promptCMD);
app.get("/");
//route callbacks
function promptCMD(req, res) {
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
    .then(async (answers) => {
      if ((answers.choices = choices[0])) {
        const allDep = await connection.query(`SELECT * FROM Department`);
        console.log(allDep);
        return promptCMD();
      } else if ((answers.choices = choices[1])) {
        const allDep = await connection.query(`SELECT * FROM roles`);
        console.log(allDep);
        return promptCMD();
      } else if ((answers.choices = choices[2])) {
        const allDep = await connection.query(`SELECT * FROM employee`);
        console.log(allDep);
        return promptCMD();
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
    .then ( async (answers) => {
      newDept.name = answers.deptName;
      newDept.id = answer.deptId;
      const addDept = await connection.query(`INSERT INTO Department(id,name) VALUES (${newDept.id}, ${newDept.name})`)
    });
}
function updateRole() {
  const newRole = {
    id: "",
    first_name: "",
    last_name: "",
    manager_id: "",
    
  };
}
