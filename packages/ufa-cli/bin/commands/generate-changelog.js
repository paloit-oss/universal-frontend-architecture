exports.command = 'generate-changelog';
exports.aliases = ['gclog'];
exports.desc = 'Generate Changelog';
exports.builder = {};

exports.handler = (argv) => {
  console.log('Generate Changelog', argv.type);
};
