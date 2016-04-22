#!/usr/bin/env node

'use strict';

const path = require('path');
const fs = require('fs');
const glob = require('glob');
const convertWiki2Markdown = require('./');

const DIR_INPUT = process.argv[2] || process.cwd();

const files = glob.sync('**/*.wiki', {cwd: DIR_INPUT});
files.forEach(fileName => {
  const absFilePath = path.join(DIR_INPUT, fileName);
  const wikiContent = fs.readFileSync(absFilePath, 'utf8');
  const mdContent = convertWiki2Markdown(wikiContent);
  fs.writeFileSync(absFilePath.replace(/\.wiki$/i, '.md'), mdContent);
});
