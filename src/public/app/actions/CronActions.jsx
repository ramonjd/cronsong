import AppDispatcher from '../dispatchers/AppDispatcher.jsx';
import CronConstants from '../constants/CronConstants.jsx';

let CronActions = {

  getCrons(data) {
    AppDispatcher.dispatch({
      actionType: CronConstants.LOAD_CRONS,
      data: data
    });
  },
  createCron(data) {
    AppDispatcher.dispatch({
      actionType: CronConstants.CREATE_CRON,
      data: data
    });
  },

  deleteCron(data) {
    AppDispatcher.dispatch({
      actionType: CronConstants.DELETE_CRON,
      data: data
    });
  }
  
};

export default CronActions;