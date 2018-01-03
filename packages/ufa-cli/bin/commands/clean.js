exports.command = 'clean [all] [names..] [files..]';
exports.desc = 'Deletes folders/files';
exports.builder = {
    all: {
        type: 'boolean',
        alias: 'a',
        group: 'Clean Options:',
        description: 'Deletes all the folders/files specified in the cli config \'folder_paths\' '
    },
    names: {
        type: 'array',
        alias: 'n',
        group: 'Clean Options:',
        description: 'Deletes the folders/files by \'name\' that are specified in the cli config \'folder_paths\' '
    },
    files: {
        type: 'array',
        alias: 'f',
        group: 'Clean Options:',
        description: 'Deletes the custom folder/files specified as parameters'
    }
};

exports.handler = (argv) => {
    const chalk = require('chalk');
    console.log(chalk.yellow('[COMMAND: UFA CLI] Clean'));
    require('../../lib/index').clean(argv);
};
