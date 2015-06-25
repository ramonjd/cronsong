import AppDispatcher from '../dispatchers/AppDispatcher.jsx';
import Constants from '../constants/Constants.jsx';

let Actions = {

  ui : {
    
    set(ui) {
      AppDispatcher.dispatch({
          actionType: Constants.CHANGE_UI,
          ui: ui
       });
    }
  
  },
  
  song : {

    get(data = {}) {
      AppDispatcher.dispatch({
        actionType: Constants.LOAD_SONGS,
        data: data
      });
    },


    play(data = {}) {
      AppDispatcher.dispatch({
        actionType: Constants.PLAY_SONG,
        data: data
      });
    }
  
  },
  
  
  sound : {
  
    play(data = {}) {
      AppDispatcher.dispatch({
        actionType: Constants.PLAY_SOUND,
        data: data
      });
    },


     get(data = {}) {
      AppDispatcher.dispatch({
        actionType: Constants.LOAD_SOUNDS,
        data: data
      });
    }
  
  },
  
  random : {

     get(data = {}) {
      AppDispatcher.dispatch({
        actionType: Constants.LOAD_RANDOM_SONG,
        data: data
      });
    }
  },
  
  cron : {
  
    get(data = {}) {
      AppDispatcher.dispatch({
        actionType: Constants.LOAD_CRONS,
        data: data
      });
    },
    create(data = {}) {
      AppDispatcher.dispatch({
        actionType: Constants.CREATE_CRON,
        data: data
      });
    },

    delete(data = {}) {
      AppDispatcher.dispatch({
        actionType: Constants.DELETE_CRON,
        data: data
      });
    }
    
  }

  
};

export default Actions;