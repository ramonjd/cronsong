import CronTab from 'crontab';
import Promise from 'promise';
import config from '../../config/env/dev';

//https://github.com/dachev/node-crontab/blob/master/test/runner.js
// http://www.sebastianseilund.com/nodejs-async-in-practice


var remodelArray = (tabs = []) => {
  return tabs.map(tab => { 
        let comment = tab.comment();
        let command = tab.command();
        if (comment.split('-')[0] === 'tb') {
          return {
            'expression' : tab.minute().toString() + tab.hour().toString() + tab.dom().toString() + tab.month().toString() + tab.dow().toString(),
            'command' : tab.command(),
            'comment' : tab.comment()
          }
        }
    });
};


class CronModel {

    constructor(properties = {}) {
    console.log('config.CMD', config.CMD);
      return {
        command : config.CMD + ' "' + decodeURIComponent(properties.song) + '"',
        expression : decodeURIComponent(properties.expression),
        comment : 'tb-' + decodeURIComponent(properties.song) + '-' + Math.floor(new Date() / 1000)
      };
    }

    static show(user = '') {
      return new Promise((resolve, reject) => {
        CronTab.load(user, (err, tab) =>  {
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
          CronTab.load(user, (err, tab) =>  {
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

    static deleteJobByComment(comment = '', user = '') {
     return new Promise((resolve, reject) => {
        CronTab.load(user, (err, tab) =>  {
          if (err) {
            reject(err);
          }  else { 
            tab.remove({'comment' : comment});
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
    
    static getJobByComment(comment = '', user = '') {
      return new Promise((resolve, reject) => {
        CronTab.load(user, (err, tab) => {
          if (err) {
            reject(err);
          }  else { 
          console.log('get job by comment', tab.jobs({'comment' : comment}));
            resolve(remodelArray(tab.jobs({'comment' : comment})));
          }
        });
      });
    }
    
    static clearAll(user = '') {
      return new Promise((resolve, reject) => {
        CronTab.load(user, (err, tab) => {
          if (err) {
            reject(err);
          }  else { 
            tab.reset();
            resolve(remodelArray(tab.jobs()));
          }
        });
      });
    }
}

export default CronModel;

