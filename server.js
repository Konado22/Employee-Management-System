const mysql = require('mysql2');
const inquirer= require('inquirer');
const rowGen = require("console.table");
const connection= mysql.createConnection({
    host:'localhost',
    user:"root",
    password:"root",
    database:"ems_db"

})

inquirer.list([{
    name:"firstResp",
    message: "Please Select a following option:",
    choices: ["View all departments","View all roles", "View all employees", "Add a department","Update employee role"]
}])