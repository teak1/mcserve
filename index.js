const col = require("./col.js");
const fs = require("fs");
const path = require("path");
var inquirer = require('inquirer');
const launch = require("./launch.js");
const base_dir = require("./basedir.js");
console.log(base_dir);
let inputs = [];
module.exports = require('yargs').command('start', 'start a server from a profile', (argv) => {
    inquirer.prompt([{
        type: 'rawlist',
        name: 'version',
        message: 'Profile',
        choices: fs.readdirSync(path.resolve(base_dir, "./profiles"))
    }, {
        type: 'input',
        name: 'port',
        message: 'Port',
        validate: function (value) {
            var valid = !isNaN(parseFloat(value));
            return valid || 'Please enter a number';
        },
        filter: Number,
        default: 25565
    }]).then(answers => {
        const server_path = path.resolve(base_dir, "./profiles", "./" + answers.version, "./server.jar");
        launch(server_path);
    });
}).command('create', 'create a profile', (yargs) => {}, async (argv) => {
    inquirer.prompt(require("./prompt/create.js"))
        .then(answers => {
            require("./operation/create.js")(answers);
        });
}).command('config', 'update the server properties for a profile', (yargs) => {
    inquirer.prompt([{
        type: 'rawlist',
        name: 'version',
        message: 'Profile',
        choices: fs.readdirSync(path.resolve(base_dir, "./profiles"))
    }]).then(answers => {
        const properties_path = path.resolve(base_dir, "./profiles", "./" + answers.version, "./server.properties");
        require("./operation/properties.js")(properties_path);
    });
}).command('open', 'open the folder for a profile', (yargs) => {
    inquirer.prompt([{
        type: 'rawlist',
        name: 'version',
        message: 'Profile',
        choices: fs.readdirSync(path.resolve(base_dir, "./profiles"))
    }]).then(answers => {
        const file_path = path.resolve(base_dir, "./profiles", "./" + answers.version);
        require('child_process').exec('start "" "' + file_path + '"');
    });
}).showHelpOnFail(true).demandCommand(1, '').argv;