const spawn = require('cross-spawn');
const chalk = require('chalk');
const yarnCheck = require('./yarnCheck');

function install(projectDir, useYarn, dependencies, devDependencies) {
  return new Promise((resolve, reject) => {
    process.chdir(projectDir);
    let args;
    let command;
    if (useYarn) {
      if (!yarnCheck()) {
        console.log(chalk.red('Yarn missing or you have problems with yarn'));
        process.exit();
      }
      command = 'yarnpkg';
      args = (deps, mode) => ['add', mode, '--silent', '--exact', ...deps, '--cwd', projectDir];
    } else {
      command = 'npm';
      args = (deps, mode) => ['install', mode, '--save-exact', '--silent', ...deps];
    }
    const child = spawn(command, args(dependencies, '--save'), { stdio: 'inherit' });
    child.on('close', (code) => {
      if (code !== 0) {
        reject({
          command: `${command} ${args.join(' ')}`,
        });
        return;
      }
      const childDev = spawn(command, args(devDependencies, '-D'), { stdio: 'inherit' });
      childDev.on('close', (codeDev) => {
        if (codeDev !== 0) {
          reject({
            command: `${command} ${args.join(' ')}`,
          });
          return;
        }
        resolve();
      });
    });
  });
}

module.exports = install;
