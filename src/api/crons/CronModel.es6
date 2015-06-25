import CronTab from 'crontab';
import Promise from 'promise';
import config from '../../config/env';

//https://github.com/dachev/node-crontab/blob/master/test/runner.js
// http://www.sebastianseilund.com/nodejs-async-in-practice


var remodelArray = (tabs = []) => {
  return tabs.map(tab => { 
        if (tab) {
          let comment = tab.comment();
          let command = tab.command();
          if (comment.split('-')[0] === 'sc') {
            return {
              'expression' : tab.minute().toString() + ' ' + tab.hour().toString() + ' ' +tab.dom().toString() + ' ' +tab.month().toString() + ' ' +tab.dow().toString(),
              'command' : tab.command(),
              'comment' : tab.comment()
            }
          }
        }
    });
};


class CronModel {

    constructor(properties = {}) {
      let type = decodeURIComponent(properties.type);
      let cmd = type === 'sound' ? config.CMD_SOUND : config.CMD_SONG
      return {
        command : cmd + ' "' + decodeURIComponent(properties.song) + '"',
        expression : decodeURIComponent(properties.expression),
        comment : 'sc-' + decodeURIComponent(properties.song) + '-' + Math.floor(new Date() / 1000)
      };
    }

    static show(user = config.USER) {
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
    
    static create(cron = {}, user = config.USER) {
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

    static deleteJobByComment(comment = '', user = config.USER) {
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
    
    static getJobByComment(comment = '', user = config.USER) {
      return new Promise((resolve, reject) => {
        CronTab.load(user, (err, tab) => {
          if (err) {
            reject(err);
          }  else { 
            resolve(remodelArray(tab.jobs({'comment' : comment})));
          }
        });
      });
    }
    
    static clearAll(user = config.USER) {
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

