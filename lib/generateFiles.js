const fs = require('fs');
const path = require('path');
const pkgJson = require('./templates/package.json');
const eslintrc = require('./templates/.eslintrc.json');

function createPkg(name, projectDir, flow) {
  pkgJson.name = name;
  if (flow) pkgJson.scripts.flow = 'flow';
  fs.writeFileSync(path.join(projectDir, 'package.json'), JSON.stringify(pkgJson, null, 2));
}
function createEslintrc(name, projectDir, flow) {
  if (flow) {
    eslintrc.extends = ['plugin:flowtype/recommended', ...eslintrc.extends];
    eslintrc.plugins = ['flowtype'];
  }
  fs.writeFileSync(path.join(projectDir, '.eslintrc.json'), JSON.stringify(eslintrc, null, 2));
}

function generateFiles(name, dest, flow) {
  createPkg(name, dest, flow);
  createEslintrc(name, dest, flow);
  if (flow) {
    fs.writeFileSync(
      path.join(dest, '.flowconfig'),
      fs.readFileSync(path.resolve('lib/templates/.flowconfig')),
    );
  }
}

module.exports = generateFiles;
