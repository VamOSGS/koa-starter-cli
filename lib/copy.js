const chalk = require('chalk');
const fs = require('fs');
const path = require('path');

function copySync(src, dest) {
  let count = 0;
  if (count === 0 && fs.existsSync(dest)) {
    count++;
    return console.error(`Folder with name ${chalk.blue(path.basename(dest))} already exists`);
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
  return { done: true };
}
module.exports = copySync;
