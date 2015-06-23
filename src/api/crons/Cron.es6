import CronModel from './CronModel';


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

  deleteJobByComment(req, res) {
    let commentBody = req.params.comment;
    CronModel.deleteJobByComment(commentBody).then(cron => {
      return res.status(200).json({
        'jobs' : cron
      });
    });
  },

  getJobByComment(req, res) {
    let commentBody = req.params.comment;
    CronModel.getJobByComment(commentBody).then(cron => {
      return res.status(200).json({
        'jobs' : cron
      });
    });
  },
  
  clearAll(req, res, next) {
    CronModel.clearAll(newCron).then(cron => {
      return res.status(200).json({
        'jobs' : cron
      });
    });
  }


};

exports = module.exports = Cron;