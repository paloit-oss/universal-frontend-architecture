exports.command = 'generate-docs [type]';
exports.aliases = ['gdocs'];
exports.desc = 'Generate Docs';
exports.builder = {
  type: {
    default: 'all'
  }
};

exports.handler = (argv) => {
  console.log('Generate Docs', argv.type);
};
