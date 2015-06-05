import fs from 'fs';
import {ran} from '../../utils/Utils';
import {filterMp3} from '../../utils/Utils';

const DIR = './mp3s/_processed/'


var remodelArray = (filteredFileArray = []) => {
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
      callback(remodelArray(filterMp3(fs.readdirSync(DIR))));
    }
    static random(callback = function(){}) {
      let files = filterMp3(fs.readdirSync(DIR));
      let randomIndex = ran(1, files.length);
      let song = [];
      files.some((file, index) => {
        song = file;
        return index === randomIndex - 1;
      });
      callback(remodelArray([song]));
    } 
}
export default SongModel;

