import fs from 'fs';
import {ran} from '../utils/Utils';
import {filterMp3} from '../utils/Utils';
import {filterByIndex} from '../utils/Utils';
import {execute} from '../utils/Utils';
import config from '../config/env';

let args = process.argv.slice(2);
let _song = null;

// api

export function play(sound = '') {
  console.log('Playing: ' + config.PLAYER + ' ' + config.DIR_SONGS + sound);
  //execute(config.PLAYER + ' ' + config.DIR_SONGS + sound);
  execute(config.PLAYER + ' ' + config.DIR_SONGS + sound);
};

export function quit(){
    execute('killall ' + config.PLAYER);
};


if (args[0]) {
  if (args[0] === 'random') {
    let files = filterMp3(fs.readdirSync(config.DIR_SONGS));
    let randomIndex = ran(1, files.length);
    _song = filterByIndex(files, randomIndex - 1)[0];
  } else {
    _song = args[0];
  }
  play(_song);
}




