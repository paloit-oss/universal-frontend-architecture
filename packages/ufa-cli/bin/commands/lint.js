exports.command = 'lint [type]';
exports.desc = 'Lint';
exports.builder = {
  type: {
    default: 'all'
  }
};

exports.handler = (argv) => {
  console.log('Lint', argv.type);
};
