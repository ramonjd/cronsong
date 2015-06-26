import React from 'react';
import Request from 'superagent';
import CronList from './CronList.jsx';
import Actions from '../actions/Actions.jsx';
import CronStore from '../stores/CronStore.jsx';

class CronManager extends React.Component {
  
  constructor() {
    super();
    this.state = {
      data: {
        jobs : []
      }
    };
    this.deleteCron = this.deleteCron.bind(this);
    this.onChange = this.onChange.bind(this);
 
  }
  
  componentDidMount(){
    CronStore.addChangeListener(this.onChange);
    Actions.cron.get(); 
  }
  
  componentWillUnmount() {
    CronStore.removeChangeListener(this.onChange);
  }

  onChange(data) { 
      this.setState({
        data: data.crons
      });
  }
  
  deleteCron(cronComment){
    Actions.cron.delete({
      comment : cronComment
    })
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