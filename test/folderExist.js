const { expect } = require('chai');
const fs = require('fs');
const path = require('path');

describe('Test generating starter pack', () => {
  it('Checking for folder with name testProject', () => {
    const check = fs.existsSync(path.resolve('testProject'));
    // eslint-disable-next-line
    expect(check).to.be.false;
  });
});
