exports.command = 'build [mode]';
exports.desc = 'Build';
exports.builder = {
  mode: {
    alias: 'm',
    default: 'prod',
    type: 'string',
    desc: 'Build Mode',
    choices: ['prod', 'dev', 'publish', 'incremental', 'coverage']
  }
};
exports.handler = (argv) => {
    console.log('Build', argv.mode);
};
