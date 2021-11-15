DROP DATABASE IF EXISTS ems_db;
CREATE DATABASE ems_db;
USE DATABASE ems_db;
CREATE TABLE Department(
    id: INT,
    names: VARCHAR(30),
    PRIMARY KEY(id)
);
CREATE TABLE roles(
    id: INT ,
    title: VARCHAR(30) NOT NULL,
    salary:DECIMAL NOT NULL,
    FOREIGN KEY(Department_id)
    REFERENCES Departments(id)
    ON DELETE SET NULL,
    PRIMARY KEY(id)
);
CREATE TABLE employee(
    id: INT PRIMARY KEY,
    first_name: VARCHAR(30) NOT NULL,
    last_name: VARCHAR(30) NOT NULL,
    FOREIGN KEY(roles_id)
    REFERENCES roles(id)
    ON DELETE SET NULL,
    manager_id:INT
)