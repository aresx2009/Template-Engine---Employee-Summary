const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

const questions = () => [
    {
        type: "input",
        name: "name",
        message: "What is this employee's name?"
    },
    {
        type: "input",
        name: "id",
        message: "What is this employee's id?"
    },
    {
        type: "input",
        name: "email",
        message: "What is this employee's email?"
    }
];


// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

let teamMember = [];
let employeeId = [];


// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

const myTeam = () => {
    const newManager = async () => {
        const res = await inquirer.prompt([...questions("manager"), {
            type: "input",
            name: "officeNumber",
            message: "What's Manager's office Number?"
        }]);
        const { name, id, email, officeNumber } = res;
        const manager = new Manager(name, id, email, officeNumber);

        teamMember.push(manager);
        employeeId.push(id);

        addAnother();
    };
    const newEngineer = async () => {
        const res = await inquirer.prompt([...questions("engineer"), {
            type: "input",
            name: "username",
            message: "What's this engineer's github username?"
        }]);
        const { name, id, email, username } = res;
        const engineer = new Engineer(name, id, email, username);

        teamMember.push(engineer);
        employeeId.push(id);

        addAnother();
    };
    const newIntern = async () => {
        const res = await inquirer.prompt([...questions("intern"), {
            type: "input",
            name: "school",
            message: "Where does this intern go to school?"
        }]);
        const { name, id, email, school } = res;
        const intern = new Intern(name, id, email, school);

        teamMember.push(intern);
        employeeId.push(id);

        addAnother();
    };
    const addAnother = async () => {
        const res = await inquirer.prompt([
            {
                type: "list",
                name: "add",
                message: "Add another employee?",
                choices: ["add another Engineer", "add another Intern", "Create team profile!!"]
            }
        ]);
        switch (res.add) {
            case "add another Engineer": newEngineer(); break;
            case "add another Intern": newIntern(); break;
            default: fs.writeFileSync(outputPath, render(teamMember), "UTF-8");
        }
    }
    newManager();
}

myTeam();


// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an 
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!```
