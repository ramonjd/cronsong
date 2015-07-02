
import SoundModel from './SoundModel';

let Sound  = {

  index(req, res) {
    SoundModel.find((sounds) => {
      return res.status(200).json(sounds);
    });
  }


};

exports = module.exports = Sound;


