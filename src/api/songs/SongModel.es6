import fs from 'fs';
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

class SongModel {
    constructor(properties) {
      this.properties = properties;
    }
    
    static find(callback = function(){}) {
      callback(remodelArray(filterMp3(fs.readdirSync(config.DIR_SONGS))));
    }
    
    static random(callback = function(){}) {
      let files = filterMp3(fs.readdirSync(config.DIR_SONGS));
      let randomIndex = ran(1, files.length);
      let song = filterByIndex(files, randomIndex - 1);
      callback(remodelArray([song]));
    } 

}
export default SongModel;

