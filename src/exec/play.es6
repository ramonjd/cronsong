import fs from 'fs';
import {ran} from '../utils/Utils';
import {filterMp3} from '../utils/Utils';
import {filterByIndex} from '../utils/Utils';
import {execute} from '../utils/Utils';
import config from '../config/env';

let song = null;
let args = process.argv.slice(2);

if (args[0]) {
  if (args[0] === 'random') {
    let files = filterMp3(fs.readdirSync(config.SONGS));
    let randomIndex = ran(1, files.length);
    song = filterByIndex(files, randomIndex - 1)[0];
  } else {
    song = args[0];
  }
  execute(config.PLAYER + ' ' + config.DIR + song);
} else {
  console.log('No song argument passed');
}


