import React from 'react';
import SelectList from './SelectList.jsx';
import Button from './Button.jsx';
import timeUnits from '../constants/timeUnits.js';

let cronPattern = '%minute% %hour% * * %day%';

class CronSetter extends React.Component {

  constructor() {
    super();
      this.state = {
        day : timeUnits.dayList[0].value,
        hour : timeUnits.hourList[0].value,
        minute : timeUnits.minuteList[0].value,
        showSelectTime: false,
        showSelectDay: false,
        selectClassName : ''
      };
    this.selectDay = this.selectDay.bind(this);
    this.setDay = this.setDay.bind(this);
    this.setHour = this.setHour.bind(this);
    this.setMinute = this.setMinute.bind(this);
    this.createCron = this.createCron.bind(this);
    this.selectEveryWeekDay = this.selectEveryWeekDay.bind(this);
  }
  
  selectDay() {
    this.setState({
      showSelectTime: true,
      showSelectDay: true,
      showSelectEveryWeekDay: false,
      selectClassName: 'select-day'
    });
  }   
  
  setDay(event) {
    this.setState({day: event.target.value});
  } 
  
  setHour(event) {
    this.setState({hour: event.target.value});
  } 
  
  setMinute(event) {
    this.setState({minute: event.target.value});
  } 
  
  selectEveryWeekDay() {
    this.setState({
      day : '1-5',
      showSelectEveryWeekDay: true,
      showSelectTime: true,
      showSelectDay: false,
      selectClassName: 'select-every-week-day'
    });
  }    
  
  createCron() {
    let cron = {
      expression: cronPattern.replace('%minute%', this.state.minute).replace('%hour%', this.state.hour).replace('%day%', this.state.day)
    };
    this.props.onCreateCronHandler(cron);
  } 
  
  renderTime(){
    if (this.state.showSelectTime === true) {
      return (
        <div className="select-time-at">
          <h1>At...</h1>
          <SelectList data={timeUnits.hourList} onChange={this.setHour}/>
          <span>:</span>
          <SelectList data={timeUnits.minuteList} onChange={this.setMinute}/>
        </div>
      );
    }
  }
  
 renderCalendar(){
    if (this.state.showSelectDay === true) {
        return (
          <SelectList data={timeUnits.dayList} onChange={this.setDay}/>
        );
    }
  }
  
  renderCreate(){
    if (this.state.showSelectTime === true) {
        return (
          <div className="create-cron">
            <Button onClick={this.createCron}>Create cron</Button>
          </div>
        );
    }
  }
  
  render() {
    
      let selectEveryWeekDayClass = this.state.showSelectEveryWeekDay === true ? 'active' : '';
      let selectDayClass = this.state.showSelectDay === true ? 'active' : '';
    
    return (
      <div>
        <h1>On...</h1>
        <Button className={selectEveryWeekDayClass} onClick={this.selectEveryWeekDay}>
            Every weekday
        </Button>
        <Button className={selectDayClass} onClick={this.selectDay}>
            Every...
        </Button>
        {this.renderCalendar()}
        {this.renderTime()}
        {this.renderCreate()}
      </div>
    );
  }
}
export default CronSetter;