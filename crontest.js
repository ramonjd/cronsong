require('crontab').load('skyid', function(err, crontab) {
/*  // create with string expression
  var job = crontab.create('ls -la', '0 7 * * 1,2,3,4,5');

  // create with Date
  var job = crontab.create('ls -lh', new Date(1400373907766));

  // create with comment
  var job = crontab.create('ls -lt', null, 'comment 2');

  // create special: @reboot, @hourly, @daily, @weekly, @monthly, @yearly, @annually, @midnight
  var job = crontab.create('ls -la', '@reboot');

  // remove object
  var job = crontab.create('ls -lr', '0 7 * * 1,2,3,4,5', 'comment 3');
  crontab.remove(job);

  // remove conditions
  crontab.remove({command:'ls -lh', comment:/comment 2/});*/

  // manipulate: every business hour
/*  var job = crontab.create('ls -l');
  job.minute().at(0);
  job.hour().between(8, 17);
  job.dow().between('mon', 'fri');*/

/*  // manipulate: every other hour on weekday nights
  var job = crontab.create('ls -l');
  job.hour().between(19, 0).every(2);
  job.hour().between(0, 6).every(2);
  job.dow().between('mon', 'fri');

  // manipulate: summer
  var job = crontab.create('ls -l');
  job.month().between('jun', 'sep');

  // manipulate: Christmas


  // show all jobs
  var jobs = crontab.jobs();

  // show jobs with conditions
  var jobs = crontab.jobs({command:'ls -l', comment:/comment 1/});

  // reset jobs to their original state
  crontab.reset();

  // save
  crontab.save(function(err, crontab) {

  });*/
  
  
    var job = crontab.create('ls -l');
  job.minute().at(30);
  job.hour().at(9);
  job.dom().on(24);
  job.month().in('dec');
   crontab.save(function(err, crontab) {

  });
var jobs = crontab.jobs();
  console.log(jobs);
});