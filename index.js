const { prompt } = require('inquirer')
const { fetchAsyncQuestionProperty } = require('inquirer/lib/utils/utils')
const { createConnection } = require('mysql2')
require('console.table')

const db = createConnection('mysql://root:rootroot@localhost/employeez_db')

const init = () => {
  prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do',
      choices: ['Add Department', 'Add Role', 'Add Employee', 'View Departments', 'View Roles', 'View Employees', 'Update Employee']
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
          addEmployee()
          break;
        case 'View Departments':
          viewDepartments()
          break;
        case 'View Roles':
          viewRoles()
          break;
        case 'View Employees':
          viewEmployees()
          break;
        case 'Update Employee':
          updateEmployee()
          break;
      }
    })
}

//03:03:51
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

//03:14:00
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
          console.log(`----${newRole.title} role created----`)
        }
        init()
      })
    })
    .catch(err => console.log(err))
}

//03:19:28
const addEmployee = () => {
  prompt([{
    type: 'input',
    name: 'first_name',
    message: `Employee's first name?`
  },
  {
    type: 'input',
    name: 'last_name',
    message: `Employee's last name?`
  },
  {
    type: 'input',
    name: 'role_id',
    message: `Employee's Role Id?`
  },
  {
    type: 'number',
    name: 'manager_id',
    message: `Employee's Manager ID?`
  }
  ])
    .then(newEmp => {
      if (!newEmp.manager_id) {
        delete newEmp.manager_id
      }
      console.log(newEmp)

      db.query('INSERT INTO employees SET ?', newEmp, err => {
        if (err) { console.log(err) }
        else { console.log(`----${newEmp.first_name} has been added----`) }
        init()
      })
    })
    .catch(err => console.log(err))
}

//03:41:00
const updateEmployee = () => {
  db.query('SELECT * FROM roles', (err, roles) => {
    db.query('SELECT * FROM employees', (err, employees) => {
      prompt([
        {
          type: 'list',
          name: 'id',
          message: 'Select and Butthead to Update',
          choices: employees.map(employee => ({
            name: `${employee.first_name} ${employee.last_name}`,
            value: employee.id
          }))
        },
        {
          type: 'list',
          name: 'role_id',
          message: `Employee's new Role: `,
          choices: roles.map(role => ({
            name: role.title,
            value: role.id
          }))
        },
        {
          type: 'list',
          name: 'manager_id',
          message: `Update Manager Status, please.`,
          choices: employees.map(employee => ({
            name: `${employee.first_name} ${employee.last_name}`,
            value: employee.id
          }))
        }
      ])
        .then(({ id, role_id, manager_id }) => {
          let update = {
            manager_id,
            role_id
          }
          db.query('UPDATE employees SET ? WHERE ?', [update, { id }], err => { 
            if (err) { console.log(err) }
            else { console.log('The Employee has been updated') }
            viewEmployees()
            init()
          })
        })
      .catch(err => console.log(err))//03:46:23
    })
  })
}

//WK7DY3 02:52:40
const viewDepartments = () => {
  db.query('SELECT departments.id, departments.name as department FROM departments', (err, departments) => {
    console.table(departments)
    init()
  })
}

const viewRoles = () => {
  db.query('SELECT roles.id, roles.title, roles.salary, departments.name as department FROM roles LEFT JOIN departments ON roles.department_id = departments.id', (err, roles) => {
    console.table(roles)
    init()
  })
}

const viewEmployees = () => {
  db.query(`SELECT employees.id, employees.first_name, employees.last_name, roles.title, roles.salary, departments.name AS 'department', CONCAT(manager.first_name, ' ', manager.last_name) AS 'manager' FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN departments ON roles.department_id = departments.id LEFT JOIN employees manager ON manager.id = employees.manager_id`, (err, employees) => {
    console.table(employees)
    init()
  })
}

init()