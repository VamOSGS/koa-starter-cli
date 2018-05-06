const copySync = require('./copy');
const install = require('./install');
const yarnCheck = require('./yarnCheck');
const useFlow = require('./useFlow');
const generateFiles = require('./generateFiles');

module.exports = {
  copySync,
  generateFiles,
  useFlow,
  yarnCheck,
  install,
};
