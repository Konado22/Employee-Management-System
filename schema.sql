DROP DATABASE IF EXISTS ems_db;
CREATE DATABASE ems_db;
USE DATABASE ems_db;
CREATE TABLE Department(
    id: INT PRIMARY KEY,
    name: VARCHAR(30)
);
CREATE TABLE roles(
    id: INT PRIMARY KEY,
    title: VARCHAR(30) NOT NULL,
    salary:DECIMAL NOT NULL,
    department_id: INT NOT NULL
);
CREATE TABLE employee(
    id: INT PRIMARY KEY,
    first_name: VARCHAR(30) NOT NULL,
    last_name: VARCHAR(30) NOT NULL,
    role_id:INT,
    manager_id:INT
)