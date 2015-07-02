import AppDispatcher from '../dispatchers/AppDispatcher.jsx';
import Constants from '../constants/Constants.jsx';
import uiConfig from '../utils/uiConfig.jsx';
import Request from 'superagent';
import events from 'events';
import assign from 'object-assign';

let EventEmitter = events.EventEmitter;

let UI_CHANGE_EVENT = 'uiChange';
let AUDIO_CHANGE_EVENT ='audioChange'

let _header = null;
let _footer = null;
let _section = null;
let _id = null;

function changeUI(ui) {
	if (uiConfig[ui]) {
		_header = uiConfig[ui].header;
		_footer = uiConfig[ui].footer;
        _section = uiConfig[ui].section;
        _id = ui;
	}
}

let Store  = assign({}, EventEmitter.prototype, {

  getHeader() {
    return _header;
  },

  getFooter() {
    return _footer;
  },

  getSection() {
    return _section;
  },
  
  getSectionId() {
    return _id;
  },
  
  addUIChangeListener: function (callback) {
      this.on(UI_CHANGE_EVENT, callback);
  },

  removeUIChangeListener: function (callback) {
      this.removeListener(UI_CHANGE_EVENT, callback);
  },
  
  addAudioChangeListener(callback) {
    this.on(AUDIO_CHANGE_EVENT, callback);
  },
  
  removeAudioChangeListener(callback) {
    this.removeListener(AUDIO_CHANGE_EVENT, callback);
  },
  
  emitChange(event, data = {}) {
    this.emit(event, data);
  }
  
  
});

AppDispatcher.register((payload) => {
  switch(payload.actionType) {
    case Constants.CHANGE_UI:
      changeUI(payload.ui);
      Store.emitChange(UI_CHANGE_EVENT);
	  break;     
    case Constants.CHANGE_AUDIO:
      Store.emitChange(AUDIO_CHANGE_EVENT, payload.data);
      break;
    default:
      return true;
  }
  return true;
});

export default Store;
