import React from 'react';
import Request from 'superagent';
import CronList from './CronList.jsx';


class CronManager extends React.Component {
  
  constructor() {
    super();
     this.state = {
      data: {
        jobs : []
      }
    };
    this.deleteCron = this.deleteCron.bind(this);
    this.showList = this.showList.bind(this);
    this.showList();  
  }

  
  showList() {
    Request
      .get('api/crons')
      .end((err, res) => {
        this.setState({
          data: JSON.parse(res.text)
        });
      });
  }
  
  deleteCron(cronComment){
     Request
      .del('api/crons/' + cronComment)
      .end((err, res) => {
        this.setState({
          data: JSON.parse(res.text)
        });
      });
  }
  
  render() {
       
    return (
        <div className='cronManager'>
          <h2>Cron jobs</h2>
          <CronList onDeleteCronHandler={this.deleteCron} data={this.state.data.jobs} />
        </div>
    );
  }
}
export default CronManager;