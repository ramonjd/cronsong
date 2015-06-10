import CronModel from './CronModel';

let user = 'skyid';

let Cron  = {

  index(req, res) {
    CronModel.show().then(cron => {
      return res.status(200).json({
        'jobs' : cron
      });
    });
  },

  create(req, res, next) {
    var newCron= new CronModel(req.body);
    CronModel.create(newCron).then(cron => {
      return res.status(200).json({
        'jobs' : cron
      });
    });
  },

  delete(req, res) {
    let commentBody = req.params.comment;
    CronModel.delete({comment : commentBody}).then((status, tab) => {
      return res.status(200).json(tab);
    });
  },

  getJobByComment(req, res) {
    let commentBody = req.params.comment;
    CronModel.getJobByComment({comment : commentBody}).then((status, tab) => {
      return res.status(200).json(tab);
    });
  }

};

exports = module.exports = Cron;