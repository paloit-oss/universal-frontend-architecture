exports.command = 'test [type]';
exports.desc = 'Test';
exports.builder = {
  type: {
    default: 'all'
  }
};

exports.handler = (argv) => {
  console.log('Test', argv.type);
};
