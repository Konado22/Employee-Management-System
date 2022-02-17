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
      newDept = answers.deptName;
      db.query(
        `INSERT INTO department(name) VALUES (${newDept.name});`,
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
  const newRoleStarter = {};
  db.query(
    `SELECT * first_name, last_name FROM employeedb.employee; `,
    (err, answers) => {
      if (err) {
        console.log(err);
      } else {
        newRoleStarter.push({name: answers.first_name + ' ' + answers.last_name});
        inquirer
          .prompt([
            {
              type: "list",
              message: "please select an employee to edit",
              choices: newRoleStarter,
              
            },
            // {
            //   type: "input",
            //   message: "what is their new role?",
            //   choices: ["CEO", "COO", "Accountant", "Manager"],
            // },
          ])
          .then(() => {
            const empName = answer.name
            db.query(`UPDATE ems_db.employee WHERE roles.id = ${data} ;`, (answer,err) => {
              console.table(answer.value)
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
          "Update employee role",
          "Exit"
        ],
      },
    ])
    .then((answer) => {
      console.log(answer)
      var selection = answer.primaryChoice
      console.log(selection)
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
      }
      else {
        console.log("BYE")
        return
      }
    });
}
promptCMD();

// app.listen(PORT, () => {
//   console.log(`App listening on port ${PORT}!`);
// });
