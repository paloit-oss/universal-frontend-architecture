#!/usr/bin/env node
require('yargs')
  .commandDir('commands')
  .demandCommand()
  .help()
  .version()
  .strict(true)
  .argv;
