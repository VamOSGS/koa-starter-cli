#!/usr/bin/env node

const path = require('path');
const chalk = require('chalk');
const ora = require('ora');
const { Command } = require('commander');
// eslint-disable-next-line
const { copySync, createPkg, yarnCheck, install } = require('../lib');
const pkg = require('../package.json');

const base = __dirname.replace(/bin/, '');
const copy = path.join(base, 'copy');
const tasks = ['Creating directory', ' Creating package.json', 'Installing dependencies'];
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
  .option('--use-yarn')
  .parse(process.argv);

if (typeof projectName === 'undefined') {
  console.error('Please specify the project directory:');
  console.log(`  ${chalk.cyan(program.name())} ${chalk.green('<project-directory>')}`);
  process.exit();
}
const spinner = ora({ text: `[1/${tasks.length}] ${tasks[0]}` }).start();
const copyDir = copySync(copy, projectDir);

if (copyDir.done) {
  spinner.succeed(`[1/${tasks.length}] ${copyDir.status}`);
} else {
  spinner.fail(`[1/${tasks.length}] ${copyDir.status}`);
  process.exit();
}

spinner.start(`[2/${tasks.length}] ${tasks[1]}`);
createPkg(projectName, projectDir);
spinner.succeed();

spinner.start(`[3/${tasks.length}] ${tasks[2]}`);
const dependencies = ['chalk'];
if (program.useYarn && yarnCheck()) {
  console.log(chalk.red('FUCK YOU'));
  const args = ['add', '--exact', ...dependencies, '--cwd', projectDir];
  install(args, projectDir, 'yarn').then(() => {
    spinner.succeed();
  });
} else {
  const args = ['install', '--save', '--save-exact', '--loglevel', 'error', ...dependencies];
  install(args, projectDir, 'npm').then(() => {
    spinner.succeed();
  });
}
