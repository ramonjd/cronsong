import CronTab from 'crontab';
import Promise from 'promise';

//https://github.com/dachev/node-crontab/blob/master/test/runner.js
// http://www.sebastianseilund.com/nodejs-async-in-practice



var remodelArray = (tabs = []) => {
  return tabs.map(tab => { 
        return {
          'expression' : tab.minute().toString() + tab.hour().toString() + tab.dom().toString() + tab.month().toString() + tab.dow().toString(),
          'command' : tab.command(),
          'comment' : tab.comment()
        };
    });
};




class CronModel {

    constructor(properties = {}) {
      //model something here
      return {
        command : properties.command.toString(),
        expression : decodeURIComponent(properties.expression),
        comment : properties.comment.toString()
      };
    }

    static show(user = '') {
      return new Promise(function (resolve, reject) {
        CronTab.load('', function (err, tab) {
          if (err) {
            reject(err);
          }  else { 
            resolve(remodelArray(tab.jobs()));
          }
        });
      });
    }
    
    static create(cron = {}, user = '') {
      return new Promise(function (resolve, reject) {
          CronTab.load('', function (err, tab) {
            if (err) {
              reject(err);
            }  else {             
             tab.create(cron.command, cron.expression, cron.comment);
              tab.save((err, tab) => { 
                if (err) { 
                  reject(err);
                } else { 
                  resolve(remodelArray(tab.jobs()));
                }
             });
            }
          });
        });
    }

    static delete(cron = {}, user = '') {
      return loadTabs(user).then((status, tab) => {
        return {
          'status' : status,
          'jobs' : tab.remove(comment)
        };
      });
    }
    
    static getJobByComment(comment = {}, user = '') {
      return loadTabs(user).then((status, tab) => {
        return {
          'status' : status,
          'jobs' : tab.jobs(comment)
        };
      });
    }
}

export default CronModel;

