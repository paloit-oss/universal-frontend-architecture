/**
 * Extract Mock API
 * @param argv
 * {
 *      watch: {
            alias: 'w',
            default: false,
            type: 'boolean',
            desc: 'Watch Mode'
        }
 * }
 */
module.exports = (argv) => {
    const chalk = require('chalk');
    console.log(chalk.green('[UFA CLI] Extract Mock API : Start'));

    const cpx = require('cpx');
    const cwd = process.cwd();
    const packageJSON = require(cwd + '/package.json');
    const cliConfigs = require('../../cli-config');

    let dest = cliConfigs.folderPaths.mockapi;
    if (cliConfigs.server.emulatorAPIModules) {
        cliConfigs.server.emulatorAPIModules.forEach((module) => {
            if (module === packageJSON.name) {
                // Module is the same where the program started
                cpx.watch('.' + cliConfigs.server.emulatorAPIFolderPath + '/**', dest);
            } else {
                // Module must be in the cwd/node_modules
                cpx.watch('./node_modules/' + module + cliConfigs.server.emulatorAPIFolderPath + '/**', dest);
            }
        });
    }
};
