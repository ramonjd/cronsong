
import fs from 'fs';
import {exec} from 'child_process';


let puts = (error, stdout, stderr) => {
    console.log(stdout)
};

export function ran(min = 1, max = 10) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function filterMp3(fileArray = []){
  let mp3Array = [];
  if (fileArray.length > 0) {
    mp3Array = fileArray.filter(file => { 
      return (/\.mp3/).test(file);
    });
  }
  return mp3Array;
};

export function filterByIndex(thisArray = [], index){
  return thisArray.filter((item, i) => { 
      return i === index;
  });
};

export function execute(str) {
  console.log('execute: ', str);
  exec(str, puts);
}