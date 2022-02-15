use ems_db;
INSERT INTO  department (names)
VALUES ("Management"),
    ("Marketing"),
    ("Finance");

INSERT INTO roles (title, salary, Department_id)
VALUES ("CEO", 120000,1),
        ("COO", 100000,2),
        ("Accountant", 90000,1),
        ("Manager", 80000,3);

INSERT INTO employee (first_name, last_name, roles_id)
VALUES ( "Paul", "Blart", 1),
    ( "John", "Elway", 2);