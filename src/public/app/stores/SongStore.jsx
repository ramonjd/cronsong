import AppDispatcher from '../dispatchers/AppDispatcher.jsx';
import Constants from '../constants/Constants.jsx';
import Request from 'superagent';
import events from 'events';
import assign from 'object-assign';

let EventEmitter = events.EventEmitter;
let CHANGE_EVENT = 'change';
let SONG_PLAYED_EVENT = 'songPlayed';

let _songs = [];


let SongStore  = assign({}, EventEmitter.prototype, {

  getSongs(data = {}) {
    Request
    .get('api/songs')
    .end((err, res) => {
       _songs = JSON.parse(res.text);
       this.emitChange(CHANGE_EVENT, _songs);
    });
  },
  
  getRandomSong(data = {}) {
    Request
    .get('api/songs/random')
    .end((err, res) => {
       this.emitChange(CHANGE_EVENT, []);
    });
  },

  getSounds(data) {
    let _url = 'api/sounds';
    Request
    .get(_url)
    .end((err, res) => {
       _songs = JSON.parse(res.text);
       this.emitChange(CHANGE_EVENT, _songs);
    });
  },
  
  playSong(data) {
    let _url = 'api/songs/play/' + data;
    Request
    .get(_url)
    .end((err, res) => {
       _songs = JSON.parse(res.text);
       this.emitChange(SONG_PLAYED_EVENT, _songs);
    });
  },

  
  playSound(data) {
    console.log('SongStore: api/sounds/play/' + data);
    let _url = 'api/sounds/play/' + data;
    Request
    .get(_url)
    .end((err, res) => {
       _songs = JSON.parse(res.text);
       this.emitChange(SONG_PLAYED_EVENT, _songs);
    });
  },
  
  stopSong(){
    console.log('song store quit');
    Request.get('/api/songs/stop')
      .end((err, res) => {
      });;
  
  },
  stopSound(){
    Request.get('api/sounds/stop')
      .end((err, res) => {
    });;
  },
  
  emitChange(event, data) {
    this.emit(event, data);
  },
  
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
  addSongPlayedListener(callback) {
    this.on(SONG_PLAYED_EVENT, callback);
  },
  
  removeSongPlayedListener(callback) {
    this.removeListener(SONG_PLAYED_EVENT, callback);
  }
  
});

AppDispatcher.register((payload) => {
  switch(payload.actionType) {
    case Constants.LOAD_SONGS:
      SongStore.getSongs(payload.data);
      break;
    case Constants.LOAD_SOUNDS:
      SongStore.getSounds(payload.data);
      break;
    case Constants.PLAY_SONG:
      SongStore.playSong(payload.data);
      break;
    case Constants.STOP_SONG:
      SongStore.stopSong();
      break;
    case Constants.STOP_SOUND:
      SongStore.stopSound();
      break;
    case Constants.LOAD_RANDOM_SONG:
      SongStore.getRandomSong();
      break;            
    case Constants.PLAY_SOUND:
      SongStore.playSound(payload.data);
      break;
    default:
      return true;
  }
  return true;
});

export default SongStore;
