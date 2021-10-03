const { prompt } = require('inquirer')
const { createConnection } = require('mysql2')
require('console.table')

const db = createConnection('mysql://root:rootroot@localhost/employeez_db')

const init = () => {
  prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do',
      choices: ['Add Department', 'Add Role', 'Add Employee', 'View Departments', ' View Roles', 'View Employees', 'Update Employee']
    }
  ])
    .then(({ action }) => {
      switch (action) {
        case 'Add Department':
          addDepartment()
          break;
        case 'Add Role':
          addRole()
          break;
        case 'Add Employee':
          // addEmployee()
          break;
        case 'View Departments':
          viewDepartments()
          break;
        case 'View Roles':
          viewRoles()
          break;
        case 'View Employees':
          // viewEmployees()
          break;
        case 'Update Employees':
          // updateEmployees()
          break;
      }
    })
}

//WK7DY3 03:03:51
const addDepartment = () => {
  prompt([
    {
      type: 'input',
      name: 'name',
      message: `Please Enter New Department's Name`
    }
  ])
    .then(newDep => {
      db.query(`INSERT INTO departments SET ?`, newDep, err => {
        if (err) { console.log(err) }
        else {
          console.log(`----${newDep.name} Department has been added----`)
        }
        init()
      })
    })
    .catch(err => console.log(err))
}

//WK7DY3 03:14:00
const addRole = () => {
  prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Role Title: '
    },
    {
      type: 'number',
      name: 'salary',
      message: 'Role Salary: '
    },
    {
      type: 'input',
      name: 'department_id',
      message: 'Role Department_id: '
    }
  ])
    .then(newRole => {
      db.query(`INSERT INTO roles SET ?`, newRole, err => {
        if (err) { console.log(err) }
        else { 
          console.log(`----${newRole.title} role created----`) }
        init()
      })
    })
    .catch(err => console.log(err))
}

//WK7DY3 02:52:40
const viewDepartments = () => {
  db.query('SELECT departments.id, departments.name as department FROM departments', (err, departments) => {
    console.table(departments)
  })
}

const viewRoles = () => {
  db.query('SELECT roles.id, roles.title, roles.salary, departments.name as department FROM roles LEFT JOIN departments ON roles.department_id = departments.id', (err, roles) => {
    console.table(roles)
  })
}

const viewEmployees = () => {
  db.query(`SELECT employees.id, employees.first_name, employees.last_name, roles.title, roles.salary, departments.name AS 'department', CONCAT(manager.first_name, '', manager.last_name) AS 'manager' FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN departments ON roles.department_id = de[artments.id LEFT JOIN employees manager ON manager.id = employees.manager_id`, (err, employees) => {
    console.table(employees)
  })
}

init()





