//packages
const mysql = require("mysql2");
const inquirer = require("inquirer");
// const table = require("console.table");
require('dotenv').config()
const PORT = process.env.PORT || 3001;
// mysql connection
const db = mysql.createConnection(
  {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST
  },
  console.log(`Connected to Database at ${PORT}`)
);
db.connect( (err) => {
if (err) {
  console.log(err)
}
})
function addDepartment() {
  const newDept = {};
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the name of the new department",
        name: "deptName",
      },
    ])
    .then((answers) => {
      newDept.name = answers.deptName;
      db.query(
        `INSERT INTO department(name) VALUES (${newDept.name})`,
        (res) => {
          console.table(res);
          return promptCMD();
        }
      );
    });
}
function updateRole() {
  const newRoleStarter = {};
  db.query(
    `SELECT first_name, last_name FROM employee; `,
    (err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.table(res);
        newRoleStarter.push({name: res.first_name + ' ' + res.last_name});
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
            db.query(`UPDATE ems_db.employee WHERE roles.id = ? `);
            return promptCMD();
          });
          
      }
    }
  );
 
}
function viewDepartments () {
  db.query(`SELECT * FROM department;`,  (res) => {
    console.table(res);
     return promptCMD();
   });
}
function viewRoles () {
  db.query(`SELECT * FROM roles;`, (res) => {
    console.table(res);
    return promptCMD();
  });
}
function viewEmployees () {
  db.query(`SELECT * FROM employee;`, (res) => {
    console.table(res);
    return promptCMD();
  });
}

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
      if (resp ="View all departments") {
        viewDepartments();
        
      } else if (resp ="View all roles") {
        viewRoles ()
      } else if (resp ="View all employees") {
        viewEmployees ()
      } else if (resp ="Add a department") {
        addDepartment()
      } else  if (resp = "Update employee role"){
        updateRole()
      }
    });
}
promptCMD();

// app.listen(PORT, () => {
//   console.log(`App listening on port ${PORT}!`);
// });
