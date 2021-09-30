const { prompt } = require ('inquirer')
const { createConnection } = require('mysql2')
require('console.table')

const db = createConnection('mysql://root:rootroot@localhost/employeez_db')

const init = () => {
  prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do',
      choices: ['Add Department', 'Add Role', 'Add Employee', 'View Departments', ' View Roles', 'View Employees', 'Update Employees']
    }
  ])
  .then(({ action }) => {
    switch (action) {
      case value: 'Add Department':
        addDepartment()
        break;
      case value: 'Add Role':
        addRole()
        break;
      case value: 'Add Employee':
        addEmployee()
        break;
      case value: 'View Departments':
        viewDepartments()
        break;
      case value: 'View Roles':
        viewRoles()
        break;
      case value: 'View Employees':
        viewEmployees()
        break;
      case value: 'Update Employees':
        updateEmployees()
        break;
    }
  })
}
//WK7DY3 02:52:40
const viewDepartments = () => {
  db.query('SELECT * FROM departments', (err, departments) => {

  })
}

