import AppDispatcher from '../dispatchers/AppDispatcher.jsx';
import Constants from '../constants/Constants.jsx';
import Request from 'superagent';
import events from 'events';
import assign from 'object-assign';

let EventEmitter = events.EventEmitter;
let CHANGE_EVENT = 'change';
let _songs = [];


let SongStore  = assign({}, EventEmitter.prototype, {

  getSongs(data) {
    let _url = data && data.random === true ? 'api/songs/random' : 'api/songs';
    Request
    .get(_url)
    .end((err, res) => {
       _songs = JSON.parse(res.text);
       this.emitChange(_songs);
    });
  },

  emitChange(data) {
    this.emit(CHANGE_EVENT, data);
  },
  
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
  
});

AppDispatcher.register((payload) => {
  switch(payload.actionType) {
    case Constants.LOAD_SONGS:
      SongStore.getSongs(payload.data);
      break;
    default:
      return true;
  }
  return true;
});

export default SongStore;
