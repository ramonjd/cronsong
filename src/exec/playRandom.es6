import fs from 'fs';
import {ran} from '../utils/Utils';
import {filterMp3} from '../utils/Utils';
import {filterByIndex} from '../utils/Utils';
import {execute} from '../utils/Utils';
import config from '../config/env/dev';


let files = filterMp3(fs.readdirSync(config.DIR));
let randomIndex = ran(1, files.length);
let song = filterByIndex(files, randomIndex - 1);
execute(config.CMD + ' ' + config.DIR + song[0]);
