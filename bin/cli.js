#!/usr/bin/env node

const path = require('path');
const chalk = require('chalk');
const ora = require('ora');
const { Command } = require('commander');
const { copySync, createPkg } = require('../lib');
const pkg = require('../package.json');

const base = __dirname.replace(/bin/, '');
const copy = path.join(base, 'copy');
const tasks = ['Creating directory', ' Creating package.json'];
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
const spinner = ora({ text: `[1/${tasks.length}] ${tasks[0]}` }).start();
const copyDir = copySync(copy, projectDir);
console.log(copyDir.status);
if (!copyDir.done) process.exit();

spinner.text = `[2/${tasks.length}] ${tasks[1]}`;
createPkg(projectName, projectDir);
setTimeout(() => {
  process.exit();
}, 500);
