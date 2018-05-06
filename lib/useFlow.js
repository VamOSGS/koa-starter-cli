const inquirer = require('inquirer');

const questions = [
  {
    type: 'confirm',
    name: 'useFlow',
    message: 'Do you want to integrate flowtype?',
    default: false,
  },
];

function useFlow() {
  return inquirer.prompt(questions).then(answer => answer.useFlow);
}

module.exports = useFlow;
