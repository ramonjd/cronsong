
import SoundModel from './SoundModel';

let Sound  = {

  index(req, res) {
    SoundModel.find((sounds) => {
      return res.status(200).json(sounds);
    });
  },

  
  play(req, res) {
   let _sound = req.params.sound;
   SoundModel.play(_sound, sound => {
      return res.status(200).json(sound);
    });
  },
  
  
  stop(req, res) {
   SoundModel.stop();
  }

};

exports = module.exports = Sound;


