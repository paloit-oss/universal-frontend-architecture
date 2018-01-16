exports.command = 'build [mode]';
exports.desc = 'Build';
exports.builder = {
    mode: {
        alias: 'm',
        default: 'prod',
        type: 'string',
        desc: 'Build Mode',
        choices: ['prod', 'dev', 'publish', 'watch', 'coverage']
    }
};
exports.handler = (argv) => {
    const chalk = require('chalk');
    console.log(chalk.yellow('[COMMAND: UFA CLI] Build:', argv.mode));
    require('../../lib/index').build(argv);
};
