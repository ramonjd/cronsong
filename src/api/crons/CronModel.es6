import CronTab from 'crontab';
import Q from 'q';


var loadTabs = (user = '') => {
  let deferred = Q.defer();
  
  CronTab.load(user, function(err, tab) {
    if (err) { 
      deferred.reject('error', err); 
    } else { 
      deferred.resolve('success', tab); 
    }
  });
  
  return deferred.promise;
};


class CronModel {

    constructor(properties = {user : ''}) {
      this.user = properties.user;
    }

    static save(tab = '', callback = function(){}) {
      
    }

    static getCronByUser(user = '') {
      return loadTabs(user);
    }
    
    getCronById(id = '', callback = function(){}) {

    } 
}

export default CronModel;

