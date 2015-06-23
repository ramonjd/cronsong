import AppDispatcher from '../dispatchers/AppDispatcher.jsx';
import SongConstants from '../constants/SongConstants.jsx';

let SongActions = {

  getSongs(data) {
    AppDispatcher.dispatch({
      actionType: SongConstants.LOAD_SONGS,
      data: data
    });
  }
  
};

export default SongActions;