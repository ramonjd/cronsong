import fs from 'fs';
import {ran} from '../utils/Utils';
import {filterMp3} from '../utils/Utils';
import {filterByIndex} from '../utils/Utils';
import {execute} from '../utils/Utils';
import config from '../config/env';

// rewrite this
// https://github.com/rikkertkoppes/omxcontrol/blob/master/index.js

let _song = null;
let args = process.argv.slice(2);

let play = (song = '') => {
  console.log('Playing: ' + config.PLAYER + ' ' + config.DIR_SONGS + song );
  execute(config.PLAYER + ' ' + config.DIR_SONGS + song);
};

if (args[0]) {
  if (args[0] === 'random') {
    let files = filterMp3(fs.readdirSync(config.SONGS));
    let randomIndex = ran(1, files.length);
    _song = filterByIndex(files, randomIndex - 1)[0];
  } else {
    _song = args[0];
  }
  play(_song);
} 

export default play;

