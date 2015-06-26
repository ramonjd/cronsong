import fs from 'fs';
import {ran} from '../utils/Utils';
import {filterMp3} from '../utils/Utils';
import {filterByIndex} from '../utils/Utils';
import {execute} from '../utils/Utils';
import config from '../config/env';

let args = process.argv.slice(2);
let _sound = null;

// api

export function play(sound = '') {
  console.log('Playing: ' + config.PLAYER + ' ' + config.DIR_SOUNDS + sound);
  //execute(config.PLAYER + ' ' + config.DIR_SOUNDS + sound);
  execute(config.PLAYER + ' ' + config.DIR_SOUNDS + sound);
};

export function quit(){
   execute('killall ' + config.PLAYER);
};


// if called directly from cron job

if (args[0]) {
  if (args[0] === 'random') {
    let files = filterMp3(fs.readdirSync(config.DIR_SOUNDS));
    let randomIndex = ran(1, files.length);
    _sound = filterByIndex(files, randomIndex - 1)[0];
  } else {
    _sound = args[0];
  }
  play(_sound);
}


// rewrite this mebbe?
// https://github.com/rikkertkoppes/omxcontrol/blob/master/index.js