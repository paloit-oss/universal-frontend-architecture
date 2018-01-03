exports.command = 'check-node-version';
exports.aliases = ['cnv'];
exports.desc = 'NodeJS Version Check';

exports.handler = (argv) => {
    const chalk = require('chalk');
    console.log(chalk.yellow('[COMMAND: UFA CLI] Check NodeJS Version'));
    require('../../lib/index').checkNodeJSVersion(argv);
};
