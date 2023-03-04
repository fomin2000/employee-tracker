const db = require('./connection')
const inquirer = require('inquirer')



const init = () => {
    console.log(`
        ,-----------------------------.
        |                             |
        |         Employee            |
        |             Manager         |
        |                             |
        |_____________________________|
    `)

    return inquirer.prompt([
        {
            name: 'prompt',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                'View All Departments', 
                'View All Roles', 
                'View All Employees', 
                'Add Department', 
                'Add Role', 
                'Add Employee', 
                'Update Employee Role',
                'Close Application'
            ]
        }
    ]).then((response) => {
        switch (response.prompt) {
            case 'View All Departments':
                viewDepartments()
                break
            case 'View All Roles':
                viewRoles()
                break
            case 'View All Employees':
                viewEmployees()
                break
            case 'Add Department':
                addDepartment()
                break
            case 'Add Role':
                addRole()
                break
            case 'Add Employee':
                addEmployee()
                break
            case 'Update Employee Role':
                updateEmployeeRole()
                break
            case 'Close Application':
                db.end()
                break
        }
    })
}

const continuePrompt = () => {
    return inquirer.prompt([
        {
            name: 'prompt',
            type: 'list',
            message: 'Would you like to do anything else?',
            choices: [
                'View All Departments', 
                'View All Roles', 
                'View All Employees', 
                'Add Department', 
                'Add Role', 
                'Add Employee', 
                'Update Employee Role',
                'Close Application'
            ]
        }
    ]).then((response) => {
        switch (response.prompt) {
            case 'View All Departments':
                viewDepartments()
                break
            case 'View All Roles':
                viewRoles()
                break
            case 'View All Employees':
                viewEmployees()
                break
            case 'Add Department':
                addDepartment()
                break
            case 'Add Role':
                addRole()
                break
            case 'Add Employee':
                addEmployee()
                break
            case 'Update Employee Role':
                updateEmployeeRole()
                break
            case 'Close Application':
                db.end()
                break
                
        }
    })
}

const viewDepartments = () => {
    db.query('SELECT * FROM department', (err, res) => {
        if (err) throw err
        console.table(res)
        continuePrompt();
    })
}

const viewRoles = () => {
    db.query('SELECT * FROM role', (err, res) => {
        if (err) throw err
        console.table(res)
        continuePrompt();
    })
}

const viewEmployees = () => {
    db.query('SELECT * FROM employee', (err, res) => {
        if (err) throw err
        console.table(res)
        continuePrompt();
    })
}

const addDepartment = () => {
    return inquirer.prompt([
        {
            name: 'department',
            type: 'input',
            message: 'What is the name of the department that you would like to add?',
        }
    ]).then((data) => {
        db.query(`INSERT INTO department (name) VALUES ('${data.department}')`)
        continuePrompt()
    })
}

const addRole = () => {
    db.query('SELECT * FROM department', (err, res) => {
        return inquirer.prompt([
            {
                name: 'title',
                type: 'input',
                message: 'What is the title of the role that you would like to add?',
            },
            {
                name: 'salary',
                type: 'input',
                message: 'What is the salary of the role that you entered?',
            },
            {
                name: 'department',
                type: 'list',
                message: 'What department does this role belong to?',
                choices: res.map((item) => item.name)
            }
        ]).then((data) => {
            const departmentName = res.find((department) => department.name === data.department)

            db.query(`INSERT INTO role (title, salary, department_id) VALUES ('${data.title}', '${data.salary}', ${departmentName.id})`)
            continuePrompt()
        })
    })
}

const addEmployee = () => {
    return inquirer.prompt([
        {
            name: 'first_name',
            type: 'input',
            message: 'What is the employee first name?',
        },
        {
            name: 'last_name',
            type: 'input',
            message: 'What is the employee last name?',
        },
        {
            name: 'role_id',
            type: 'input',
            message: 'What is the employee role ID?'
        }
    ]).then((response) => {
        db.query(`INSERT INTO employee (first_name, last_name, role_id) VALUES ("${response.first_name}", "${response.last_name}", ${response.role_id})`)
        continuePrompt()
    })
}

const updateEmployeeRole = () => {
    db.query('SELECT * FROM employee', (err, data) => {
        return inquirer.prompt([
            {
                name: 'employee',
                type: 'list',
                message: 'Which employees role would you like to update?',
                choices: data.map((employee) => `${employee.first_name} ${employee.last_name}`)
            }, 
            {
                type: 'input',
                name: 'role_id',
                message: 'What is the new role ID for this employee?'
            }
        ]).then((response) => {
            const employee = data.find((employee) => `${employee.first_name} ${employee.last_name}` === response.employee)
            db.query('UPDATE employee SET role_id = ? WHERE id= ?', [response.role_id, employee.id],
            (err, res) => {
              if (err) throw err
              console.log('Employee role updated!')
              continuePrompt()
            })
        })
    })
}


init ()

