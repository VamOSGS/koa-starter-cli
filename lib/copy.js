const fs = require('fs-extra');
const chalk = require('chalk');
const path = require('path');

function copySync(source, dest) {
  if (fs.existsSync(dest)) {
    return {
      done: false,
      status: `Directory with name ${chalk.red(path.basename(dest))} already exists.`,
    };
  }
  fs.copySync(source, dest);
  return {
    done: true,
    status: `Your project directory created at ${chalk.blue(path.basename(dest))}`,
  };
}

module.exports = copySync;
