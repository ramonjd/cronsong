import fs from 'fs';
import {play} from '../../exec/playSound';
import {quit} from '../../exec/playSound';
import {ran} from '../../utils/Utils';
import {filterMp3} from '../../utils/Utils';
import {filterByIndex} from '../../utils/Utils';
import config from '../../config/env';

let remodelArray = (filteredFileArray = []) => {
  return filteredFileArray.map(file => { 
        return {
          'name' : file
        };
    });
};

class SoundModel {

    constructor(properties) {
      this.properties = properties;
    }
    
    static find(callback = function(){}) {
      callback(remodelArray(filterMp3(fs.readdirSync(config.DIR_SOUNDS))));
    }

    static play(sound = '', callback = function(){}) {
       console.log(config.DIR_SOUNDS);
        let soundPath = config.DIR_SOUNDS + sound;
        play(sound);
        callback(remodelArray([soundPath]));
    }
    
    
   static stop() {
   console.log('sound model quit');
       quit();
    }
}

export default SoundModel;

