const template = require('./templates/package.json');
const fs = require('fs');
const path = require('path');

function createPkg(name, projectDir, flow) {
  template.name = name;
  if (flow) template.scripts.flow = 'flow';
  fs.writeFileSync(path.join(projectDir, 'package.json'), JSON.stringify(template, null, 2));
}

module.exports = createPkg;
