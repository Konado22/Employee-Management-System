use employee_db;
INSERT INTO  department (name)
VALUES ("Management"),
    ("Marketing"),
    ("Finance");

INSERT INTO role (title, salary, Department_id)
VALUES ("CEO", 120000,1),
        ("COO", 100000,2),
        ("Accountant", 90000,1),
        ("Manager", 80000,3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ( "Paul", "Blart", 1,1),
    ( "John", "Elway", 2,2);