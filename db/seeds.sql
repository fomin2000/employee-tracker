USE employeeDB;

INSERT INTO department (name)
VALUES ('Engineering'), ('Finance'), ('Legal'), ('Sales'), ('Service');

INSERT INTO role (title, salary, department_id)
VALUES ('Lead Engineer', 150000, 1),
('Software Engineer', 125000, 1),
('Intern Engineer', 55000, 1),
('Account Manager', 120000, 2),
('Accountant', 90000, 2),
('Finance Manager', 157000, 2),
('Lawyer', 210000, 3),
('Legal Team Lead', 250000, 3),
('Staff Attorney', 174000, 3),
('Sales Manager', 100000, 4),
('Salesman', 72500, 4),
('Online Sales Manager', 125000, 4),
('Customer Service Manager', 80000, 5),
('Service Rep', 60000, 5),
('Customer Account Assistant', 15000, 5);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Regina', 'Harding', 1, NULL),
('Brodie', 'Mata', 2, 1),
('Lillie', 'Perry', 3, NULL),
('Waylon', 'Chambers', 4, 1),
('Makayla', 'Avery', 5, NULL),
('Jakari', 'Glover', 6, 1),
('Alessia', 'Sanchez', 7, NULL),
('Joseph', 'Esquivel', 8, 1),
('Jaylee', 'Stephens', 9, NULL),
('Messiah', 'Orozco', 10, 1),
('Renata', 'Wheeler', 11, NULL),
('Kenneth', 'Holt', 12, 1),
('Adelynn', 'Lopez', 13, NULL),
('Michael', 'Blankenship', 14, 1),
('Rosalee', 'Wallace', 15, NULL);