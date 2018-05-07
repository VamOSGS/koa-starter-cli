const chalk = require('chalk');
const fs = require('fs');
const path = require('path');

function copySync(src, dest) {
  let call = 0;
  if (call === 0 && fs.existsSync(dest)) {
    call++;
    return {
      done: false,
      status: `Directory with name ${chalk.red(path.basename(dest))} already exists.`,
    };
  }
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  if (exists && isDirectory) {
    fs.mkdirSync(dest);
    fs.readdirSync(src).forEach((childItemName) => {
      copySync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else {
    fs.linkSync(src, dest);
  }
  return {
    done: true,
    status: `Your project directory created at ${chalk.blue(path.basename(dest))}`,
  };
}
module.exports = copySync;
