#!/usr/local/bin/node

import fs from 'fs';
import {ran} from '../utils/Utils';
import {filterMp3} from '../utils/Utils';
import {filterByIndex} from '../utils/Utils';
import {execute} from '../utils/Utils';
import config from '../config/env/dev';

let song = null;
let args = process.argv.slice(2);

if (args[0]) {
  
  if (args[0] === 'random') {
    let files = filterMp3(fs.readdirSync(config.DIR));
    let randomIndex = ran(1, files.length);
    song = filterByIndex(files, randomIndex - 1)[0];
  } else {
    song = args[0];
  }
  console.log(config.CMD + ' ' + config.DIR + song);
  //execute(config.CMD + ' ' + config.DIR + song);

  
} else {
  console.log('No song argument passed');
}


