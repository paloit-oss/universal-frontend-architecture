exports.command = 'server [type] [mode] [path]';
exports.desc = 'Development Server';
exports.builder = {
    type: {
        type: 'string',
        alias: 't',
        group: 'Server Options:',
        default: 'both',
        choices: ['both', 'static', 'api'],
        description: 'Serve - Static resources or Mock API Endpoints or Both'
    },
    mode: {
        type: 'string',
        alias: 'm',
        group: 'Server Options:',
        default: 'prod',
        choices: ['prod', 'dev'],
        description: 'Serve static resources from path that is specified in the cli config \'folder_paths\' '
    },
    path: {
        type: 'string',
        alias: 'p',
        group: 'Server Options:',
        description: 'Serve static resources from path specified as parameter'
    }
};

exports.handler = (argv) => {
    const chalk = require('chalk');
    const server = require('../tools/server');
    const cliConfigs = require('../cli-config');

    console.log(chalk.yellow('[Command: UFA CLI] Server'));

    const static = (argv.type === 'api') ? false : true;
    const api = (argv.type === 'static') ? false : true;
    const port = (argv.type === 'api') ? cliConfigs.server.emulator_port : cliConfigs.server.port;
    const folder = argv.path ? argv.path : cliConfigs.folder_paths[argv.mode];

    server.start(static, api, port, folder);
};
