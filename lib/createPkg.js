const template = require('./templates/package.json');
const fs = require('fs');
const path = require('path');

function createPkg(name, projectDir) {
  template.name = name;
  fs.writeFileSync(path.join(projectDir, 'package.json'), JSON.stringify(template, null, 2));
}

module.exports = createPkg;
