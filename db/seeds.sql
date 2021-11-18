INSERT INTO  Department(id, names)
VALUES (001, "Management"),
    (002, "Marketing"),
    (003, "Finance");

INSERT INTO roles (id, title, salary, Department_id)
VALUES (001, "CEO", "120000"),
        (002, "COO", "100000"),
        (003, "Accountant", "90000"),
        (004, "Manager", "80000");

INSERT INTO employee (id, first_name, last_name, roles_id)
VALUES (001, "Paul", "Blart", ?),
    (002, "John", "Elway", ?),