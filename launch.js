const path = require("path");
const cp = require("child_process");
const base_dir = require("./basedir.js");
let file;
module.exports = function (uri) {
    process.stdin.resume();
    file = cp.exec("java -jar \"" + path.resolve(base_dir, uri) + "\" -nogui", {
        cwd: path.resolve(base_dir, uri, "..")
    });
    process.stdin.on('data', (data) => {
        file.stdin.write(data);
    });
    file.stdout.on('data', (data) => {
        process.stdout.write(data);
    });
    file.on("close", () => {
        process.exit();
    })
}