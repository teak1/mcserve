const fs = require("fs");
const path = require("path");
module.exports = [{
        type: 'rawlist',
        name: 'version',
        message: 'Game Version',
        choices: fs.readdirSync(path.resolve(process.env.APPDATA, "./.minecraft/versions"))
    },
    {
        type: 'input',
        name: 'name',
        message: "Profile Name",
    }
];