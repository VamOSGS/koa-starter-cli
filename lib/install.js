const spawn = require('cross-spawn');

function install(args, root, command) {
  return new Promise((resolve, reject) => {
    process.chdir(root);
    const child = spawn(command, args, { stdio: 'inherit' });
    child.on('close', (code) => {
      if (code !== 0) {
        reject({ command });
        return;
      }
      resolve();
    });
  });
}

module.exports = install;
