import AppDispatcher from '../dispatchers/AppDispatcher.jsx';
import Constants from '../constants/Constants.jsx';
import Request from 'superagent';
import events from 'events';
import assign from 'object-assign';

let EventEmitter = events.EventEmitter;
let CHANGE_EVENT = 'change';
let _crons = {};


let CronStore  = assign({}, EventEmitter.prototype, {

  getCrons(data) {
    let _url = data && data.random ? 'api/songs/random' : 'api/songs';
    Request
    .get('api/crons')
    .end((err, res) => {
        _crons = JSON.parse(res.text);
       this.emitChange({
          crons : _crons,
          action : 'get'
       });
    });
  },

  createCron(data) {
    Request
    .post('/api/crons')
      .type('form')
      .send({'expression' : encodeURIComponent(data.expression)})
      .send({'song' : encodeURIComponent(data.song)})
      .send({'audioType' : encodeURIComponent(data.audioType)})
      .end((err, res) => {
        _crons = JSON.parse(res.text);
         this.emitChange({
            crons : _crons,
            action : 'created'
         });
      });
  },
  
   deleteCron(data) {
     Request
      .del('api/crons/' + data.comment)
      .end((err, res) => {
        _crons = JSON.parse(res.text);
         this.emitChange({
            crons : _crons,
            action : 'deleted'
         });
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
    case Constants.LOAD_CRONS:
      CronStore.getCrons(payload.data);
      break;    
    case Constants.CREATE_CRON:
      CronStore.createCron(payload.data);
      break;
    case Constants.DELETE_CRON:
      CronStore.deleteCron(payload.data);
      break;      
    default:
      return true;
  }
  return true;
});

export default CronStore;
