const fs = require("fs");
const path = require("path");
const col = require("./../col.js");
const inquirer = require("inquirer");
const base_dir = require("../basedir.js");
let options = {};
let file_path = "";
module.exports = function (filepath) {
    file_path = filepath;
    const config = fs.readFileSync(filepath).toString();
    let lines = config.split(/[\n\r]+/g);
    for (let i = 0; i < lines.length; i++) {
        if (lines[i][0] == "#") continue;
        let name = lines[i].split("=")[0];
        let value = lines[i].split("=", 2)[1];
        if (name != "") options[name] = value;
    }
    _process();
};

function _process() {
    inquirer.prompt([{
        type: "rawlist",
        choices: [...Object.keys(options).map(key => {
            return {
                name: key.replace(/[^a-zA-Z]/g, " ") + "(" + (options[key] == "" ? "unset" : options[key]) + ")",
                value: key
            };
        }), {
            name: "SAVE_AND_EXIT",
            message: "SAVE & EXIT"
        }],
        name: "target_property",
        message: "please pick an option to configure\n"
    }]).then(answer => {
        if (answer.target_property == "SAVE_AND_EXIT") {
            let property_file = Object.keys(options).map(_ => _ + "=" + options[_]).join("\n");
            fs.writeFileSync(file_path, property_file);
            process.exit();
        }
        inquirer.prompt([{
            type: "input",
            name: answer.target_property,
            message: answer.target_property.replace(/[^a-zA-Z]/g, " "),
            default: options[answer.target_property]
        }]).then(ans => {
            options = {
                ...options,
                ...ans
            }
            _process();
        });
    });
}