
import SongModel from './SongModel';

let Song  = {

  index(req, res) {
    SongModel.find((songs) => {
      return res.status(200).json(songs);
    });
  },

  random(req, res) {
    SongModel.random((song) => {
      return res.status(200).json(song);
    });
  }

};

exports = module.exports = Song;


