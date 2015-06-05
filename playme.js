
// https://github.com/rikkertkoppes/omxcontrol
// https://www.codementor.io/nodejs/tutorial/build-google-tv-raspberrypi-nodejs-socket-io
// https://github.com/JustinDrake/node-es6-examples
// https://www.topcoder.com/blog/start-writing-es6-javascript-in-your-node-js-apps-today/

var DIR = '/home/pi/workspace/sounds/';
var PLAYER = 'omxplayer';


var fs = require('fs'),
sys = require('sys'),
exec = require('child_process').exec,
files,
randomInt,
chosenSong,
puts,
getRandomInt,
filterMp3,
chooseSong,
init;

puts = function(error, stdout, stderr) {
    console.log(stdout)
};

getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

filterMp3 = function(fileArray) {
    return fileArray.filter(function(file){ 
          return (/\.mp3/).test(file);
    });
};

chooseSong = function(){
    
    files = filterMp3(fs.readdirSync(DIR));

    console.log('Number of songs: ' + files.length);

    if (files && files.length > 0) {
        randomInt = getRandomInt(1, files.length);
        console.log('Random song index: ' + randomInt);
    }
    
    if (typeof randomInt === 'number') {
        files.forEach(function(file, index) {
            if (index === randomInt - 1) {
                chosenSong = file;
            }
        });
    } else {
        console.log('Cannot find random number');
    }

    console.log('Chosen song: ' + chosenSong);
    return chosenSong;
};

init = function(){
    chosenSong = chooseSong();
    console.log('Executing ' + PLAYER + ' ' + DIR + ' ' + chosenSong);
    exec(PLAYER + ' ' + DIR + chosenSong, puts);
};

init();




