/**
 * Build (Webpack)
 * @param argv
 * {
 *      mode: {
            alias: 'm',
            default: 'prod',
            type: 'string',
            desc: 'Build Mode',
            choices: ['prod', 'dev', 'publish', 'watch', 'coverage']
        }
 * }
 */
module.exports = (argv) => {
    const shell = require('shelljs');
    const chalk = require('chalk');
    const cliConfigs = require('../../cli-config');

    if (argv.mode === 'prod') {

    }
    else if (argv.mode === 'dev') {

    }
    else if (argv.mode === 'watch') {

    }
    else if (argv.mode === 'publish') {

    }
    else if (argv.mode === 'coverage') {

    }
    else {
        throw new Error(chalk.red('[ERROR: UFA CLI] You need to specify the Build mode!'));
        process.exit(1);
    }
};
