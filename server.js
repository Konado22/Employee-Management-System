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
  // var array = []
  // var deptRef = db.query(`SELECT * FROM employee_db.department;`, (res,err) => {
  //   if (err) {
  //     console.log(err)
  //   }
  //   array.push(deptRef)
  // })
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the new Role",
        name: "roleName",
      },
      {
        type: "input",
        message: "What is the salary",
        name: "salary",
      },
      {
        /////////////////////////////////////////////////////////
        type: "input",
        message: "Which Department do they report to: Marketing:1 Management:2 Finance:3",
        name: "newDeptId",
      },
    ])
    .then((answers) => {
      var newRole = answers.roleName;
      var newSalary = answers.salary
      var newDepartment = answers.newDeptId ;

      db.query(
        `INSERT INTO role(title, salary, Department_id) VALUES ("${newRole}", ${newSalary}, ${newDepartment});`,
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
        message: "What is the first name of the new Employee",
        name: "employeeFirstName",
      },
      {
        type: "input",
        message: "What is the last name of the new Employee",
        name: "employeeLastName",

      },
      {
        type: "input",
        message: "What is their role: CEO:1 COO:2 Accountnt:3 Manager:4",
        name: "employeeRole",

      },
      {
        type: "input",
        message: "Which Department do they report to: Marketing:1 Management:2 Finance:3",
        name: "employeeDepartment",

      }

    ])
    .then((answers) => {
      var newFirst = answers.employeeFirstName;
      var newLast = answers.employeeLastName;
      var newRoleId = answers.employeeRole;
      var newDepartmentId = answers.employeeDepartment;

      db.query(
        `INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("${newFirst}", "${newLast}", ${newRoleId}, ${newDepartmentId});`,
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
              type: "input",
              message: "what is their new role? CEO: 1, COO: 2, Accountant: 3, Manager: 4",
              name: "currentRole"
            },
          ])
          .then((answer) => {

            let emp = answer.editEmployee;
             const first =()=> {
              emp.splice(1,1)
              return new emp
             }
             const last = () => {
              emp.splice(1,0)
              return new emp
             } 
            let newRole = answer.currentRole;
            // var arr = []
            // const empName = answer.editEmployee
            // let choices = ["CEO", "COO", "Accountant", "Manager"]
            // const positionId = choices.indexOf(answer.currentPosition)
            // db.query(`select * from employee_db.role`, (res,err) => {
            //   if (err) {
            //     console.log(err)
            //   }
            //   res.forEach(role => {
            //     arr.push(role)
            //   });
            // })
            db.query(`UPDATE employee_db.employee WHERE  first_name = ${first}, last_name = ${last}, roles.id = ?, where department_id= ?;`, [newRole, emp] , (answer,err) => {
              console.table(answer)
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
          // "Update employee role",
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
// save for logic on looping questions from db
// var array = []
// var totalDept = db.query(`SELECT * FROM employee_db.department`,(res,err) => {
//   if (err) {
//     console.log(err)
//   }
//   res.forEach( (res) => {
//     array.push({
//       title:res.title,
//       salary:res.salary,
//       id:res.id
//     })
//   })
// })
