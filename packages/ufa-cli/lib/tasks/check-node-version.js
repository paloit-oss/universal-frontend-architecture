/**
 * Checks the required NodeJS version
 * @param argv
 * {}
 */
module.exports = (argv) => {
    const shell = require('shelljs');
    const chalk = require('chalk');
    const cliConfigs = require('../../cli-config');

    shell.exec('node -v', (err, stdout, stderr) => {
        if (err) throw err;
        if (parseFloat(stdout) < cliConfigs.minimumNodeVersion) {
          throw new Error(chalk.red('[ERROR: UFA CLI] You need NodeJS version >= 8'));
          process.exit(1);
        }
        console.log(chalk.green('[SUCCESS: UFA CLI] Compatible NodeJS version!'));
    });
};
