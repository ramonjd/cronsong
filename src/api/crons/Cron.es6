
import CronModel from './CronModel';

let Cron  = {

  index(req, res) {
    CronModel.find((crons) => {
      // list static files in dir
      return res.status(200).json({});
    });
  },

  getCronByUser(req, res, next) {
    var cronUser = req.params.user;
    CronModel.getCronByUser(cronUser).then((status, tab) => {
      // return contents of static file
      return res.status(200).json(tab);
    });
  },

  save(eq, res, next)) {
    var newCron= new CronModel(req.body);
    // save static file
  },

};

exports = module.exports = Cron;