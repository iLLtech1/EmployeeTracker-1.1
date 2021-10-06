# EmployeeTracker-1.1

Error Code: 1007. Can't create database 'employeez_db'; database exists
Error Code: 1054. Unknown column 'roles.salary' in 'field list'
Error Code: 1054. Unknown column 'roles.salary' in 'field list'

Error Code: 1050. Table 'departments' already exists
Error Code: 1054. Unknown column 'roles.salary' in 'field list'

  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,

SELECT roles.id, roles.title, roles.salary, departments.name AS department FROM roles LEFT JOIN departments ON roles.department_id = departments.id
