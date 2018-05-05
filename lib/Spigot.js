const http = require("http");
var ProgressBar = require('node-progress-3');
const general = require(__dirname + "/general.js");
const fs = require("fs");

module.exports = {
    getLatest: (body, output, type) => {
        type = type.toLowerCase();
        var url = parseType(body, type);
        var host = "cdn.getbukkit.org"
        if (url == -1) {
            return general.e("This type is not valid.")
        }

        if (type == "vanilla") {
            host = "launcher.mojang.com"
        }

        if (output.endsWith("/")) output = output.slice(0, -1);


        const req = http.request({
            protocol: "http:",
            host: host,
            path: url,
            method: "GET"
        })


        req.on('response', function(res) {
            var len = parseInt(res.headers['content-length'], 10);
            var bar = new ProgressBar({
                complete: '/',
                incomplete: ' ',
                width: 20,
                total: len,
                debounce: 800,
                format: "    [Downloading... [:bar] :percent ETA: :eta]"
            });
            var file = fs.createWriteStream(output + "/" + type + ".jar")
            res.on('data', function(chunk) {
                file.write(chunk)
                bar.tick(chunk.length);
            });

            res.on('end', function() {
                process.stdout.clearLine();
                process.stdout.cursorTo(0);
                console.log("\n" +
                    general.downloader("Download took " + bar.report.totalTime + ", for a " + formatBytes(bar.report.counted) + " file.") + "\n" +
                    general.downloader("File was expected to be " + formatBytes(bar.report.expected) + ".")
                )
                process.stdout.clearLine();
                process.stdout.cursorTo(0);
            });
        });

        req.end();
    }
}

function parseType(body, type) {
    if (type == "spigot") {
        return body.spigot;
    }
    else if (type == "bukkit") {
        return body.bukkit
    }
    else if (type == "vanilla") {
        return body.vanilla
    }
    else {
        return -1;
    }
}


function formatBytes(bytes) {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return '0 Bytes';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + '' + sizes[i];
};
