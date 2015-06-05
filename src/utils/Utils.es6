
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

export function exec() {
  
}