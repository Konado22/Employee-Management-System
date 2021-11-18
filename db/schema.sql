DROP DATABASE IF EXISTS ems_db;
CREATE DATABASE ems_db;
USE DATABASE ems_db;
DROP TABLE IF EXISTS department;
CREATE TABLE department(
    id INT PRIMARY KEY AUTO_INCREMENT,
    names VARCHAR(30),
);
DROP TABLE IF EXISTS roles;

CREATE TABLE roles(
    id INT AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salaryDECIMAL NOT NULL,
    FOREIGN KEY(Department_id)
    REFERENCES Departments(id)
    ON DELETE SET NULL,
    PRIMARY KEY(id)
);
CREATE TABLE employee(
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    FOREIGN KEY(roles_id)
    REFERENCES roles(id)
    ON DELETE SET NULL,
);