const path = require("path");
const fs = require("fs");
module.exports = path.resolve(process.env.APPDATA, "./mcserve");
if (!fs.existsSync(module.exports)) {
    fs.mkdirSync(module.exports);
}