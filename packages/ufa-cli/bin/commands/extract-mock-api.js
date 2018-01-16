exports.command = 'extract-mockapi [watch]';
exports.desc = 'Extract Mock API';
exports.aliases = ['ema'];
exports.builder = {
    watch: {
        alias: 'w',
        default: false,
        type: 'boolean',
        desc: 'Watch Mode'
    }
};
exports.handler = (argv) => {
    const chalk = require('chalk');
    console.log(chalk.yellow('[COMMAND: UFA CLI] Extract Mock API'));
    require('../../lib/index').extractMockAPI(argv);
};
