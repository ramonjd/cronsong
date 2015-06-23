import AppDispatcher from '../dispatchers/AppDispatcher.jsx';
import Constants from '../constants/Constants.jsx';

let Actions = {

  setUI(ui) {
    AppDispatcher.dispatch({
        actionType: Constants.CHANGE_UI,
        ui: ui
     });
  },
  
  // song actions
  
   getSongs(data) {
    AppDispatcher.dispatch({
      actionType: Constants.LOAD_SONGS,
      data: data
    });
  },
  
  // cron actions
  
  getCrons(data) {
    AppDispatcher.dispatch({
      actionType: Constants.LOAD_CRONS,
      data: data
    });
  },
  createCron(data) {
    AppDispatcher.dispatch({
      actionType: Constants.CREATE_CRON,
      data: data
    });
  },

  deleteCron(data) {
    AppDispatcher.dispatch({
      actionType: Constants.DELETE_CRON,
      data: data
    });
  }
  
};

export default Actions;