const fs = require("fs");
const path = require("path");
const download_file = require("download-file");
const base_path = path.resolve(process.env.APPDATA, "./.minecraft/versions");
const launch = require("./../launch.js");
const col = require("./../col.js");
const base_dir = require("../basedir.js");
module.exports = function (args) {
    let pack = require(path.resolve(base_path, args.version, args.version + ".json"));
    if (pack.inheritsFrom) {
        pack = require(path.resolve(base_path, pack.inheritsFrom, pack.inheritsFrom + ".json"));
    }
    let url = pack.downloads.server.url;
    let profile_string = JSON.stringify(args);
    if (fs.existsSync(path.resolve(base_dir, "./profiles/", args.name))) {
        console.log("unable to create profile as the profile name " + args.name + " exists.");
        return -1;
    }
    console.log(`${col.FgBlue}INFO ${col.FgWhite}${col.Bright}downloading server jar${col.Reset}`);
    download_file(url, {
        directory: path.resolve(base_dir, "./profiles/", args.name),
        filename: "server.jar"
    }, function (...arg) {
        console.log(`${col.FgBlue}INFO ${col.FgWhite}${col.Bright}download finished${col.Reset}`);
        let isOk = arg.constructor == Array && arg.length == 2;
        if (isOk) {
            setTimeout(() => {
                fs.writeFileSync(path.resolve(base_dir, "./profiles/", args.name, "./profile.json"), profile_string);
                console.log(`${col.FgBlue}INFO${col.FgWhite} ${col.Bright}Attempting first launch.${col.Reset}`)
                launch(path.resolve(base_dir, "./profiles/", args.name, "./server.jar"));
                console.log(`${col.FgBlue}INFO${col.FgWhite} ${col.Bright}please ensure you update the minecraft eula${col.Reset}`);
                require('child_process').exec('start "" "' + path.resolve(base_dir, "./profiles/", args.name) + '"');
            }, 1000);
        } else {
            console.log(`${col.FgRed}ERR${col.FgWhite} an error has occured`, arg);
        }
    });
}