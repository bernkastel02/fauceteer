#!/usr/bin/env node

const program = require('commander');
const general = require(__dirname + "/lib/general.js");
const Spigot = require(__dirname + "/lib/Spigot.js");
const version = require(__dirname + "/package.json").version;
const fs = require("fs");
const yaml = require('js-yaml');
const inquirer = require('inquirer');
const https = require("https");
const request = require("request");

program
    .version('Fauceteer CLI Version "0.01.1.0037 (Astral)"', "-v, --version")


// Initialize Command

program
    .command('init')
    .description("Initialize a settings folder.")
    .action(function() {
        return init();
    })

// Generate
program
    .command("new <type>")
    .description("Generate a new server.")
    .action(function(type) {
        general.m("This is not a finished feature!")
    });



function init() {
    var cwd = process.cwd();
    if (!fs.existsSync(`${cwd}/.fauceteer`)) {
        general.n("Beginning creation of base folder in [" + cwd + "/]");
        fs.mkdir(`${cwd}/.fauceteer`, (err) => {
            if (err) return general.e(err);
            general.n("Created [" + cwd + "/.fauceteer]");
            fs.mkdir(`${cwd}/.fauceteer/ssh`, (err) => {
                if (err) return general.e(err);
                general.n("Created [" + cwd + "/.fauceteer/ssh]");
                fs.writeFile(`${cwd}/.fauceteer/settings`, fs.readFileSync(__dirname + "/base-settings", "utf-8"), "utf-8", (err) => {
                    if (err) return general.e(err);
                    general.n("Created [" + cwd + "/.fauceteer/settings]");
                    fs.writeFile(`${cwd}/.fauceteer/servers.json`, JSON.stringify({}, null, 4), "utf-8", (err) => {
                        if (err) return general.e(err);
                        general.n("Created [" + cwd + "/.fauceteer/servers.json]");
                        fs.writeFile(`${cwd}/.fauceteer/plugins.json`, JSON.stringify({}, null, 4), "utf-8", (err) => {
                            general.n("Created [" + cwd + "/.fauceteer/plugins.json]");
                            general.m("Successfully created [" + cwd + "/.fauceteer/]")
                        });
                    });
                })
            })
        });
    }
    else {
        general.m("Folder exists!")
    }
}

program
    .command("plugin-dl <url>")
    .description("Download a plugin from Spigot.")

program
    .command("latest")
    .description("Downloads the latest Spigot/Bukkit.")
    .option("-j, --jar-type <type>", "The type, bukkit or spigot.")
    .option("-o, --output <directory>", "Output directory.")
    .action(function(command) {
        var options = command
        var type = options["jarType"] || "spigot";
        var output = options["output"] || process.cwd() + "/output";
        if (!fs.existsSync(output) && !options["output"]) {
            fs.mkdirSync(process.cwd() + "/output");
        }
        if (!fs.existsSync(output)) return general.e("The output path does not exist.")

        request({
            url: "https://raw.githubusercontent.com/reundefined/fauceteer-settings/master/latest.json",
            method: "GET"
        }, (error, response, body) => {
            body = JSON.parse(body)
            Spigot.getLatest(body, output, type);
        });
    });

function reinit() {
    var cwd = process.cwd();
    if (fs.existsSync(`${cwd}/.fauceteer`)) {
        general.n("Beginning creation of base folder in [" + cwd + "/]");
        fs.mkdir(`${cwd}/.fauceteer`, (err) => {
            if (err) return general.e(err);
            general.n("Created [" + cwd + "/.fauceteer]");
            fs.mkdir(`${cwd}/.fauceteer/ssh`, (err) => {
                if (err) return general.e(err);
                general.n("Created [" + cwd + "/.fauceteer/ssh]");
                fs.writeFile(`${cwd}/.fauceteer/settings`, fs.readFileSync(__dirname + "/base-settings", "utf-8"), "utf-8", (err) => {
                    if (err) return general.e(err);
                    general.n("Created [" + cwd + "/.fauceteer/settings]");
                    fs.writeFile(`${cwd}/.fauceteer/servers.json`, JSON.stringify({}, null, 4), "utf-8", (err) => {
                        if (err) return general.e(err);
                        general.n("Created [" + cwd + "/.fauceteer/servers.json]");
                        fs.writeFile(`${cwd}/.fauceteer/plugins.json`, JSON.stringify({}, null, 4), "utf-8", (err) => {
                            general.n("Created [" + cwd + "/.fauceteer/plugins.json]");
                            general.m("Successfully created [" + cwd + "/.fauceteer/]")
                        });
                    });
                })
            })
        });
    }
    else {
        general.m("You cannot recreate something that does not exist.")
    }
}

// Custom Help
program.on("--help", function() {
    return general.logo(randomQuote()) +
        "\n\n" +
        general.m("Welcome to the Fauceteer CLI!") +
        general.m("Here, you will find use for the commands, like starting a new Spigot server, or downloading some plugins!") +
        general.m("This CLI is versioned at [0.01.1.0037 (Astral)].\n") +
        general.h("Current Commands") +
        general.command("init || Initializes a new .fauceteer directory.") +
        general.command("new <type> || Generates a new server, type being [server] or [plugin]") +
        general.command("latest --type[=spigot] --output[=(CurrentDirectory)] || Downloads the latest spigot. to [output]") +
        general.h("Current Arguments") +
        general.command("--version, -v || CLI Version.") +
        "\n\n" +
        general.m("Arguments: <required> | [optional]")

})

program.on("-h", function() {
    return general.logo(randomQuote()) +
        "\n\n" +
        general.m("Welcome to the Fauceteer CLI!") +
        general.m("Here, you will find use for the commands, like starting a new Spigot server, or downloading some plugins!") +
        general.m("This CLI is versioned at [0.01.1.0037 (Astral)].\n") +
        general.h("Current Commands") +
        general.command("init || Initializes a new .fauceteer directory.") +
        general.command("new <type> || Generates a new server, type being [server] or [plugin]") +
        general.command("latest --type[=spigot] --output[=(CurrentDirectory)] || Downloads the latest spigot. to [output]") +
        general.h("Current Arguments") +
        general.command("--version, -v || CLI Version.") +
        general.command("-h, --help || This menu.") +
        "\n\n" +
        general.m("Arguments: <required> | [optional]")

})



program.parse(process.argv);
if (!program.args.length) {
    return general.logo(randomQuote()) +
        "\n\n" +
        general.m("Welcome to the Fauceteer CLI!") +
        general.m("Here, you will find use for the commands, like starting a new Spigot server, or downloading some plugins!") +
        general.m("This CLI is versioned at [0.01.1.0037 (Astral)].\n") +
        general.h("Current Commands") +
        general.command("init || Initializes a new .fauceteer directory.") +
        general.command("new <type> || Generates a new server, type being [server] or [plugin]") +
        general.command("latest --type[=spigot] --output[=(CurrentDirectory)] || Downloads the latest spigot. to [output]") +
        general.h("Current Arguments") +
        general.command("--version, -v || CLI Version.") +
        "\n\n" +
        general.m("Arguments: <required> | [optional]")
}


function randomQuote() {
    var quotes = [
        "Try terraria!",
        "Spigot rules, and Bukkit does too!",
        "Mining blocks...",
        "A leaky faucet is no problem for the Fauceteer!",
        "Girls are now preparing, please wait warmly and have some tea.",
        "Thermal Expansion is a great mod.",
        "Does anybody read these?",
        "Please wait warmly for futher instructions."
    ]
    return quotes[getRandomInt(0, quotes.length - 1)]
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
