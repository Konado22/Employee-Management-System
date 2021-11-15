//packages
const mysql = require('mysql2');
const inquirer= require('inquirer');
const rowGen = require("console.table");
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
//mysql connection
const connection= mysql.createConnection({
    host:'localhost',
    user:"root",
    password:"root",
    database:"ems_db"

},
console.log("Connected to Database..."));

function promptCMD (){ inquirer.prompt([{
    type: 'list',
    name:"answer1",
    message: "Please Select a following option:",
    choices: ["View all departments","View all roles", "View all employees", "Add a department","Update employee role"]
}])
.then((answers) => {
if(answers.choices=choices[0]){
    connection.query(`SELECT Department`)
    return promptCMD();
}
else if(answers.choices=choices[1]){
    connection.query(`SELECT roles`)
    return promptCMD();
}
else if(answers.choices=choices[2]){
    connection.query(`SELECT employee`)
    return promptCMD();
}
else if(answers.choices=choices[3]){
    connection.query(`SELECT roles`)
}
})};
function addDepartment(){};
function updateRole(){};
