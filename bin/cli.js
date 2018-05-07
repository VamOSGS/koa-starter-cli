#!/usr/bin/env node

const path = require('path');
const chalk = require('chalk');
const ora = require('ora');
const { Command } = require('commander');
const pkg = require('../package.json');
// eslint-disable-next-line
const { copySync, generateFiles, install, useFlow } = require('../lib');

const base = __dirname.replace(/bin/, '');
const copy = path.join(base, 'source_copy');
const tasks = ['Creating directory', ' Generating files', 'Installing dependencies'];
// let dependencies = ['dotenv', 'koa-compose', 'koa', 'source-map-support', 'koa-router'];
// const devDependencies = [
//   '@babel/core',
//   'babel-eslint',
//   'backpack-core',
//   'eslint-config-airbnb-base',
//   'eslint-plugin-import',
// ];
let dependencies = ['dotenv'];
const devDependencies = ['chalk'];
const flowDeps = ['@babel/plugin-transform-flow-strip-types', 'eslint-plugin-flowtype', 'flow-bin'];
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

useFlow().then(async (use) => {
  spinner.start(`[2/${tasks.length}] ${tasks[1]}`);
  generateFiles(projectName, projectDir, use);
  spinner.succeed();
  if (use) {
    dependencies = [...dependencies, ...flowDeps];
  }
  spinner.start(`[3/${tasks.length}] ${tasks[2]}`);
  install(projectDir, program.useYarn, dependencies, devDependencies).then(() => {
    spinner.succeed();
  });
});
