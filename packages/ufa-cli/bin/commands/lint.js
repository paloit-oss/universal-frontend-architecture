exports.command = 'lint [type]';
exports.desc = 'Lint';
exports.builder = {
  type: {
    default: 'all'
  }
};

exports.handler = function (argv) {
  console.log('Lint', argv.type);
};
