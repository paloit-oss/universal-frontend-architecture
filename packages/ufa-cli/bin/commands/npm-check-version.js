exports.command = 'npm-check-version';
exports.aliases = ['ncv'];
exports.desc = 'NPM Version Check';

exports.handler = function (argv) {
    const shell = require('shelljs');
    const chalk = require('chalk');

    console.log(chalk.yellow('[Command: UFA CLI] NPM Check Version'));

    shell.exec('npm -v', function(err, stdout, stderr) {
        if (err) throw err;
        if (parseFloat(stdout) < 5.5) {
          throw new Error(chalk.red('[ERROR: UFA CLI] You need npm version @>=5.5'));
          process.exit(1);
        }
    });
};
