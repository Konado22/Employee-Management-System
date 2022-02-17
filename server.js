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
);
db.connect( (err) => {
if (err) {
  console.log(err)
}
})
function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the name of the new department",
        name: "deptName",
      },
    ])
    .then((answers) => {
      var newDept = answers.deptName;
      db.query(
        `INSERT INTO department(name) VALUES ("${newDept}");`,
        (response,err) => {
          console.table(response);
          if (err) {
            console.log(err)
          }
           promptCMD();
        }
      );
    });
}
function addRole() {
  //need to add salary as it is required
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the name of the new Role",
        name: "roleName",
      },
      {
        type: "input",
        message: "What is the salary",
        name: "salary",
      },
      {
        type: "input",
        message: "Which Department do they report to",
        name: "salary",
      },
    ])
    .then((answers) => {
      var newRole = answers.roleName;
      var newSalary = answers.salary
      db.query(
        `INSERT INTO role(title, salary) VALUES ("${newRole}"), ("${newSalary}");`,
        (response,err) => {
          console.table(response);
          if (err) {
            console.log(err)
          }
           promptCMD();
        }
      );
    });
}
function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the name of the new Employee",
        name: "employeeName",
      },
    ])
    .then((answers) => {
      var newEmployee = answers.employeeName;
      db.query(
        `INSERT INTO department(name) VALUES ("${newEmployee}");`,
        (response,err) => {
          console.table(response);
          if (err) {
            console.log(err)
          }
           promptCMD();
        }
      );
    });
}

function updateRole() {
  var newRoleStarter = [];
  //
  db.query(
    `SELECT * FROM employee_db.employee; `,
    (err, answers) => {
      if (err) {
        console.log(err);
      } else {
        answers.forEach((res) => {
          newRoleStarter.push(res.first_name + ' ' + res.last_name);
        })
        inquirer
          .prompt([
            {
              type: "list",
              message: "please select an employee to edit",
              choices: newRoleStarter,
              name: "editEmployee"
              
            },
            {
              type: "list",
              message: "what is their new role?",
              choices: ["CEO", "COO", "Accountant", "Manager"],
              name: "currentPosition"
            },
          ])
          .then((answer) => {
            const empName = answer.editEmployee
            db.query(`UPDATE employee_db.employee WHERE roles.title = ${empName} ;`, (answer,err) => {
              console.table(empName)
              if (err) {
                console.log(err)
              }
            });
             promptCMD();
          });
          
      }
    }
  );
 
}
function viewDepartments () {
  db.query(`SELECT * FROM employee_db.department;`,  (answer, err) => {
    console.table(answer);
    if (err) {
      console.log(err)
    }
      promptCMD();
   });
}
function viewRoles () {
  db.query(`SELECT * FROM employee_db.role;`, (answers,err) => {
    console.table(answers);
    if (err) {
      console.log(err)
    }
     promptCMD();
  });
}
function viewEmployees () {
  db.query(`SELECT * FROM employee_db.employee;`, (answers,err) => {
    console.table(answers);
    if (err) {
      console.log(err)
    }
     promptCMD();
  });
}

//callbacks
function promptCMD() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "primaryChoice",
        message: "Please Select a following option:",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add role",
          "Add employee",
          "Update employee role",
          "Exit"
        ],
      },
    ])
    .then((answer) => {
      // console.log(answer)
      var selection = answer.primaryChoice
      // console.log(selection)
      if (selection ==="View all departments" ) {
        viewDepartments();
        
      } else if (selection === "View all roles" ) {
        viewRoles ()
      } else if (selection === "View all employees" ) {
        viewEmployees ()
      } else if (selection === "Add a department" ) {
        addDepartment()
      } else  if (selection === "Update employee role" ){
        updateRole()
        //still needs attention
      }
      else if (selection === "Add role" ){
        addRole();
        //need to fix query
      }
      else if (selection === "Add employee" ){
        addEmployee();
        //need to fix query
      }
      else {
        console.log("BYE AND THANKS FOR USING")
        return
      }
    });
}
promptCMD();

// app.listen(PORT, () => {
//   console.log(`App listening on port ${PORT}!`);
// });
