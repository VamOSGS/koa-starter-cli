#!/usr/bin/env node

const path = require('path');
const { copySync } = require('../lib');

const base = __dirname.replace(/bin/, '');
const copy = path.join(base, 'copy');
const name = process.argv[2];
const appDir = path.join(process.cwd(), name);

copySync(copy, appDir);
