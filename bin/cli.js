#!/usr/bin/env node

const path = require('path');
const { Command } = require('commander');
const chalk = require('chalk');
const pkg = require('../package.json');
const { copySync } = require('../lib');

const base = __dirname.replace(/bin/, '');
const copy = path.join(base, 'copy');

let projectName;
let projectDir;
const program = new Command('koa-starter')
  .version(pkg.version, '-v, --version')
  .arguments('<project-directory>')
  .usage(`${chalk.green('<project-directory>')} [options]`)
  .action((name) => {
    projectName = name;
    projectDir = path.resolve(projectName);
  })
  .parse(process.argv);

if (typeof projectName === 'undefined') {
  console.error('Please specify the project directory:');
  console.log(`  ${chalk.cyan(program.name())} ${chalk.green('<project-directory>')}`);
  process.exit();
}
const copyDir = copySync(copy, projectDir);
console.log(copyDir.status);
