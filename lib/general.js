const chalk = require("chalk");
module.exports = {
    m: (message) => {
        return console.log(chalk.hex("#FFD54F").bold("Fauceteer >> ") + chalk.reset(message))
    },
    n: (message) => {
        return console.log(chalk.hex("#4FC3F7").bold("Fauceteer Editor >> ") + chalk.reset(message))
    },
    e: (message) => {
        return console.log(chalk.hex("#e57373").bold("Fauceteer Error >> ") + chalk.reset(message))
    },
    settings: () => {

    },
    logo: (quote) => {
        return console.log(chalk.hex("FFD54F").bold(`                                                                           
,------.                                    ,--.                           
|  .---'  ,--,--. ,--.,--.  ,---.  ,---.  ,-'  '-.  ,---.   ,---.  ,--.--. 
|  \`--,  ' ,-.  | |  ||  | | .--' | .-. : '-.  .-' | .-. : | .-. : |  .--' 
|  |\`    \\ '-'  | '  ''  ' \\ \`--. \\   --.   |  |   \\   --. \\   --. |  |    
\`--'      \`--\`--'  \`----'   \`---'  \`----'   \`--'    \`----'  \`----' \`--'    
            ${chalk.reset('"' + quote)}"
`))
    },
    command: (cmd) => {
        return console.log("    " + cmd)
    },
    h: (message) => {
        return console.log(chalk.hex("#BA68C8").bold("Fauceteer Commands >> ") + chalk.reset(message))
    },
    downloader: (message) => {
        return chalk.hex("#F06292").bold("Fauceteer Downloader >> ") + chalk.reset(message)
    }
}
